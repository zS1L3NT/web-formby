import { createRef, Dispatch, PropsWithChildren, SetStateAction, useState } from "react"
import { Draggable } from "react-beautiful-dnd"

import { ArrowDownIcon, ArrowUpIcon, CopyIcon, DeleteIcon, DragHandleIcon } from "@chakra-ui/icons"
import {
	Box, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuItemOption, MenuList,
	MenuOptionGroup
} from "@chakra-ui/react"

import Card from "../../../components/Card"
import {
	iChoiceQuestion, iColorQuestion, iDateTimeQuestion, iParagraphQuestion, iQuestion,
	iSliderQuestion, iSwitchQuestion, iTableQuestion, iTextQuestion
} from "../../../models/Question"
import EditableText from "./EditableText"
import ChoiceQuestion from "./questions/ChoiceQuestion"
import ColorQuestion from "./questions/ColorQuestion"
import DateTimeQuestion from "./questions/DateTimeQuestion"
import ParagraphQuestion from "./questions/ParagraphQuestion"
import SliderQuestion from "./questions/SliderQuestion"
import SwitchQuestion from "./questions/SwitchQuestion"
import TableQuestion from "./questions/TableQuestion"
import TextQuestion from "./questions/TextQuestion"

export type QuestionProps<iQ extends iQuestion> = PropsWithChildren<{
	editable: boolean
	dirtyQuestion: iQ
	setDirtyQuestion: Dispatch<SetStateAction<iQ>>
}>

const Question = (
	props: PropsWithChildren<{
		index: number
		editable: boolean
		question: iQuestion
	}>
) => {
	const { index, editable, question } = props

	const menuRef = createRef<HTMLButtonElement>()

	const [dirtyQuestion, setDirtyQuestion] = useState(question)

	const componentProps = {
		editable,
		dirtyQuestion,
		setDirtyQuestion,
		question
	}

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
							setText={title => setDirtyQuestion({ ...dirtyQuestion, title })}
							placeholder="Add a title"
							fontSize="2xl"
							noOfLines={2}
						/>
					</Box>
					<EditableText
						editable={editable}
						text={dirtyQuestion.description ?? ""}
						setText={description => setDirtyQuestion({ ...dirtyQuestion, description })}
						placeholder="Add a description"
						fontSize="lg"
						mt={2}
						noOfLines={2}
					/>
					<Box h={4} />

					{dirtyQuestion.type === "text" ? (
						<TextQuestion {...(componentProps as QuestionProps<iTextQuestion>)} />
					) : null}

					{dirtyQuestion.type === "paragraph" ? (
						<ParagraphQuestion
							{...(componentProps as QuestionProps<iParagraphQuestion>)}
						/>
					) : null}

					{dirtyQuestion.type === "color" ? (
						<ColorQuestion {...(componentProps as QuestionProps<iColorQuestion>)} />
					) : null}

					{dirtyQuestion.type === "choice" ? (
						<ChoiceQuestion {...(componentProps as QuestionProps<iChoiceQuestion>)} />
					) : null}

					{dirtyQuestion.type === "switch" ? (
						<SwitchQuestion {...(componentProps as QuestionProps<iSwitchQuestion>)} />
					) : null}

					{dirtyQuestion.type === "slider" ? (
						<SliderQuestion {...(componentProps as QuestionProps<iSliderQuestion>)} />
					) : null}

					{dirtyQuestion.type === "datetime" ? (
						<DateTimeQuestion
							{...(componentProps as QuestionProps<iDateTimeQuestion>)}
						/>
					) : null}

					{dirtyQuestion.type === "table" ? (
						<TableQuestion {...(componentProps as QuestionProps<iTableQuestion>)} />
					) : null}
				</Card>
			)}
		</Draggable>
	)
}

export default Question
