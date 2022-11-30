import { Input } from "@chakra-ui/react"

import { InputProps } from "../QuestionInput"

const TextInput = ({ answer, setAnswer }: InputProps<"text">) => {
	return (
		<Input
			value={answer.text}
			onChange={e => setAnswer({ ...answer, text: e.target.value })}
			placeholder="Text answer"
			borderColor="var(--chakra-colors-chakra-border-color)"
		/>
	)
}

export default TextInput
