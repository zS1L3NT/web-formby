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

const RenderAnswers = ({ question, answers, responses }: AnswersProps<iQuestion, iAnswer>) => {
	if (question.type === "text") {
		return (
			<TextAnswers
				question={question}
				answers={answers as iTextAnswer[]}
				responses={responses}
			/>
		)
	}

	if (question.type === "paragraph") {
		return (
			<ParagraphAnswers
				question={question}
				answers={answers as iParagraphAnswer[]}
				responses={responses}
			/>
		)
	}

	if (question.type === "color") {
		return (
			<ColorAnswers
				question={question}
				answers={answers as iColorAnswer[]}
				responses={responses}
			/>
		)
	}

	if (question.type === "choice") {
		return (
			<ChoiceAnswers
				question={question}
				answers={answers as iChoiceAnswer[]}
				responses={responses}
			/>
		)
	}

	if (question.type === "switch") {
		return (
			<SwitchAnswers
				question={question}
				answers={answers as iSwitchAnswer[]}
				responses={responses}
			/>
		)
	}

	if (question.type === "slider") {
		return (
			<SliderAnswers
				question={question}
				answers={answers as iSliderAnswer[]}
				responses={responses}
			/>
		)
	}

	if (question.type === "datetime") {
		return (
			<DateTimeAnswers
				question={question}
				answers={answers as iDateTimeAnswer[]}
				responses={responses}
			/>
		)
	}

	if (question.type === "table") {
		return (
			<TableAnswers
				question={question}
				answers={answers as iTableAnswer[]}
				responses={responses}
			/>
		)
	}

	throw new Error("Unknown question type")
}

export default RenderAnswers
