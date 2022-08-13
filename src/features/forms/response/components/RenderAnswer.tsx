import ChoiceAnswer from "./answers/ChoiceAnswer"
import ColorAnswer from "./answers/ColorAnswer"
import DateTimeAnswer from "./answers/DateTimeAnswer"
import ParagraphAnswer from "./answers/ParagraphAnswer"
import SliderAnswer from "./answers/SliderAnswer"
import SwitchAnswer from "./answers/SwitchAnswer"
import TableAnswer from "./answers/TableAnswer"
import TextAnswer from "./answers/TextAnswer"
import { AnswerProps } from "./QuestionAnswer"

const RenderAnswer = (props: AnswerProps<any>) => {
	if (props.question.type === "text") {
		return <TextAnswer {...(props as AnswerProps<"text">)} />
	}

	if (props.question.type === "paragraph") {
		return <ParagraphAnswer {...(props as AnswerProps<"paragraph">)} />
	}

	if (props.question.type === "color") {
		return <ColorAnswer {...(props as AnswerProps<"color">)} />
	}

	if (props.question.type === "choice") {
		return <ChoiceAnswer {...(props as AnswerProps<"choice">)} />
	}

	if (props.question.type === "switch") {
		return <SwitchAnswer {...(props as AnswerProps<"switch">)} />
	}

	if (props.question.type === "slider") {
		return <SliderAnswer {...(props as AnswerProps<"slider">)} />
	}

	if (props.question.type === "datetime") {
		return <DateTimeAnswer {...(props as AnswerProps<"datetime">)} />
	}

	if (props.question.type === "table") {
		return <TableAnswer {...(props as AnswerProps<"table">)} />
	}

	throw new Error("Unknown question type")
}

export default RenderAnswer
