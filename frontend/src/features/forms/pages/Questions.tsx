import { FC, PropsWithChildren } from "react"
import { DragDropContext, Draggable, DraggableProvided, Droppable } from "react-beautiful-dnd"

import { Box, Center, Spinner } from "@chakra-ui/react"

import Form from "../../../models/Form"
import {
	ChoiceQuestion, ColorQuestion, DateTimeQuestion, ParagraphQuestion, Question, SliderQuestion,
	SwitchQuestion, TableQuestion, TextQuestion
} from "../../../models/Question"
import FormHeader from "../components/FormHeader"
import ChoiceQuestionComponent from "../components/questions/ChoiceQuestionComponent"
import ColorQuestionComponent from "../components/questions/ColorQuestionComponent"
import DateTimeQuestionComponent from "../components/questions/DateTimeQuestionComponent"
import ParagraphQuestionComponent from "../components/questions/ParagraphQuestionComponent"
import SliderQuestionComponent from "../components/questions/SliderQuestionComponent"
import SwitchQuestionComponent from "../components/questions/SwitchQuestionComponent"
import TableQuestionComponent from "../components/questions/TableQuestionComponent"
import TextQuestionComponent from "../components/questions/TextQuestionComponent"

const QuestionSwitcher: FC<
	PropsWithChildren<{
		provided: DraggableProvided
		question: Question
		editable: boolean
	}>
> = props => {
	const { provided, question, editable } = props

	const componentProps = {
		key: question.id,
		editable,
		provided
	}

	if (question instanceof TextQuestion) {
		return (
			<TextQuestionComponent
				question={question}
				{...componentProps}
			/>
		)
	}
	if (question instanceof ParagraphQuestion) {
		return (
			<ParagraphQuestionComponent
				question={question}
				{...componentProps}
			/>
		)
	}
	if (question instanceof SliderQuestion) {
		return (
			<SliderQuestionComponent
				question={question}
				{...componentProps}
			/>
		)
	}
	if (question instanceof SwitchQuestion) {
		return (
			<SwitchQuestionComponent
				question={question}
				{...componentProps}
			/>
		)
	}
	if (question instanceof ColorQuestion) {
		return (
			<ColorQuestionComponent
				question={question}
				{...componentProps}
			/>
		)
	}
	if (question instanceof DateTimeQuestion) {
		return (
			<DateTimeQuestionComponent
				question={question}
				{...componentProps}
			/>
		)
	}
	if (question instanceof ChoiceQuestion) {
		return (
			<ChoiceQuestionComponent
				question={question}
				{...componentProps}
			/>
		)
	}
	if (question instanceof TableQuestion) {
		return (
			<TableQuestionComponent
				question={question}
				{...componentProps}
			/>
		)
	}

	return <></>
}

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
									<Draggable
										key={question.id}
										index={i}
										draggableId={question.id}>
										{provided => (
											<QuestionSwitcher
												provided={provided}
												question={question}
												editable={editable}
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
						</Box>
					)}
				</Droppable>
			</DragDropContext>
		</>
	)
}

export default Questions
