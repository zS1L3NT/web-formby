import { FC, PropsWithChildren, useState } from "react"
import { DraggableProvided } from "react-beautiful-dnd"
import { FaEllipsisV } from "react-icons/fa"

import { ArrowDownIcon, ArrowUpIcon, CopyIcon, DeleteIcon, DragHandleIcon } from "@chakra-ui/icons"
import {
	Box, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuItemOption, MenuList,
	MenuOptionGroup
} from "@chakra-ui/react"

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
				icon={<DragHandleIcon />}
				aria-label="Options"
				pos="absolute"
				right="-14px"
				minW={6}
				{...provided.dragHandleProps}
			/>
			<Menu>
				<MenuButton
					as={IconButton}
					hidden={!editable}
					aria-label="Options"
					pos="absolute"
					right="-14px"
					mt={12}
					minW={6}>
					<FaEllipsisV />
				</MenuButton>
				<MenuList zIndex={10}>
					<MenuOptionGroup
						defaultValue={question.type}
						title="Question Type"
						type="radio"
						textAlign="start">
						<MenuItemOption value="text">Text</MenuItemOption>
						<MenuItemOption value="paragraph">Paragraph</MenuItemOption>
						<MenuItemOption value="color">Color</MenuItemOption>
						<MenuItemOption value="choice">Choice</MenuItemOption>
						<MenuItemOption value="switch">Switch</MenuItemOption>
						<MenuItemOption value="slider">Slider</MenuItemOption>
						<MenuItemOption value="datetime">DateTime</MenuItemOption>
						<MenuItemOption value="table">Table</MenuItemOption>
					</MenuOptionGroup>
					<MenuDivider />
					<MenuItem icon={<ArrowUpIcon />}>Add question above</MenuItem>
					<MenuItem icon={<ArrowDownIcon />}>Add question below</MenuItem>
					<MenuItem icon={<CopyIcon />}>Duplicate</MenuItem>
					<MenuItem icon={<DeleteIcon />}>Delete</MenuItem>
				</MenuList>
			</Menu>

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
