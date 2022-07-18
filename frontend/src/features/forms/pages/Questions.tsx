import { FC, PropsWithChildren } from "react"

import { Center, Spinner, Stack } from "@chakra-ui/react"

import Form from "../../../models/Form"
import {
	ChoiceQuestion, ColorQuestion, DateTimeQuestion, ParagraphQuestion, Question, RatingQuestion,
	SliderQuestion, SwitchQuestion, TableQuestion, TextQuestion
} from "../../../models/Question"
import FormHeader from "../components/FormHeader"
import ChoiceQuestionComponent from "../components/questions/ChoiceQuestionComponent"
import ColorQuestionComponent from "../components/questions/ColorQuestionComponent"
import DateTimeQuestionComponent from "../components/questions/DateTimeQuestionComponent"
import ParagraphQuestionComponent from "../components/questions/ParagraphQuestionComponent"
import RatingQuestionComponent from "../components/questions/RatingQuestionComponent"
import SliderQuestionComponent from "../components/questions/SliderQuestionComponent"
import SwitchQuestionComponent from "../components/questions/SwitchQuestionComponent"
import TableQuestionComponent from "../components/questions/TableQuestionComponent"
import TextQuestionComponent from "../components/questions/TextQuestionComponent"

const Questions: FC<
	PropsWithChildren<{
		form: Form
		questions: Question[] | null
		editable: boolean
	}>
> = props => {
	const { form, questions, editable } = props

	return (
		<Stack
			mt={4}
			spacing={4}>
			<FormHeader
				form={form}
				editable={editable}
			/>
			{questions ? (
				questions.map(question => {
					if (question instanceof TextQuestion) {
						return (
							<TextQuestionComponent
								key={question.id}
								question={question}
								editable={editable}
							/>
						)
					}

					if (question instanceof ParagraphQuestion) {
						return (
							<ParagraphQuestionComponent
								key={question.id}
								question={question}
								editable={editable}
							/>
						)
					}

					if (question instanceof ColorQuestion) {
						return (
							<ColorQuestionComponent
								key={question.id}
								question={question}
								editable={editable}
							/>
						)
					}

					if (question instanceof ChoiceQuestion) {
						return (
							<ChoiceQuestionComponent
								key={question.id}
								question={question}
								editable={editable}
							/>
						)
					}

					if (question instanceof SwitchQuestion) {
						return (
							<SwitchQuestionComponent
								key={question.id}
								question={question}
								editable={editable}
							/>
						)
					}

					if (question instanceof SliderQuestion) {
						return (
							<SliderQuestionComponent
								key={question.id}
								question={question}
								editable={editable}
							/>
						)
					}

					if (question instanceof RatingQuestion) {
						return (
							<RatingQuestionComponent
								key={question.id}
								question={question}
								editable={editable}
							/>
						)
					}

					if (question instanceof DateTimeQuestion) {
						return (
							<DateTimeQuestionComponent
								key={question.id}
								question={question}
								editable={editable}
							/>
						)
					}

					if (question instanceof TableQuestion) {
						return (
							<TableQuestionComponent
								key={question.id}
								question={question}
								editable={editable}
							/>
						)
					}

					throw new Error("Unknown question type")
				})
			) : (
				<Center>
					<Spinner mt={4} />
				</Center>
			)}
		</Stack>
	)
}

export default Questions
