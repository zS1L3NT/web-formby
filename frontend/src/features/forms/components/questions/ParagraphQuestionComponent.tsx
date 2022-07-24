import { FC, useState } from "react"

import { Textarea } from "@chakra-ui/react"

import { ParagraphQuestion } from "../../../../models/Question"
import { QuestionComponentProps } from "../QuestionComponent"

const ParagraphQuestionComponent: FC<QuestionComponentProps<ParagraphQuestion>> = props => {
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

export default ParagraphQuestionComponent
