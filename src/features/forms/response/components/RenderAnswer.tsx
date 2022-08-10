import {
	iAnswer, iChoiceAnswer, iColorAnswer, iDateTimeAnswer, iParagraphAnswer, iSliderAnswer,
	iSwitchAnswer, iTableAnswer, iTextAnswer
} from "../../../../models/Answer"
import {
	iChoiceQuestion, iColorQuestion, iDateTimeQuestion, iParagraphQuestion, iQuestion,
	iSliderQuestion, iSwitchQuestion, iTableQuestion, iTextQuestion
} from "../../../../models/Question"
import ChoiceAnswer from "./answers/ChoiceAnswer"
import ColorAnswer from "./answers/ColorAnswer"
import DateTimeAnswer from "./answers/DateTimeAnswer"
import ParagraphAnswer from "./answers/ParagraphAnswer"
import SliderAnswer from "./answers/SliderAnswer"
import SwitchAnswer from "./answers/SwitchAnswer"
import TableAnswer from "./answers/TableAnswer"
import TextAnswer from "./answers/TextAnswer"
import { AnswerProps } from "./QuestionAnswer"

const RenderAnswer = (props: AnswerProps<iQuestion, iAnswer>) => {
	if (props.question.type === "text") {
		return <TextAnswer {...(props as AnswerProps<iTextQuestion, iTextAnswer>)} />
	}

	if (props.question.type === "paragraph") {
		return <ParagraphAnswer {...(props as AnswerProps<iParagraphQuestion, iParagraphAnswer>)} />
	}

	if (props.question.type === "color") {
		return <ColorAnswer {...(props as AnswerProps<iColorQuestion, iColorAnswer>)} />
	}

	if (props.question.type === "choice") {
		return <ChoiceAnswer {...(props as AnswerProps<iChoiceQuestion, iChoiceAnswer>)} />
	}

	if (props.question.type === "switch") {
		return <SwitchAnswer {...(props as AnswerProps<iSwitchQuestion, iSwitchAnswer>)} />
	}

	if (props.question.type === "slider") {
		return <SliderAnswer {...(props as AnswerProps<iSliderQuestion, iSliderAnswer>)} />
	}

	if (props.question.type === "datetime") {
		return <DateTimeAnswer {...(props as AnswerProps<iDateTimeQuestion, iDateTimeAnswer>)} />
	}

	if (props.question.type === "table") {
		return <TableAnswer {...(props as AnswerProps<iTableQuestion, iTableAnswer>)} />
	}

	throw new Error("Unknown question type")
}

export default RenderAnswer
