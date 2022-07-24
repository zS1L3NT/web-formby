import { FC, PropsWithChildren } from "react"
import { DragDropContext, Droppable } from "react-beautiful-dnd"

import { Box, Center, Spinner } from "@chakra-ui/react"

import Form from "../../../models/Form"
import { Question } from "../../../models/Question"
import FormHeader from "../components/FormHeader"
import QuestionComponent from "../components/QuestionComponent"

const Questions: FC<
	PropsWithChildren<{
		form: Form
		questions: Question[] | null
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
									<QuestionComponent
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
