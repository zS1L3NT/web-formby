import { FC, PropsWithChildren, useEffect } from "react"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import { Updater } from "use-immer"

import { AddIcon } from "@chakra-ui/icons"
import { Box, Center, IconButton, Spinner } from "@chakra-ui/react"

import { iForm } from "../../../models/Form"
import { iQuestion } from "../../../models/Question"
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

	useEffect(() => {
		if (!questions) return

		assertLinkedQuestions(questions)
	}, [questions])

	const handleReorder = (oldIndex: number, newIndex?: number) => {
		if (oldIndex === newIndex || newIndex === undefined || questions === null) return

		setQuestions(questions => {
			questions.splice(newIndex, 0, questions.splice(oldIndex, 1)[0]!)

			questions.at(oldIndex)!.previous_question_id = questions[oldIndex - 1]?.id ?? null
			if (questions.at(oldIndex + 1)) {
				questions.at(oldIndex + 1)!.previous_question_id = questions.at(oldIndex)!.id
			}

			questions.at(newIndex)!.previous_question_id = questions[newIndex - 1]?.id ?? null
			if (questions.at(newIndex + 1)) {
				questions.at(newIndex + 1)!.previous_question_id = questions.at(newIndex)!.id
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
							<IconButton
								aria-label="Add Question"
								icon={
									<AddIcon
										w={3}
										h={3}
									/>
								}
								h={8}
								w="max"
								mb={4}
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
