import { FC, PropsWithChildren, useState } from "react"

import { Input } from "@chakra-ui/react"

import { TextQuestion } from "../../../../models/Question"
import QuestionComponent from "../QuestionComponent"

const TextQuestionComponent: FC<
	PropsWithChildren<{
		question: TextQuestion
		editable: boolean
	}>
> = props => {
	const { question, editable } = props

	const [title, setTitle] = useState(question.title)
	const [description, setDescription] = useState(question.description)
	const [text, setText] = useState("")

	return (
		<QuestionComponent
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
