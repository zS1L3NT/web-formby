import { createRef, PropsWithChildren, useContext, useEffect } from "react"
import { DraggableProvided } from "react-beautiful-dnd"
import { Updater, useImmer } from "use-immer"

import { DeleteIcon, DragHandleIcon } from "@chakra-ui/icons"
import {
	Alert, AlertIcon, AlertTitle, Box, Button, Center, Collapse, IconButton, Image, Input, Text,
	useDisclosure, usePrevious, useToast
} from "@chakra-ui/react"

import Card from "../../../components/Card"
import AuthContext from "../../../contexts/AuthContext"
import FormContext from "../../../contexts/FormContext"
import useFetcher from "../../../hooks/useFetcher"
import {
	iAnswer, iChoiceAnswer, iColorAnswer, iDateTimeAnswer, iParagraphAnswer, iSliderAnswer,
	iSwitchAnswer, iTableAnswer, iTextAnswer
} from "../../../models/Answer"
import {
	iChoiceQuestion, iColorQuestion, iDateTimeQuestion, iParagraphQuestion, iQuestion,
	iSliderQuestion, iSwitchQuestion, iTableQuestion, iTextQuestion
} from "../../../models/Question"
import getQuestionDifference from "../../../utils/getQuestionDifference"
import EditableText from "./EditableText"
import NewQuestionButton from "./NewQuestionButton"
import OptionsMenu from "./popups/OptionsMenu"
import QuestionDeleteAlert from "./popups/QuestionDeleteAlert"
import ChoiceQuestion from "./questions/ChoiceQuestion"
import ColorQuestion from "./questions/ColorQuestion"
import DateTimeQuestion from "./questions/DateTimeQuestion"
import ParagraphQuestion from "./questions/ParagraphQuestion"
import SliderQuestion from "./questions/SliderQuestion"
import SwitchQuestion from "./questions/SwitchQuestion"
import TableQuestion from "./questions/TableQuestion"
import TextQuestion from "./questions/TextQuestion"

export type QuestionProps<iQ extends iQuestion, iA extends iAnswer> = PropsWithChildren<{
	editable: boolean
	question: iQ
	setQuestion: Updater<iQ>
	answer: Omit<iA, "id">
	setAnswer: (answer: Omit<iA, "id">) => void
}>

