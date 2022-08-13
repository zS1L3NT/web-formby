
import { Input } from "@chakra-ui/react"

import { iTextAnswer } from "../../../../../models/Answer"
import { iTextQuestion } from "../../../../../models/Question"
import { AnswerProps } from "../QuestionAnswer"

const TextAnswer = ({ answer }: AnswerProps<iTextQuestion, iTextAnswer>) => {
	return (
		<Input
			defaultValue={answer?.text}
			placeholder="Text answer"
			borderColor="var(--chakra-colors-chakra-border-color)"
			onFocus={e => e.target.blur()}
			cursor="not-allowed"
		/>
	)
}

export default TextAnswer
