import { diff } from "deep-object-diff"
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
	setDirtyQuestion: (dirtyQuestion: iQ) => void
}>

const Question = (
	props: PropsWithChildren<{
		index: number
		editable: boolean
		question: iQuestion
	}>
) => {
	const { index, editable, question } = props

	const { token } = useContext(AuthContext)
	const fetcher = useFetcher()
	const menuRef = createRef<HTMLButtonElement>()
	const alertCancelRef = createRef<any>()

	const { isOpen, onOpen, onClose } = useDisclosure()
	const [dirtyQuestion, setDirtyQuestion] = useState(question)
	const prevDirtyQuestion = usePrevious(dirtyQuestion)

	useEffect(() => {
		if (!token || !prevDirtyQuestion) return

		const dq = dirtyQuestion
		const pdq = prevDirtyQuestion
		const difference: Record<string, any> = {}

		if (dq.title !== pdq.title) {
			difference.title = dq.title
		}

		if (dq.description !== pdq.description) {
			difference.description = dq.description
		}

		if (dq.photo !== pdq.photo) {
			difference.photo = dq.photo
		}

		if (dq.required !== pdq.required) {
			difference.required = dq.required
		}

		if (dq.type !== pdq.type) {
			difference.type = dq.type

			switch (dq.type) {
				case "choice":
					difference.choices = dq.choices ?? []
					difference.choice_type = dq.choice_type ?? "radio"
					break
				case "slider":
					difference.slider_min = dq.slider_min ?? 0
					difference.slider_step = dq.slider_step ?? 10
					difference.slider_max = dq.slider_max ?? 100
					break
				case "table":
					difference.table_columns = dq.table_columns ?? []
					difference.table_rows = dq.table_rows ?? []
					difference.table_type = dq.table_type ?? "radio"
					break
			}
		} else {
			switch (dq.type) {
				case "choice":
					const cdq = pdq as iChoiceQuestion

					if (Object.keys(diff(dq.choices ?? {}, cdq.choices ?? {})).length) {
						difference.choices = dq.choices
					}

					if (dq.choice_type !== cdq.choice_type) {
						difference.choice_type = dq.choice_type
					}
					break
				case "slider":
					const sdq = pdq as iSliderQuestion

					if (dq.slider_min !== sdq.slider_min) {
						difference.slider_min = dq.slider_min
					}

					if (dq.slider_step !== sdq.slider_step) {
						difference.slider_step = dq.slider_step
					}

					if (dq.slider_max !== sdq.slider_max) {
						difference.slider_max = dq.slider_max
					}
					break
				case "table":
					const tdq = pdq as iTableQuestion

					if (Object.keys(diff(dq.table_columns ?? {}, tdq.table_columns ?? {})).length) {
						difference.table_columns = dq.table_columns
					}

					if (Object.keys(diff(dq.table_rows ?? {}, tdq.table_rows ?? {})).length) {
						difference.table_rows = dq.table_rows
					}

					if (dq.table_type !== tdq.table_type) {
						difference.table_type = dq.table_type
					}
					break
			}
		}

		if (Object.keys(difference).length > 0) {
			fetcher(
				{
					url: "/forms/{form_id}/questions/{question_id}",
					method: "PUT",
					parameters: {
						form_id: dirtyQuestion.form_id,
						question_id: dirtyQuestion.id
					},
					body: difference,
					token
				},
				{
					toast: false
				}
			).then(({ data }) => {
				if (data) {
					setDirtyQuestion(data.question)
				}
			})
		}
	}, [dirtyQuestion, token])

	const handleDeleteQuestion = () => {
		if (!token) return

		fetcher(
			{
				url: "/forms/{form_id}/questions/{question_id}",
				method: "DELETE",
				parameters: {
					form_id: dirtyQuestion.form_id,
					question_id: dirtyQuestion.id
				},
				token
			},
			{
				toast: false
			}
		)
	}

	const componentProps = {
		editable,
		dirtyQuestion,
		setDirtyQuestion
	}

	return (
		<>
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
									onChange={type =>
										setDirtyQuestion({
											...dirtyQuestion,
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
									defaultValue={question.required ? ["required"] : []}
									onChange={value =>
										setDirtyQuestion({
											...dirtyQuestion,
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
							setText={description =>
								setDirtyQuestion({ ...dirtyQuestion, description })
							}
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
							<ChoiceQuestion
								{...(componentProps as QuestionProps<iChoiceQuestion>)}
							/>
						) : null}

						{dirtyQuestion.type === "switch" ? (
							<SwitchQuestion
								{...(componentProps as QuestionProps<iSwitchQuestion>)}
							/>
						) : null}

						{dirtyQuestion.type === "slider" ? (
							<SliderQuestion
								{...(componentProps as QuestionProps<iSliderQuestion>)}
							/>
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
