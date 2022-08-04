import { Textarea } from "@chakra-ui/react"

import { iParagraphAnswer } from "../../../../../models/Answer"
import { iParagraphQuestion } from "../../../../../models/Question"
import { InputProps } from "../QuestionInput"

const ParagraphInput = ({
	answer,
	setAnswer
}: InputProps<iParagraphQuestion, iParagraphAnswer>) => {
	return (
		<Textarea
			value={answer.paragraph}
			onChange={e => setAnswer({ ...answer, paragraph: e.target.value })}
			placeholder="Paragraph answer"
			borderColor="whiteAlpha.300"
		/>
	)
}

export default ParagraphInput
