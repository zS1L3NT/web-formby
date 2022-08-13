import { Textarea } from "@chakra-ui/react"

import { InputProps } from "../QuestionInput"

const ParagraphInput = ({ answer, setAnswer }: InputProps<"paragraph">) => {
	return (
		<Textarea
			value={answer.paragraph}
			onChange={e => setAnswer({ ...answer, paragraph: e.target.value })}
			placeholder="Paragraph answer"
			borderColor="var(--chakra-colors-chakra-border-color)"
		/>
	)
}

export default ParagraphInput
