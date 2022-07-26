import { FC, PropsWithChildren, useContext, useEffect } from "react"
import { DragDropContext, Droppable } from "react-beautiful-dnd"

import { Box, Center, Spinner } from "@chakra-ui/react"

import AuthContext from "../../../contexts/AuthContext"
import FormContext from "../../../contexts/FormContext"
import useFetcher from "../../../hooks/useFetcher"
import assertLinkedQuestions from "../../../utils/assertLinkedQuestions"
import FormHeader from "../components/FormHeader"
import NewQuestionButton from "../components/NewQuestionButton"
import Question from "../components/Question"

const Questions: FC<
	PropsWithChildren<{
		editable: boolean
	}>
> = props => {
	const { editable } = props

	const { token } = useContext(AuthContext)
	const { form, questions, setQuestions } = useContext(FormContext)
	const fetcher = useFetcher()

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
							form_id: form!.id,
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
							<NewQuestionButton
								editable={editable}
								index={0}
							/>

							{questions ? (
								questions.map((question, i) => (
									<Question
										key={question.id}
										index={i}
										editable={editable}
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
