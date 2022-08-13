import { Textarea } from "@chakra-ui/react"

import { EditorProps } from "../QuestionEditor"

const ParagraphEditor = ({}: EditorProps<"paragraph">) => {
	return (
		<Textarea
			disabled={true}
			placeholder="Paragraph answer"
			borderColor="var(--chakra-colors-chakra-border-color)"
		/>
	)
}

export default ParagraphEditor
