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
				placeholder="Add a title"
				fontSize="2xl"
				text={title}
				setText={setTitle}
				color="black"
				noOfLines={2}
			/>
			<EditableText
				editable={editable}
				placeholder="Add a description"
				mt={2}
				fontSize="lg"
				text={description ?? ""}
				setText={setDescription}
				noOfLines={2}
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
