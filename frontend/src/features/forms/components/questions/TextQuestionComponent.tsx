import { FC, PropsWithChildren, useState } from "react"

import { Input } from "@chakra-ui/react"

import { DraggableProvided } from "react-beautiful-dnd"
import { TextQuestion } from "../../../../models/Question"
import QuestionComponent from "../QuestionComponent"

const TextQuestionComponent: FC<
	PropsWithChildren<{
		provided: DraggableProvided
		question: TextQuestion
		editable: boolean
	}>
> = props => {
	const { provided, question, editable } = props

	const [title, setTitle] = useState(question.title)
	const [description, setDescription] = useState(question.description)
	const [text, setText] = useState("")

	return (
		<QuestionComponent
			provided={provided}
			editable={editable}
			question={question}>
			<Input
				value={text}
				onChange={e => setText(e.target.value)}
				placeholder="Text answer"
				disabled={editable}
			/>
		</QuestionComponent>
	)
}

export default TextQuestionComponent
