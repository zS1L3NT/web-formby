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
