import ChoiceInput from "./inputs/ChoiceInput"
import ColorInput from "./inputs/ColorInput"
import DateTimeInput from "./inputs/DateTimeInput"
import ParagraphInput from "./inputs/ParagraphInput"
import SliderInput from "./inputs/SliderInput"
import SwitchInput from "./inputs/SwitchInput"
import TableInput from "./inputs/TableInput"
import TextInput from "./inputs/TextInput"
import { InputProps } from "./QuestionInput"

export default (props: InputProps<any>) => {
	if (props.question.type === "text") {
		return <TextInput {...(props as InputProps<"text">)} />
	}

	if (props.question.type === "paragraph") {
		return <ParagraphInput {...(props as InputProps<"paragraph">)} />
	}

	if (props.question.type === "color") {
		return <ColorInput {...(props as InputProps<"color">)} />
	}

	if (props.question.type === "choice") {
		return <ChoiceInput {...(props as InputProps<"choice">)} />
	}

	if (props.question.type === "switch") {
		return <SwitchInput {...(props as InputProps<"switch">)} />
	}

	if (props.question.type === "slider") {
		return <SliderInput {...(props as InputProps<"slider">)} />
	}

	if (props.question.type === "datetime") {
		return <DateTimeInput {...(props as InputProps<"datetime">)} />
	}

	if (props.question.type === "table") {
		return <TableInput {...(props as InputProps<"table">)} />
	}

	throw new Error("Unknown question type")
}
