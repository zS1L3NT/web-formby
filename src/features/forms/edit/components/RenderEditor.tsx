import {
	iChoiceQuestion, iColorQuestion, iDateTimeQuestion, iParagraphQuestion, iQuestion,
	iSliderQuestion, iSwitchQuestion, iTableQuestion, iTextQuestion
} from "../../../../models/Question"
import { EditorProps } from "./QuestionEditor"
import ChoiceEditor from "./questions/ChoiceEditor"
import ColorEditor from "./questions/ColorEditor"
import DateTimeEditor from "./questions/DateTimeEditor"
import ParagraphEditor from "./questions/ParagraphEditor"
import SliderEditor from "./questions/SliderEditor"
import SwitchEditor from "./questions/SwitchEditor"
import TableEditor from "./questions/TableEditor"
import TextEditor from "./questions/TextEditor"

export default (props: EditorProps<iQuestion>) => {
	if (props.question.type === "text")
		return <TextEditor {...(props as EditorProps<iTextQuestion>)} />

	if (props.question.type === "paragraph")
		return <ParagraphEditor {...(props as EditorProps<iParagraphQuestion>)} />

	if (props.question.type === "color")
		return <ColorEditor {...(props as EditorProps<iColorQuestion>)} />

	if (props.question.type === "choice")
		return <ChoiceEditor {...(props as EditorProps<iChoiceQuestion>)} />

	if (props.question.type === "switch")
		return <SwitchEditor {...(props as EditorProps<iSwitchQuestion>)} />

	if (props.question.type === "slider")
		return <SliderEditor {...(props as EditorProps<iSliderQuestion>)} />

	if (props.question.type === "datetime")
		return <DateTimeEditor {...(props as EditorProps<iDateTimeQuestion>)} />

	if (props.question.type === "table")
		return <TableEditor {...(props as EditorProps<iTableQuestion>)} />

	throw new Error("Unknown question type")
}
