import { Textarea } from "@chakra-ui/react"

import { iParagraphQuestion } from "../../../../../models/Question"
import { EditorProps } from "../QuestionEditor"

const ParagraphEditor = ({}: EditorProps<iParagraphQuestion>) => {
	return (
		<Textarea
			disabled={true}
			placeholder="Paragraph answer"
			borderColor="whiteAlpha.300"
		/>
	)
}

export default ParagraphEditor
