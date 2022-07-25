import { Dispatch, FC, PropsWithChildren, SetStateAction } from "react"
import { DragDropContext, Droppable } from "react-beautiful-dnd"

import { AddIcon } from "@chakra-ui/icons"
import { Box, Center, IconButton, Spinner } from "@chakra-ui/react"

import { iForm } from "../../../models/Form"
import { iQuestion } from "../../../models/Question"
import FormHeader from "../components/FormHeader"
import Question from "../components/Question"

const Questions: FC<
	PropsWithChildren<{
		editable: boolean
		form: iForm
		questions: iQuestion[] | null
		setQuestions: Dispatch<SetStateAction<iQuestion[]>>
	}>
> = props => {
	const { editable, form, questions, setQuestions } = props

	const handleReorder = (oldIndex: number, newIndex?: number) => {
		if (oldIndex === newIndex || newIndex === undefined || questions === null) return

		console.log({ oldIndex, newIndex, questions })

		if (oldIndex === 0) {
			if (newIndex === questions.length - 1) {
				// F -> L (2)
				setQuestions([
					{ ...questions.at(1)!, previous_question_id: null },
					...questions.slice(2),
					{ ...questions.at(0)!, previous_question_id: questions.at(-1)!.id }
				])
			} else {
				console.log("F -> M (3)")
			}
		} else if (oldIndex === questions.length - 1) {
			if (newIndex === 0) {
				// L -> F (2)
				setQuestions([
					{ ...questions.at(-1)!, previous_question_id: null },
					{ ...questions.at(0)!, previous_question_id: questions.at(-1)!.id },
					...questions.slice(1, -1)
				])
			} else {
				console.log("L -> M (2)")
			}
		} else if (newIndex === 0) {
			console.log("M -> F (3)")
		} else if (newIndex === questions.length - 1) {
			console.log("M -> L (2)")
		} else {
			console.log("M -> M (3)")
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
