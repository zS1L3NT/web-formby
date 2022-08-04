import {
	iAnswer, iChoiceAnswer, iColorAnswer, iDateTimeAnswer, iParagraphAnswer, iSliderAnswer,
	iSwitchAnswer, iTableAnswer, iTextAnswer
} from "../../../../models/Answer"
import {
	iChoiceQuestion, iColorQuestion, iDateTimeQuestion, iParagraphQuestion, iQuestion,
	iSliderQuestion, iSwitchQuestion, iTableQuestion, iTextQuestion
} from "../../../../models/Question"
import { InputProps } from "./QuestionInput"
import ChoiceInput from "./questions/ChoiceInput"
import ColorInput from "./questions/ColorInput"
import DateTimeInput from "./questions/DateTimeInput"
import ParagraphInput from "./questions/ParagraphInput"
import SliderInput from "./questions/SliderInput"
import SwitchInput from "./questions/SwitchInput"
import TableInput from "./questions/TableInput"
import TextInput from "./questions/TextInput"

export default (props: InputProps<iQuestion, iAnswer>) => {
	if (props.question.type === "text")
		return <TextInput {...(props as InputProps<iTextQuestion, iTextAnswer>)} />

	if (props.question.type === "paragraph")
		return <ParagraphInput {...(props as InputProps<iParagraphQuestion, iParagraphAnswer>)} />

	if (props.question.type === "color")
		return <ColorInput {...(props as InputProps<iColorQuestion, iColorAnswer>)} />

	if (props.question.type === "choice")
		return <ChoiceInput {...(props as InputProps<iChoiceQuestion, iChoiceAnswer>)} />

	if (props.question.type === "switch")
		return <SwitchInput {...(props as InputProps<iSwitchQuestion, iSwitchAnswer>)} />

	if (props.question.type === "slider")
		return <SliderInput {...(props as InputProps<iSliderQuestion, iSliderAnswer>)} />

	if (props.question.type === "datetime")
		return <DateTimeInput {...(props as InputProps<iDateTimeQuestion, iDateTimeAnswer>)} />

	if (props.question.type === "table")
		return <TableInput {...(props as InputProps<iTableQuestion, iTableAnswer>)} />

	throw new Error("Unknown question type")
}
