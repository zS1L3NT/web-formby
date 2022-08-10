import {
	iAnswer, iChoiceAnswer, iColorAnswer, iDateTimeAnswer, iParagraphAnswer, iSliderAnswer,
	iSwitchAnswer, iTableAnswer, iTextAnswer
} from "../../../../models/Answer"
import {
	iChoiceQuestion, iColorQuestion, iDateTimeQuestion, iParagraphQuestion, iQuestion,
	iSliderQuestion, iSwitchQuestion, iTableQuestion, iTextQuestion
} from "../../../../models/Question"
import ChoiceAnswers from "./answers/ChoiceAnswers"
import ColorAnswers from "./answers/ColorAnswers"
import DateTimeAnswers from "./answers/DateTimeAnswers"
import ParagraphAnswers from "./answers/ParagraphAnswers"
import SliderAnswers from "./answers/SliderAnswers"
import SwitchAnswers from "./answers/SwitchAnswers"
import TableAnswers from "./answers/TableAnswers"
import TextAnswers from "./answers/TextAnswers"
import { AnswersProps } from "./QuestionAnswers"

const RenderAnswers = (props: AnswersProps<iQuestion, iAnswer>) => {
	if (props.question.type === "text") {
		return <TextAnswers {...(props as AnswersProps<iTextQuestion, iTextAnswer>)} />
	}

	if (props.question.type === "paragraph") {
		return (
			<ParagraphAnswers {...(props as AnswersProps<iParagraphQuestion, iParagraphAnswer>)} />
		)
	}

	if (props.question.type === "color") {
		return <ColorAnswers {...(props as AnswersProps<iColorQuestion, iColorAnswer>)} />
	}

	if (props.question.type === "choice") {
		return <ChoiceAnswers {...(props as AnswersProps<iChoiceQuestion, iChoiceAnswer>)} />
	}

	if (props.question.type === "switch") {
		return <SwitchAnswers {...(props as AnswersProps<iSwitchQuestion, iSwitchAnswer>)} />
	}

	if (props.question.type === "slider") {
		return <SliderAnswers {...(props as AnswersProps<iSliderQuestion, iSliderAnswer>)} />
	}

	if (props.question.type === "datetime") {
		return <DateTimeAnswers {...(props as AnswersProps<iDateTimeQuestion, iDateTimeAnswer>)} />
	}

	if (props.question.type === "table") {
		return <TableAnswers {...(props as AnswersProps<iTableQuestion, iTableAnswer>)} />
	}

	throw new Error("Unknown question type")
}

export default RenderAnswers
