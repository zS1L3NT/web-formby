import { createRef, useContext } from "react"

import {
	AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter,
	AlertDialogHeader, AlertDialogOverlay, Button
} from "@chakra-ui/react"

import { useDeleteFormQuestionMutation } from "../../../../api"
import AuthContext from "../../../../contexts/AuthContext"
import { iQuestion } from "../../../../models/Question"

const QuestionDeleteAlert = ({
	isOpen,
	onClose,
	question,
	setIsDeleting
}: {
	isOpen: boolean
	onClose: () => void
	question: iQuestion
	setIsDeleting: () => void
}) => {
	const { token } = useContext(AuthContext)
	const alertCancelRef = createRef<any>()

	const [deleteFormQuestionMutation] = useDeleteFormQuestionMutation()

	const handleDeleteQuestion = async () => {
		if (!token) return

		onClose()
		setIsDeleting()
		await deleteFormQuestionMutation({
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
