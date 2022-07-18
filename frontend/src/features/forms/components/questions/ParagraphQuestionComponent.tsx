import { FC, PropsWithChildren, useState } from "react"

import { Textarea } from "@chakra-ui/react"

import { ParagraphQuestion } from "../../../../models/Question"
import QuestionComponent from "../QuestionComponent"

const ParagraphQuestionComponent: FC<
	PropsWithChildren<{
		question: ParagraphQuestion
		editable: boolean
	}>
> = props => {
	const { question, editable } = props

	const [title, setTitle] = useState(question.title)
	const [description, setDescription] = useState(question.description)
	const [paragraph, setParagraph] = useState("")

	return (
		<QuestionComponent
			editable={editable}
			question={question}>
			<Textarea
				value={paragraph}
				onChange={e => setParagraph(e.target.value)}
				placeholder="Paragraph answer"
				disabled={editable}
			/>
		</QuestionComponent>
	)
}

export default ParagraphQuestionComponent
