import ChoiceAnswers from "./answers/ChoiceAnswers"
import ColorAnswers from "./answers/ColorAnswers"
import DateTimeAnswers from "./answers/DateTimeAnswers"
import ParagraphAnswers from "./answers/ParagraphAnswers"
import SliderAnswers from "./answers/SliderAnswers"
import SwitchAnswers from "./answers/SwitchAnswers"
import TableAnswers from "./answers/TableAnswers"
import TextAnswers from "./answers/TextAnswers"
import { AnswersProps } from "./QuestionAnswers"

const RenderAnswers = (props: AnswersProps<any>) => {
	if (props.question.type === "text") {
		return <TextAnswers {...(props as AnswersProps<"text">)} />
	}

	if (props.question.type === "paragraph") {
		return <ParagraphAnswers {...(props as AnswersProps<"paragraph">)} />
	}

	if (props.question.type === "color") {
		return <ColorAnswers {...(props as AnswersProps<"color">)} />
	}

	if (props.question.type === "choice") {
		return <ChoiceAnswers {...(props as AnswersProps<"choice">)} />
	}

	if (props.question.type === "switch") {
		return <SwitchAnswers {...(props as AnswersProps<"switch">)} />
	}

	if (props.question.type === "slider") {
		return <SliderAnswers {...(props as AnswersProps<"slider">)} />
	}

	if (props.question.type === "datetime") {
		return <DateTimeAnswers {...(props as AnswersProps<"datetime">)} />
	}

	if (props.question.type === "table") {
		return <TableAnswers {...(props as AnswersProps<"table">)} />
	}

	throw new Error("Unknown question type")
}

export default RenderAnswers
