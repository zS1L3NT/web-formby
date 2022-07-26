import { createRef, PropsWithChildren, useContext } from "react"

import {
	AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter,
	AlertDialogHeader, AlertDialogOverlay, Button
} from "@chakra-ui/react"

import AuthContext from "../../../contexts/AuthContext"
import FormContext from "../../../contexts/FormContext"
import useFetcher from "../../../hooks/useFetcher"
import { iQuestion } from "../../../models/Question"

const QuestionDeleteAlert = (
	props: PropsWithChildren<{
		isOpen: boolean
		onCancel: () => void
		index: number
		question: iQuestion
		parentQuestion: iQuestion
	}>
) => {
	const { isOpen, onCancel, index, question, parentQuestion } = props

	const { token } = useContext(AuthContext)
	const { setQuestions } = useContext(FormContext)
	const fetcher = useFetcher()
	const alertCancelRef = createRef<any>()

	const handleDeleteQuestion = () => {
		if (!token) return

		setQuestions(questions =>
			questions
				.filter((_, i) => i !== index)
				.map(q =>
					q.previous_question_id === parentQuestion.id
						? { ...q, previous_question_id: parentQuestion.previous_question_id }
						: q
				)
		)
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
		)
	}

	return (
		<AlertDialog
			motionPreset="slideInBottom"
			leastDestructiveRef={alertCancelRef}
			onClose={onCancel}
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
						onClick={onCancel}>
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
	)
}

export default QuestionDeleteAlert
