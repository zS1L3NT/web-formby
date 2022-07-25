import { FC, PropsWithChildren } from "react"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import { Updater } from "use-immer"

import { AddIcon } from "@chakra-ui/icons"
import { Box, Center, IconButton, Spinner } from "@chakra-ui/react"

import { iForm } from "../../../models/Form"
import { iQuestion } from "../../../models/Question"
import assertLinkedList from "../../../utils/assertLinkedList"
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

	const handleReorder = (oldIndex: number, newIndex?: number) => {
		if (oldIndex === newIndex || newIndex === undefined || questions === null) return

		if (oldIndex === 0) {
			if (newIndex === questions.length - 1) {
				// F -> L (2)
				setQuestions(questions => {
					questions.splice(newIndex, 0, questions.splice(oldIndex, 1)[0]!)
					questions.at(oldIndex)!.previous_question_id = null
					questions.at(newIndex)!.previous_question_id = questions.at(newIndex - 1)!.id
					assertLinkedList(questions)
				})
			} else {
				// F -> M (3)
				setQuestions(questions => {
					questions.splice(newIndex, 0, questions.splice(oldIndex, 1)[0]!)
					questions.at(oldIndex)!.previous_question_id = null
					questions.at(newIndex)!.previous_question_id = questions.at(newIndex - 1)!.id
					questions.at(newIndex + 1)!.previous_question_id = questions.at(newIndex)!.id
					assertLinkedList(questions)
				})
			}
		} else if (oldIndex === questions.length - 1) {
			if (newIndex === 0) {
				// L -> F (2)
				setQuestions(questions => {
					questions.splice(newIndex, 0, questions.splice(oldIndex, 1)[0]!)
					questions.at(newIndex)!.previous_question_id = null
					questions.at(newIndex + 1)!.previous_question_id = questions.at(newIndex)!.id
					assertLinkedList(questions)
				})
			} else {
				// L -> M (2)
				setQuestions(questions => {
					questions.splice(newIndex, 0, questions.splice(oldIndex, 1)[0]!)
					questions.at(newIndex)!.previous_question_id = questions.at(newIndex - 1)!.id
					questions.at(newIndex + 1)!.previous_question_id = questions.at(newIndex)!.id
					assertLinkedList(questions)
				})
			}
		} else if (newIndex === 0) {
			// M -> F (3)
			setQuestions(questions => {
				questions.splice(newIndex, 0, questions.splice(oldIndex, 1)[0]!)
				questions.at(newIndex)!.previous_question_id = null
				questions.at(newIndex + 1)!.previous_question_id = questions.at(newIndex)!.id
				questions.at(oldIndex + 1)!.previous_question_id = questions.at(oldIndex)!.id
				assertLinkedList(questions)
			})
		} else if (newIndex === questions.length - 1) {
			// M -> L (2)
			setQuestions(questions => {
				questions.splice(newIndex, 0, questions.splice(oldIndex, 1)[0]!)
				questions.at(oldIndex)!.previous_question_id = questions.at(oldIndex - 1)!.id
				questions.at(newIndex)!.previous_question_id = questions.at(newIndex)!.id
				assertLinkedList(questions)
			})
		} else {
			// M -> M (3)
			setQuestions(questions => {
				questions.splice(newIndex, 0, questions.splice(oldIndex, 1)[0]!)
				questions.at(oldIndex)!.previous_question_id = questions.at(oldIndex - 1)!.id
				questions.at(oldIndex + 1)!.previous_question_id = questions.at(oldIndex)!.id
				questions.at(newIndex)!.previous_question_id = questions.at(newIndex - 1)!.id
				questions.at(newIndex + 1)!.previous_question_id = questions.at(newIndex)!.id
				assertLinkedList(questions)
			})
		}
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