const Question = ({
	index,
	provided,
	editable,
	parentQuestion,
	error
}: PropsWithChildren<{
	index: number
	provided?: DraggableProvided
	editable: boolean
	parentQuestion: iQuestion
	error: string | null
}>) => {
	const { token } = useContext(AuthContext)
	const { setQuestions, answers, setAnswers } = useContext(FormContext)
	const fetcher = useFetcher()
	const toast = useToast()
	const photoInputRef = createRef<HTMLInputElement>()
	const menuRef = createRef<HTMLButtonElement>()

	const { isOpen, onOpen, onClose } = useDisclosure()
	const [question, setQuestion] = useImmer(parentQuestion)
	const __question = usePrevious(question)

	useEffect(() => {
		setQuestion(parentQuestion)
	}, [parentQuestion])

	useEffect(() => {
		if (!token || !__question) return

		const difference = getQuestionDifference(__question, question)
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
					setQuestions(questions =>
						questions.map((q, i) => (i === index ? data.question : q))
					)
				}
			})
		}
	}, [question, token])

	const handleFileChange = (file: File | null) => {
		if (!file) {
			setQuestion(question => {
				question.photo = null
			})
			return
		}

		if (!file.type.startsWith("image/")) {
			toast({
				title: "File is not an image",
				status: "error",
				isClosable: true
			})
			photoInputRef.current!.value = ""
			return
		}

		if (file.size > 500000) {
			toast({
				title: "File size cannot be more than 500kB",
				status: "error",
				isClosable: true
			})
			photoInputRef.current!.value = ""
			return
		}

		const reader = new FileReader()
		reader.onload = () => {
			setQuestion(question => {
				question.photo = reader.result as string
			})
		}
		reader.readAsDataURL(file)
	}

	const componentProps: QuestionProps<iQuestion, iAnswer> = {
		editable,
		question,
		setQuestion,
		answer: answers![index]!,
		setAnswer: answer => {
			setAnswers(answers => {
				answers[index] = answer
			})
		}
	}

	return (
		<>
			<Box
				ref={provided?.innerRef}
				{...(editable ? provided?.draggableProps : {})}>
				<Card
					mb={4}
					pos="relative"
					borderWidth={error ? 4 : 0}
					borderColor="red.200"
					borderRadius="lg"
					transition="borderWidth 0.3s">
					<IconButton
						hidden={!editable}
						icon={<DragHandleIcon />}
						aria-label="Options"
						pos="absolute"
						right={4}
						minW={6}
						onClick={() => menuRef.current?.click()}
						{...provided?.dragHandleProps}
					/>

					<OptionsMenu
						editable={editable}
						index={index}
						menuRef={menuRef}
						onDelete={onOpen}
						question={question}
						setQuestion={setQuestion}
					/>

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

					{question.required ? (
						<Text
							color="red"
							textAlign="start"
							fontSize={14}
							mt={2}>
							* Required
						</Text>
					) : null}

					{question.photo ? (
						<Box
							pos="relative"
							w="fit-content"
							mx="auto"
							maxH={56}>
							<Image
								src={question.photo}
								mt={2}
								maxH={56}
							/>
							{editable ? (
								<Center
									w="max"
									h="max"
									pos="absolute"
									top={0}
									left={0}
									bg="black"
									zIndex={1}
									transition="opacity 0.3s"
									opacity={0}
									_hover={{
										opacity: 0.8
									}}>
									<IconButton
										aria-label="Delete photo"
										icon={<DeleteIcon />}
										onClick={() => handleFileChange(null)}
									/>
								</Center>
							) : null}
						</Box>
					) : editable ? (
						<Box>
							<Button
								display="block"
								mt={2}
								mr="auto"
								onClick={() => photoInputRef.current?.click()}>
								Select Photo
							</Button>
							<Input
								hidden={true}
								ref={photoInputRef}
								type="file"
								accept="image/*"
								onChange={e => handleFileChange(e.target.files?.[0] ?? null)}
							/>
						</Box>
					) : null}

					<Box h={4} />

					{question.type === "text" ? (
						<TextQuestion
							{...(componentProps as QuestionProps<iTextQuestion, iTextAnswer>)}
						/>
					) : null}

					{question.type === "paragraph" ? (
						<ParagraphQuestion
							{...(componentProps as QuestionProps<
								iParagraphQuestion,
								iParagraphAnswer
							>)}
						/>
					) : null}

					{question.type === "color" ? (
						<ColorQuestion
							{...(componentProps as QuestionProps<iColorQuestion, iColorAnswer>)}
						/>
					) : null}

					{question.type === "choice" ? (
						<ChoiceQuestion
							{...(componentProps as QuestionProps<iChoiceQuestion, iChoiceAnswer>)}
						/>
					) : null}

					{question.type === "switch" ? (
						<SwitchQuestion
							{...(componentProps as QuestionProps<iSwitchQuestion, iSwitchAnswer>)}
						/>
					) : null}

					{question.type === "slider" ? (
						<SliderQuestion
							{...(componentProps as QuestionProps<iSliderQuestion, iSliderAnswer>)}
						/>
					) : null}

					{question.type === "datetime" ? (
						<DateTimeQuestion
							{...(componentProps as QuestionProps<
								iDateTimeQuestion,
								iDateTimeAnswer
							>)}
						/>
					) : null}

					{question.type === "table" ? (
						<TableQuestion
							{...(componentProps as QuestionProps<iTableQuestion, iTableAnswer>)}
						/>
					) : null}

					<Collapse
						in={!!error}
						animateOpacity>
						<Alert
							variant="left-accent"
							status="error"
							mt={4}>
							<AlertIcon />
							<AlertTitle>{error}</AlertTitle>
						</Alert>
					</Collapse>
				</Card>

				<NewQuestionButton
					editable={editable}
					index={index + 1}
				/>
			</Box>

			<QuestionDeleteAlert
				isOpen={isOpen}
				onCancel={onClose}
				index={index}
				question={question}
				parentQuestion={parentQuestion}
			/>
		</>
	)
}

export default Question
