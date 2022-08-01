import { useContext, useEffect } from "react"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"

import { Box, Center, Spinner } from "@chakra-ui/react"

import AuthContext from "../../../contexts/AuthContext"
import FormContext from "../../../contexts/FormContext"
import useFetcher from "../../../hooks/useFetcher"
import { assertLinkedQuestions } from "../../../utils/questionUtils"
import FormHeader from "../answer/components/FormHeader"
import Question from "../answer/components/Question"
import AddQuestion from "./components/AddQuestion"

const FormEdit = () => {
	const { token } = useContext(AuthContext)
	const { form, questions, setQuestions, answers } = useContext(FormContext)
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
		<Box
			pos="relative"
			mt={form!.state === "draft" ? 0 : 4}
			py={form!.state === "draft" ? 0 : 1}
			px={form!.state === "draft" ? 0 : 4}>
			<FormHeader editable={form!.state === "draft"} />
			<DragDropContext
				onDragEnd={result => handleReorder(result.source.index, result.destination?.index)}>
				<Droppable droppableId="questions">
					{provided => (
						<Box
							ref={provided.innerRef}
							className="questions"
							{...provided.droppableProps}>
							<AddQuestion
								editable={form!.state === "draft"}
								index={0}
							/>

							{questions && answers ? (
								questions.map((question, i) => (
									<Draggable
										key={question.id}
										index={i}
										draggableId={question.id}>
										{provided => (
											<Question
												index={i}
												provided={provided}
												editable={form!.state === "draft"}
												parentQuestion={question}
												error={null}
											/>
										)}
									</Draggable>
								))
							) : (
								<Center>
									<Spinner mt={4} />
								</Center>
							)}
							{provided.placeholder}
							<Box h={16} />
						</Box>
					)}
				</Droppable>
			</DragDropContext>
			<Box
				w="max"
				h="calc(var(--chakra-sizes-max) - var(--chakra-sizes-16))"
				pos="absolute"
				top={0}
				left={0}
				opacity={0.4}
				bg="black"
				borderRadius="lg"
				zIndex={form!.state === "draft" ? -1 : 1}
				cursor="not-allowed"
			/>
		</Box>
	)
}

export default FormEdit
