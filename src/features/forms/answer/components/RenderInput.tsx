import {
	iAnswer, iChoiceAnswer, iColorAnswer, iDateTimeAnswer, iParagraphAnswer, iSliderAnswer,
	iSwitchAnswer, iTableAnswer, iTextAnswer
} from "../../../../models/Answer"
import {
	iChoiceQuestion, iColorQuestion, iDateTimeQuestion, iParagraphQuestion, iQuestion,
	iSliderQuestion, iSwitchQuestion, iTableQuestion, iTextQuestion
} from "../../../../models/Question"
import ChoiceInput from "./inputs/ChoiceInput"
import ColorInput from "./inputs/ColorInput"
import DateTimeInput from "./inputs/DateTimeInput"
import ParagraphInput from "./inputs/ParagraphInput"
import SliderInput from "./inputs/SliderInput"
import SwitchInput from "./inputs/SwitchInput"
import TableInput from "./inputs/TableInput"
import TextInput from "./inputs/TextInput"
import { InputProps } from "./QuestionInput"

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
