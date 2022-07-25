import { createRef, PropsWithChildren, useContext, useEffect, useState } from "react"
import { Draggable } from "react-beautiful-dnd"

import { ArrowDownIcon, ArrowUpIcon, CopyIcon, DeleteIcon, DragHandleIcon } from "@chakra-ui/icons"
import {
	AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter,
	AlertDialogHeader, AlertDialogOverlay, Box, Button, IconButton, Menu, MenuButton, MenuDivider,
	MenuItem, MenuItemOption, MenuList, MenuOptionGroup, useDisclosure, usePrevious
} from "@chakra-ui/react"

import Card from "../../../components/Card"
import AuthContext from "../../../contexts/AuthContext"
import useFetcher from "../../../hooks/useFetcher"
import {
	iChoiceQuestion, iColorQuestion, iDateTimeQuestion, iParagraphQuestion, iQuestion,
	iSliderQuestion, iSwitchQuestion, iTableQuestion, iTextQuestion
} from "../../../models/Question"
import getQuestionDifference from "../../../utils/getQuestionDifference"
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
	question: iQ
	setQuestion: (question: iQ) => void
}>

const Question = (
	props: PropsWithChildren<{
		index: number
		editable: boolean
		parentQuestion: iQuestion
		setParentQuestion: (question: iQuestion | null) => void
	}>
) => {
	const { index, editable, parentQuestion, setParentQuestion } = props

	const { token } = useContext(AuthContext)
	const fetcher = useFetcher()
	const menuRef = createRef<HTMLButtonElement>()
	const alertCancelRef = createRef<any>()

	const { isOpen, onOpen, onClose } = useDisclosure()
	const [question, setQuestion] = useState(parentQuestion)
	const prevQuestion = usePrevious(question)

	useEffect(() => {
		if (!token || !prevQuestion) return

		const difference = getQuestionDifference(prevQuestion, question)
		if (Object.keys(difference).length > 0) {
			fetcher(
				{
					url: "/forms/{form_id}/questions/{question_id}",
					method: "PUT",
					parameters: {
						form_id: question.form_id,
						question_id: question.id
					},
					body: difference,
					token
				},
				{
					toast: false
				}
			).then(({ data }) => {
				if (data) {
					setParentQuestion(data.question)
					setQuestion(data.question)
				}
			})
		}
	}, [question, token])

	const handleDeleteQuestion = () => {
		if (!token) return

		fetcher(
			{
				url: "/forms/{form_id}/questions/{question_id}",
				method: "DELETE",
				parameters: {
					form_id: question.form_id,
					question_id: question.id
				},
				token
			},
			{
				toast: false
			}
		).then(({ data }) => {
			if (data) {
				setParentQuestion(null)
			}
		})
	}

	const componentProps = {
		editable,
		question,
		setQuestion
	}

	return (
		<>
			<Draggable
				index={index}
				draggableId={parentQuestion.id}>
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
									defaultValue={parentQuestion.type}
									onChange={type =>
										setQuestion({
											...question,
											// @ts-ignore
											type
										})
									}
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
									defaultValue={parentQuestion.required ? ["required"] : []}
									onChange={value =>
										setQuestion({
											...question,
											required: value.includes("required")
										})
									}
									type="checkbox">
									<MenuItemOption value="required">Required</MenuItemOption>
								</MenuOptionGroup>
								<MenuItem icon={<ArrowUpIcon />}>Add question above</MenuItem>
								<MenuItem icon={<ArrowDownIcon />}>Add question below</MenuItem>
								<MenuItem icon={<CopyIcon />}>Duplicate</MenuItem>
								<MenuItem
									icon={<DeleteIcon />}
									onClick={onOpen}>
									Delete
								</MenuItem>
							</MenuList>
						</Menu>

						<Box mr={editable ? 8 : 0}>
							<EditableText
								editable={editable}
								required={true}
								text={question.title}
								setText={title => setQuestion({ ...question, title })}
								placeholder="Add a title"
								fontSize="2xl"
								noOfLines={2}
							/>
						</Box>
						<EditableText
							editable={editable}
							text={question.description ?? ""}
							setText={description => setQuestion({ ...question, description })}
							placeholder="Add a description"
							fontSize="lg"
							mt={2}
							noOfLines={2}
						/>
						<Box h={4} />

						{question.type === "text" ? (
							<TextQuestion {...(componentProps as QuestionProps<iTextQuestion>)} />
						) : null}

						{question.type === "paragraph" ? (
							<ParagraphQuestion
								{...(componentProps as QuestionProps<iParagraphQuestion>)}
							/>
						) : null}

						{question.type === "color" ? (
							<ColorQuestion {...(componentProps as QuestionProps<iColorQuestion>)} />
						) : null}

						{question.type === "choice" ? (
							<ChoiceQuestion
								{...(componentProps as QuestionProps<iChoiceQuestion>)}
							/>
						) : null}

						{question.type === "switch" ? (
							<SwitchQuestion
								{...(componentProps as QuestionProps<iSwitchQuestion>)}
							/>
						) : null}

						{question.type === "slider" ? (
							<SliderQuestion
								{...(componentProps as QuestionProps<iSliderQuestion>)}
							/>
						) : null}

						{question.type === "datetime" ? (
							<DateTimeQuestion
								{...(componentProps as QuestionProps<iDateTimeQuestion>)}
							/>
						) : null}

						{question.type === "table" ? (
							<TableQuestion {...(componentProps as QuestionProps<iTableQuestion>)} />
						) : null}
					</Card>
				)}
			</Draggable>

			<AlertDialog
				motionPreset="slideInBottom"
				leastDestructiveRef={alertCancelRef}
				onClose={onClose}
				isOpen={isOpen}
				isCentered>
				<AlertDialogOverlay />

				<AlertDialogContent>
					<AlertDialogHeader>Delete Question?</AlertDialogHeader>
					<AlertDialogCloseButton />
					<AlertDialogBody>
						Are you sure you want to delete this Question? This action is irreversable!
					</AlertDialogBody>
					<AlertDialogFooter>
						<Button
							ref={alertCancelRef}
							onClick={onClose}>
							Cancel
						</Button>
						<Button
							colorScheme="red"
							onClick={handleDeleteQuestion}
							ml={3}>
							Delete
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}

export default Question
