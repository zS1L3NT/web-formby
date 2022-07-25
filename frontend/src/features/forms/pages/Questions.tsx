import { Dispatch, FC, PropsWithChildren, SetStateAction } from "react"
import { DragDropContext, Droppable } from "react-beautiful-dnd"

import { Box, Center, IconButton, Spinner } from "@chakra-ui/react"

import { AddIcon } from "@chakra-ui/icons"
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

	return (
		<>
			<FormHeader
				form={form}
				editable={editable}
			/>
			<DragDropContext onDragEnd={console.log}>
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
