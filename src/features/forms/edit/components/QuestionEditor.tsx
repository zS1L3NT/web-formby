import { createRef, useEffect } from "react"
import { DraggableProvided } from "react-beautiful-dnd"
import { Updater, useImmer } from "use-immer"

import { DeleteIcon, DragHandleIcon } from "@chakra-ui/icons"
import {
	Box, Button, Center, IconButton, Image, Input, Spinner, Text, useBoolean, useDisclosure,
	usePrevious, useToast
} from "@chakra-ui/react"

import { useUpdateFormQuestionMutation } from "../../../../api"
import Card from "../../../../components/Card"
import useAsyncEffect from "../../../../hooks/useAsyncEffect"
import useOnlyAuthenticated from "../../../../hooks/useOnlyAuthenticated"
import useToastError from "../../../../hooks/useToastError"
import { iQuestionType } from "../../../../models"
import { iQuestion } from "../../../../models/Question"
import { getQuestionDifference } from "../../../../utils/questionUtils"
import AddQuestion from "./AddQuestion"
import EditableText from "./EditableText"
import OptionsMenu from "./OptionsMenu"
import QuestionDeleteAlert from "./QuestionDeleteAlert"
import RenderEditor from "./RenderEditor"

export type EditorProps<T extends iQuestionType> = {
	question: iQuestion<T>
	setQuestion: Updater<iQuestion<T>>
}

const QuestionEditor = ({
	provided,
	parentQuestion
}: {
	provided?: DraggableProvided
	parentQuestion: iQuestion<any>
}) => {
	const { token } = useOnlyAuthenticated()
	const toast = useToast()
	const photoInputRef = createRef<HTMLInputElement>()
	const menuRef = createRef<HTMLButtonElement>()

	const [updateFormQuestion, { error }] = useUpdateFormQuestionMutation()

	const { isOpen, onOpen, onClose } = useDisclosure()
	const [isDeleting, setIsDeleting] = useBoolean()
	const [question, setQuestion] = useImmer(parentQuestion)
	const __question = usePrevious(question)

	// Update {question} every time {parentQuestion} changes
	useEffect(() => {
		setQuestion(parentQuestion)
	}, [parentQuestion])

	// Update the question on the server whenever a field in the question changes
	useAsyncEffect(async () => {
		if (!token || !__question) return

		const difference = getQuestionDifference(__question, question)
		if (Object.keys(difference).length > 0) {
			await updateFormQuestion({
				form_id: question.form_id,
				question_id: question.id,
				token,
				...difference
			})
		}
	}, [question, token])

	useToastError(error)

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

	return (
		<>
			<Box
				ref={provided?.innerRef}
				{...provided?.draggableProps}>
				<Card
					mb={{ base: 2, md: 4 }}
					pos="relative"
					borderWidth={0}
					borderRadius="lg">
					<IconButton
						icon={<DragHandleIcon />}
						aria-label="Options"
						pos="absolute"
						right={4}
						minW={6}
						onClick={() => menuRef.current?.click()}
						{...provided?.dragHandleProps}
					/>

					<OptionsMenu
						menuRef={menuRef}
						onDelete={onOpen}
						question={question}
						setQuestion={setQuestion}
					/>

					<Box mr={8}>
						<EditableText
							required={true}
							text={question.title}
							setText={title => setQuestion({ ...question, title })}
							placeholder="Add a title"
							fontSize="2xl"
							noOfLines={2}
						/>
					</Box>

					<EditableText
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
							<Center
								w="full"
								h="full"
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
						</Box>
					) : (
						<Box>
							<Button
								display="block"
								mt={2}
								mx="auto"
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
					)}

					<Box h={4} />

					<RenderEditor
						question={question}
						setQuestion={setQuestion}
					/>

					{isDeleting ? (
						<Center
							pos="absolute"
							w="full"
							h="full"
							top={0}
							left={0}
							bg="black"
							borderRadius="lg"
							opacity={0.5}
							zIndex={5}>
							<Spinner />
						</Center>
					) : null}
				</Card>

				<AddQuestion
					formId={question.form_id}
					previousQuestion={question}
				/>
			</Box>

			<QuestionDeleteAlert
				isOpen={isOpen}
				onClose={onClose}
				question={question}
				setIsDeleting={() => setIsDeleting.on()}
			/>
		</>
	)
}

export default QuestionEditor
