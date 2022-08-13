import { Input } from "@chakra-ui/react"

import { iTextQuestion } from "../../../../../models/Question"
import { EditorProps } from "../QuestionEditor"

const TextEditor = ({}: EditorProps<iTextQuestion>) => {
	return (
		<Input
			disabled={true}
			placeholder="Text answer"
			borderColor="var(--chakra-colors-chakra-border-color)"
		/>
	)
}

export default TextEditor
