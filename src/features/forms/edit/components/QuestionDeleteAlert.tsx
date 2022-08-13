import { createRef } from "react"

import {
	AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter,
	AlertDialogHeader, AlertDialogOverlay, Button
} from "@chakra-ui/react"

import { useDeleteFormQuestionMutation } from "../../../../api"
import useOnlyAuthenticated from "../../../../hooks/useOnlyAuthenticated"
import useToastError from "../../../../hooks/useToastError"
import { iQuestion } from "../../../../models/Question"

const QuestionDeleteAlert = ({
	isOpen,
	onClose,
	question,
	setIsDeleting
}: {
	isOpen: boolean
	onClose: () => void
	question: iQuestion<any>
	setIsDeleting: () => void
}) => {
	const { token } = useOnlyAuthenticated()
	const alertCancelRef = createRef<any>()

	const [deleteFormQuestion, { error }] = useDeleteFormQuestionMutation()

	useToastError(error)

	const handleDeleteQuestion = async () => {
		onClose()
		setIsDeleting()
		await deleteFormQuestion({
			form_id: question.form_id,
			question_id: question.id,
			token
		})
	}

	return (
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
	)
}

export default QuestionDeleteAlert
