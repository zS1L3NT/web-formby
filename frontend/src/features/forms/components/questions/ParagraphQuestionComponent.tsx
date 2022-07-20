import { FC, PropsWithChildren, useState } from "react"

import { Textarea } from "@chakra-ui/react"

import { DraggableProvided } from "react-beautiful-dnd"
import { ParagraphQuestion } from "../../../../models/Question"
import QuestionComponent from "../QuestionComponent"

const ParagraphQuestionComponent: FC<
	PropsWithChildren<{
		provided: DraggableProvided
		question: ParagraphQuestion
		editable: boolean
	}>
> = props => {
	const { provided, question, editable } = props

	const [title, setTitle] = useState(question.title)
	const [description, setDescription] = useState(question.description)
	const [paragraph, setParagraph] = useState("")

	return (
		<QuestionComponent
			provided={provided}
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
