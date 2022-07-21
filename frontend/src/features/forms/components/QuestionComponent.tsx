import { FC, PropsWithChildren, useState } from "react"
import { DraggableProvided } from "react-beautiful-dnd"

import { DragHandleIcon, SettingsIcon } from "@chakra-ui/icons"
import { Box, IconButton } from "@chakra-ui/react"

import Card from "../../../components/Card"
import { Question } from "../../../models/Question"
import EditableText from "./EditableText"

const QuestionComponent: FC<
	PropsWithChildren<{
		provided: DraggableProvided
		editable: boolean
		question: Question
	}>
> = props => {
	const { provided, editable, question } = props

	const [title, setTitle] = useState(question.title)
	const [description, setDescription] = useState(question.description)

	return (
		<Card
			mb={4}
			pos="relative"
			provided={provided}>
			<IconButton
				hidden={!editable}
				aria-label="Drag Handle"
				icon={<DragHandleIcon />}
				pos="absolute"
				right="-20px"
				minW={6}
				{...provided.dragHandleProps}
			/>
			<IconButton
				hidden={!editable}
				aria-label="Menu"
				icon={<SettingsIcon />}
				pos="absolute"
				right="-20px"
				mt={12}
				minW={6}
			/>
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
