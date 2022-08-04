import {
	iChoiceQuestion, iColorQuestion, iDateTimeQuestion, iParagraphQuestion, iQuestion,
	iSliderQuestion, iSwitchQuestion, iTableQuestion, iTextQuestion
} from "../../../../models/Question"
import ChoiceEditor from "./editors/ChoiceEditor"
import ColorEditor from "./editors/ColorEditor"
import DateTimeEditor from "./editors/DateTimeEditor"
import ParagraphEditor from "./editors/ParagraphEditor"
import SliderEditor from "./editors/SliderEditor"
import SwitchEditor from "./editors/SwitchEditor"
import TableEditor from "./editors/TableEditor"
import TextEditor from "./editors/TextEditor"
import { EditorProps } from "./QuestionEditor"

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
