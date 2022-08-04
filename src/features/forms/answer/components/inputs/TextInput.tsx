import { Input } from "@chakra-ui/react"

import { iTextAnswer } from "../../../../../models/Answer"
import { iTextQuestion } from "../../../../../models/Question"
import { InputProps } from "../QuestionInput"

const TextInput = ({ answer, setAnswer }: InputProps<iTextQuestion, iTextAnswer>) => {
	return (
		<Input
			value={answer.text}
			onChange={e => setAnswer({ ...answer, text: e.target.value })}
			placeholder="Text answer"
			borderColor="whiteAlpha.300"
		/>
	)
}

export default TextInput
