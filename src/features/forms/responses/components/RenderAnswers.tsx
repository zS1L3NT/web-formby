import { WithTimestamps } from "../../../../models"
import {
	iAnswer, iChoiceAnswer, iColorAnswer, iDateTimeAnswer, iParagraphAnswer, iSliderAnswer,
	iSwitchAnswer, iTableAnswer, iTextAnswer
} from "../../../../models/Answer"
import { iQuestion } from "../../../../models/Question"
import ChoiceAnswers from "./answers/ChoiceAnswers"
import ColorAnswers from "./answers/ColorAnswers"
import DateTimeAnswers from "./answers/DateTimeAnswers"
import ParagraphAnswers from "./answers/ParagraphAnswers"
import SliderAnswers from "./answers/SliderAnswers"
import SwitchAnswers from "./answers/SwitchAnswers"
import TableAnswers from "./answers/TableAnswers"
import TextAnswers from "./answers/TextAnswers"
import { AnswersProps } from "./QuestionAnswers"

const RenderAnswers = ({
	question,
	answers,
	responses,
	users
}: AnswersProps<iQuestion, iAnswer>) => {
	if (question.type === "text") {
		return (
			<TextAnswers
				question={question}
				answers={answers as WithTimestamps<iTextAnswer>[]}
				responses={responses}
				users={users}
			/>
		)
	}

	if (question.type === "paragraph") {
		return (
			<ParagraphAnswers
				question={question}
				answers={answers as WithTimestamps<iParagraphAnswer>[]}
				responses={responses}
				users={users}
			/>
		)
	}

	if (question.type === "color") {
		return (
			<ColorAnswers
				question={question}
				answers={answers as WithTimestamps<iColorAnswer>[]}
				responses={responses}
				users={users}
			/>
		)
	}

	if (question.type === "choice") {
		return (
			<ChoiceAnswers
				question={question}
				answers={answers as WithTimestamps<iChoiceAnswer>[]}
				responses={responses}
				users={users}
			/>
		)
	}

	if (question.type === "switch") {
		return (
			<SwitchAnswers
				question={question}
				answers={answers as WithTimestamps<iSwitchAnswer>[]}
				responses={responses}
				users={users}
			/>
		)
	}

	if (question.type === "slider") {
		return (
			<SliderAnswers
				question={question}
				answers={answers as WithTimestamps<iSliderAnswer>[]}
				responses={responses}
				users={users}
			/>
		)
	}

	if (question.type === "datetime") {
		return (
			<DateTimeAnswers
				question={question}
				answers={answers as WithTimestamps<iDateTimeAnswer>[]}
				responses={responses}
				users={users}
			/>
		)
	}

	if (question.type === "table") {
		return (
			<TableAnswers
				question={question}
				answers={answers as WithTimestamps<iTableAnswer>[]}
				responses={responses}
				users={users}
			/>
		)
	}

	throw new Error("Unknown question type")
}

export default RenderAnswers
