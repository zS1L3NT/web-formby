import { Textarea } from "@chakra-ui/react"

import { iParagraphAnswer } from "../../../../models/Answer"
import { iParagraphQuestion } from "../../../../models/Question"
import { QuestionProps } from "../Question"

const ParagraphQuestion = ({
	editable,
	answer,
	setAnswer
}: QuestionProps<iParagraphQuestion, iParagraphAnswer>) => {
	return (
		<Textarea
			value={answer.paragraph}
			onChange={e => setAnswer({ ...answer, paragraph: e.target.value })}
			placeholder="Paragraph answer"
			disabled={editable}
			borderColor="whiteAlpha.300"
		/>
	)
}

export default ParagraphQuestion
