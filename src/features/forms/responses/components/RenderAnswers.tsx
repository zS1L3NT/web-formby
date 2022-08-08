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

const RenderAnswers = ({ question, answers }: { question: iQuestion; answers: iAnswer[] }) => {
	if (question.type === "text") {
		return (
			<TextAnswers
				question={question}
				answers={answers as iTextAnswer[]}
			/>
		)
	}

	if (question.type === "paragraph") {
		return (
			<ParagraphAnswers
				question={question}
				answers={answers as iParagraphAnswer[]}
			/>
		)
	}

	if (question.type === "color") {
		return (
			<ColorAnswers
				question={question}
				answers={answers as iColorAnswer[]}
			/>
		)
	}

	if (question.type === "choice") {
		return (
			<ChoiceAnswers
				question={question}
				answers={answers as iChoiceAnswer[]}
			/>
		)
	}

	if (question.type === "switch") {
		return (
			<SwitchAnswers
				question={question}
				answers={answers as iSwitchAnswer[]}
			/>
		)
	}

	if (question.type === "slider") {
		return (
			<SliderAnswers
				question={question}
				answers={answers as iSliderAnswer[]}
			/>
		)
	}

	if (question.type === "datetime") {
		return (
			<DateTimeAnswers
				question={question}
				answers={answers as iDateTimeAnswer[]}
			/>
		)
	}

	if (question.type === "table") {
		return (
			<TableAnswers
				question={question}
				answers={answers as iTableAnswer[]}
			/>
		)
	}

	throw new Error("Unknown question type")
}

export default RenderAnswers
