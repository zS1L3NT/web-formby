import { Input } from "@chakra-ui/react"

import { EditorProps } from "../QuestionEditor"

const TextEditor = ({}: EditorProps<"text">) => {
	return (
		<Input
			disabled={true}
			placeholder="Text answer"
			borderColor="var(--chakra-colors-chakra-border-color)"
		/>
	)
}

export default TextEditor
