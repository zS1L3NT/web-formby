import { Box } from "@chakra-ui/react"
import { FC, PropsWithChildren, useState } from "react"

import Card from "../../../components/Card"
import EditableText from "../../../components/EditableText"
import { Question } from "../../../models/Question"

const QuestionComponent: FC<
	PropsWithChildren<{
		editable: boolean
		question: Question
	}>
> = props => {
	const { editable, question } = props

	const [title, setTitle] = useState(question.title)
	const [description, setDescription] = useState(question.description)

	return (
		<Card>
			<EditableText
				editable={editable}
				required={true}
				text={title}
				setText={setTitle}
				placeholder="Add a title"
				fontSize="2xl"
				noOfLines={2}
			/>
			<EditableText
				editable={editable}
				text={description ?? ""}
				setText={setDescription}
				placeholder="Add a description"
				fontSize="lg"
				mt={2}
				noOfLines={2}
			/>
			<Box h={4} />
			{props.children}
		</Card>
	)
}

export default QuestionComponent
