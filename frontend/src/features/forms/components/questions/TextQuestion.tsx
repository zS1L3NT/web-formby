

import { Input } from "@chakra-ui/react"

import { iTextAnswer } from "../../../../models/Answer"
import { iTextQuestion } from "../../../../models/Question"
import { QuestionProps } from "../Question"

const TextQuestion = ({
	editable,
	answer,
	setAnswer
}: QuestionProps<iTextQuestion, iTextAnswer>) => {
	return (
		<Input
			value={answer.text}
			onChange={e => setAnswer({ ...answer, text: e.target.value })}
			placeholder="Text answer"
			disabled={editable}
			borderColor="whiteAlpha.300"
		/>
	)
}

export default TextQuestion
