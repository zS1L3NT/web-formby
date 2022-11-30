import ChoiceEditor from "./editors/ChoiceEditor"
import ColorEditor from "./editors/ColorEditor"
import DateTimeEditor from "./editors/DateTimeEditor"
import ParagraphEditor from "./editors/ParagraphEditor"
import SliderEditor from "./editors/SliderEditor"
import SwitchEditor from "./editors/SwitchEditor"
import TableEditor from "./editors/TableEditor"
import TextEditor from "./editors/TextEditor"
import { EditorProps } from "./QuestionEditor"

export default (props: EditorProps<any>) => {
	if (props.question.type === "text") {
		return <TextEditor {...(props as EditorProps<"text">)} />
	}

	if (props.question.type === "paragraph") {
		return <ParagraphEditor {...(props as EditorProps<"paragraph">)} />
	}

	if (props.question.type === "color") {
		return <ColorEditor {...(props as EditorProps<"color">)} />
	}

	if (props.question.type === "choice") {
		return <ChoiceEditor {...(props as EditorProps<"choice">)} />
	}

	if (props.question.type === "switch") {
		return <SwitchEditor {...(props as EditorProps<"switch">)} />
	}

	if (props.question.type === "slider") {
		return <SliderEditor {...(props as EditorProps<"slider">)} />
	}

	if (props.question.type === "datetime") {
		return <DateTimeEditor {...(props as EditorProps<"datetime">)} />
	}

	if (props.question.type === "table") {
		return <TableEditor {...(props as EditorProps<"table">)} />
	}

	throw new Error("Unknown question type")
}
