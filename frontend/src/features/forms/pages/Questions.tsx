import { FC, PropsWithChildren, useContext, useEffect } from "react"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import { Updater } from "use-immer"

import { AddIcon } from "@chakra-ui/icons"
import { Box, Center, IconButton, Spinner, useBoolean } from "@chakra-ui/react"

import AuthContext from "../../../contexts/AuthContext"
import useFetcher from "../../../hooks/useFetcher"
import { iForm } from "../../../models/Form"
import { iQuestion, iTextQuestion } from "../../../models/Question"
import assertLinkedQuestions from "../../../utils/assertLinkedQuestions"
import FormHeader from "../components/FormHeader"
import Question from "../components/Question"

const Questions: FC<
	PropsWithChildren<{
		editable: boolean
		form: iForm
		questions: iQuestion[] | null
		setQuestions: Updater<iQuestion[]>
	}>
> = props => {
	const { editable, form, questions, setQuestions } = props

	const { token } = useContext(AuthContext)
	const fetcher = useFetcher()

	const [isCreating, setIsCreating] = useBoolean()

	useEffect(() => {
		if (!questions) return

		assertLinkedQuestions(questions)
	}, [questions])

	const handleReorder = (oldIndex: number, newIndex?: number) => {
		if (
			oldIndex === newIndex ||
			newIndex === undefined ||
			questions === null ||
			token === null
		) {
			return
		}

		setQuestions(questions => {
			const __questions = [...questions.map(question => ({ ...question }))]

			questions.splice(newIndex, 0, questions.splice(oldIndex, 1)[0]!)

			questions.at(oldIndex)!.previous_question_id = questions[oldIndex - 1]?.id ?? null
			if (questions.at(oldIndex + 1)) {
				questions.at(oldIndex + 1)!.previous_question_id = questions.at(oldIndex)!.id
			}

			questions.at(newIndex)!.previous_question_id = questions[newIndex - 1]?.id ?? null
			if (questions.at(newIndex + 1)) {
				questions.at(newIndex + 1)!.previous_question_id = questions.at(newIndex)!.id
			}

			for (const __question of __questions) {
				const question = questions.find(question => question.id === __question.id)!

				if (__question.previous_question_id !== question.previous_question_id) {
					fetcher({
						url: "/forms/{form_id}/questions/{question_id}",
						method: "PUT",
						parameters: {
							form_id: form.id,
							question_id: question.id
						},
						body: {
							previous_question_id: question.previous_question_id
						},
						token
					})
				}
			}
		})
	}

	const handleCreate = async (index: number, setIsCreating: ReturnType<typeof useBoolean>[1]) => {
		if (questions === null || token === null) return

		const question: Omit<iTextQuestion, "id" | "form_id"> = {
			previous_question_id: questions[index - 1]?.id ?? null,
			title: "New Question",
			description: "",
			photo: "",
			type: "text",
			required: false
		}

		setIsCreating.on()
		const { data } = await fetcher({
			url: "/forms/{form_id}/questions",
			method: "POST",
			parameters: {
				form_id: form.id
			},
			body: question,
			token
		})

		if (data) {
			setQuestions(questions => {
				questions.splice(index, 0, data.question)

				if (questions.length !== index) {
					questions.at(index + 1)!.previous_question_id = data.question.id
				}
			})
		}

		setIsCreating.off()
	}

	return (
		<>
			<FormHeader
				form={form}
				editable={editable}
			/>
			<DragDropContext
				onDragEnd={result => handleReorder(result.source.index, result.destination?.index)}>
				<Droppable droppableId="questions">
					{provided => (
						<Box
							ref={provided.innerRef}
							className="questions"
							{...provided.droppableProps}>
							<IconButton
								aria-label="Add Question"
								isDisabled={isCreating}
								icon={
									isCreating ? (
										<Spinner
											w={3}
											h={3}
										/>
									) : (
										<AddIcon
											w={3}
											h={3}
										/>
									)
								}
								h={8}
								w="max"
								mb={4}
								onClick={() => handleCreate(0, setIsCreating)}
							/>

							{questions ? (
								questions.map((question, i) => (
									<Question
										key={question.id}
										index={i}
										editable={editable}
										handleCreate={handleCreate}
										parentQuestion={question}
										setParentQuestion={question => {
											if (question) {
												setQuestions(
													questions.map((q, j) =>
														j === i ? question : q
													)
												)
											} else {
												setQuestions(questions.filter((_, j) => j !== i))
											}
										}}
									/>
								))
							) : (
								<Center>
									<Spinner mt={4} />
								</Center>
							)}
							{provided.placeholder}
						</Box>
					)}
				</Droppable>
			</DragDropContext>
		</>
	)
}

export default Questions
