import { Textarea } from "@chakra-ui/react"

import { AnswerProps } from "../QuestionAnswer"

const ParagraphAnswer = ({ answer }: AnswerProps<"paragraph">) => {
	return (
		<Textarea
			defaultValue={answer?.paragraph}
			placeholder="Paragraph answer"
			borderColor="var(--chakra-colors-chakra-border-color)"
			onFocus={e => e.target.blur()}
			cursor="not-allowed"
		/>
	)
}

export default ParagraphAnswer
