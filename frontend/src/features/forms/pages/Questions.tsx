import { FC, PropsWithChildren } from "react"
import { DragDropContext, Droppable } from "react-beautiful-dnd"

import { Box, Center, Spinner } from "@chakra-ui/react"

import { iForm } from "../../../models/Form"
import { iQuestion } from "../../../models/Question"
import FormHeader from "../components/FormHeader"
import Question from "../components/Question"

const Questions: FC<
	PropsWithChildren<{
		form: iForm
		questions: iQuestion[] | null
		editable: boolean
	}>
> = props => {
	const { form, questions, editable } = props

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
							{questions ? (
								questions.map((question, i) => (
									<Question
										key={question.id}
										index={i}
										editable={editable}
										question={question}
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
