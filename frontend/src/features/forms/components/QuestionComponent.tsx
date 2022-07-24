import { createRef, PropsWithChildren, useState } from "react"
import { Draggable } from "react-beautiful-dnd"

import { ArrowDownIcon, ArrowUpIcon, CopyIcon, DeleteIcon, DragHandleIcon } from "@chakra-ui/icons"
import {
	Box, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuItemOption, MenuList,
	MenuOptionGroup
} from "@chakra-ui/react"

import Card from "../../../components/Card"
import { Question } from "../../../models/Question"
import EditableText from "./EditableText"
import ChoiceQuestionComponent from "./questions/ChoiceQuestionComponent"
import ColorQuestionComponent from "./questions/ColorQuestionComponent"
import DateTimeQuestionComponent from "./questions/DateTimeQuestionComponent"
import ParagraphQuestionComponent from "./questions/ParagraphQuestionComponent"
import SliderQuestionComponent from "./questions/SliderQuestionComponent"
import SwitchQuestionComponent from "./questions/SwitchQuestionComponent"
import TableQuestionComponent from "./questions/TableQuestionComponent"
import TextQuestionComponent from "./questions/TextQuestionComponent"

export type QuestionComponentProps<Q extends Question> = PropsWithChildren<{
	editable: boolean
	dirtyQuestion: Q
	setDirtyQuestion: React.Dispatch<React.SetStateAction<Q>>
	question: Question
}>

const QuestionComponent = <Q extends Question>(
	props: PropsWithChildren<{
		index: number
		editable: boolean
		question: Question
	}>
) => {
	const { index, editable, question } = props

	const menuRef = createRef<HTMLButtonElement>()

	const [dirtyQuestion, setDirtyQuestion] = useState(question as Q)

	const componentProps = {
		editable,
		dirtyQuestion,
		setDirtyQuestion,
		question
	} as QuestionComponentProps<Q>

	return (
		<Draggable
			index={index}
			draggableId={question.id}>
			{provided => (
				<Card
					mb={4}
					pos="relative"
					provided={editable ? provided : undefined}>
					<IconButton
						hidden={!editable}
						icon={<DragHandleIcon />}
						aria-label="Options"
						pos="absolute"
						right={4}
						minW={6}
						onClick={() => menuRef.current?.click()}
						{...(editable ? provided.dragHandleProps : {})}
					/>
					<Menu closeOnSelect={false}>
						<MenuButton
							ref={menuRef}
							as={IconButton}
							hidden={!editable}
							aria-label="Options"
							pos="absolute"
							right={4}
							zIndex={-1}
							minW={6}
						/>
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
							<MenuOptionGroup
								defaultChecked={question.required}
								type="checkbox">
								<MenuItemOption value="required">Required</MenuItemOption>
							</MenuOptionGroup>
							<MenuItem icon={<ArrowUpIcon />}>Add question above</MenuItem>
							<MenuItem icon={<ArrowDownIcon />}>Add question below</MenuItem>
							<MenuItem icon={<CopyIcon />}>Duplicate</MenuItem>
							<MenuItem icon={<DeleteIcon />}>Delete</MenuItem>
						</MenuList>
					</Menu>

					<Box mr={editable ? 8 : 0}>
						<EditableText
							editable={editable}
							required={true}
							text={dirtyQuestion.title}
							setText={title =>
								setDirtyQuestion(((dirtyQuestion.title = title), dirtyQuestion))
							}
							placeholder="Add a title"
							fontSize="2xl"
							noOfLines={2}
						/>
					</Box>
					<EditableText
						editable={editable}
						text={dirtyQuestion.description ?? ""}
						setText={description =>
							setDirtyQuestion(
								((dirtyQuestion.description = description), dirtyQuestion)
							)
						}
						placeholder="Add a description"
						fontSize="lg"
						mt={2}
						noOfLines={2}
					/>
					<Box h={4} />

					{dirtyQuestion.type === "text" ? (
						<TextQuestionComponent {...componentProps} />
					) : null}

					{dirtyQuestion.type === "paragraph" ? (
						<ParagraphQuestionComponent
							editable={editable}
							dirtyQuestion={dirtyQuestion}
							setDirtyQuestion={setDirtyQuestion}
							question={question}
						/>
					) : null}

					{dirtyQuestion.type === "color" ? (
						<ColorQuestionComponent
							editable={editable}
							dirtyQuestion={dirtyQuestion}
							setDirtyQuestion={setDirtyQuestion}
							question={question}
						/>
					) : null}

					{dirtyQuestion.type === "choice" ? (
						<ChoiceQuestionComponent
							editable={editable}
							dirtyQuestion={dirtyQuestion}
							setDirtyQuestion={setDirtyQuestion}
							question={question}
						/>
					) : null}

					{dirtyQuestion.type === "switch" ? (
						<SwitchQuestionComponent
							editable={editable}
							dirtyQuestion={dirtyQuestion}
							setDirtyQuestion={setDirtyQuestion}
							question={question}
						/>
					) : null}

					{dirtyQuestion.type === "slider" ? (
						<SliderQuestionComponent
							editable={editable}
							dirtyQuestion={dirtyQuestion}
							setDirtyQuestion={setDirtyQuestion}
							question={question}
						/>
					) : null}

					{dirtyQuestion.type === "datetime" ? (
						<DateTimeQuestionComponent
							editable={editable}
							dirtyQuestion={dirtyQuestion}
							setDirtyQuestion={setDirtyQuestion}
							question={question}
						/>
					) : null}

					{dirtyQuestion.type === "table" ? (
						<TableQuestionComponent
							editable={editable}
							dirtyQuestion={dirtyQuestion}
							setDirtyQuestion={setDirtyQuestion}
							question={question}
						/>
					) : null}
				</Card>
			)}
		</Draggable>
	)
}

export default QuestionComponent
