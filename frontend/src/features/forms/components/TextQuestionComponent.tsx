import { FC, PropsWithChildren, useState } from "react"

import { Input } from "@chakra-ui/react"

import Card from "../../../components/Card"
import EditableText from "../../../components/EditableText"
import { TextQuestion } from "../../../models/Question"

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
		<Card>
			<EditableText
				editable={editable}
				required={true}
				variant="title"
				text={title}
				setText={setTitle}
			/>
			<EditableText
				editable={editable}
				variant="description"
				text={description ?? ""}
				setText={setDescription}
			/>
			<Input
				mt={4}
				value={text}
				onChange={e => setText(e.target.value)}
				placeholder="Text answer"
				disabled={editable}
			/>
		</Card>
	)
}

export default TextQuestionComponent
