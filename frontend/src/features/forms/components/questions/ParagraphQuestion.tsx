import { FC, useState } from "react"

import { Textarea } from "@chakra-ui/react"

import { iParagraphQuestion } from "../../../../models/Question"
import { QuestionProps } from "../Question"

const ParagraphQuestion: FC<QuestionProps<iParagraphQuestion>> = props => {
	const { editable } = props

	const [paragraph, setParagraph] = useState("")

	return (
		<Textarea
			value={paragraph}
			onChange={e => setParagraph(e.target.value)}
			placeholder="Paragraph answer"
			disabled={editable}
		/>
	)
}

export default ParagraphQuestion
