import { FC, PropsWithChildren, useState } from "react"

import { Textarea } from "@chakra-ui/react"

import Card from "../../../components/Card"
import EditableText from "../../../components/EditableText"
import { ParagraphQuestion } from "../../../models/Question"

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
			<Textarea
				mt={4}
				value={paragraph}
				onChange={e => setParagraph(e.target.value)}
				placeholder="Paragraph answer"
				disabled={editable}
			/>
		</Card>
	)
}

export default ParagraphQuestionComponent
