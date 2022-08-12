import { useContext } from "react"

import { AddIcon } from "@chakra-ui/icons"
import { IconButton, Spinner, useBoolean } from "@chakra-ui/react"

import { useCreateFormQuestionMutation } from "../../../../api"
import AuthContext from "../../../../contexts/AuthContext"
import { iQuestion, iTextQuestion } from "../../../../models/Question"

const AddQuestion = ({
	formId,
	previousQuestion
}: {
	formId: string
	previousQuestion: iQuestion | null
}) => {
	const { token } = useContext(AuthContext)

	const [createFormQuestion] = useCreateFormQuestionMutation()

	const [isCreating, setIsCreating] = useBoolean()

	const handleCreate = async () => {
		if (token === null) return

		const question: Omit<iTextQuestion, "id" | "form_id"> = {
			previous_question_id: previousQuestion?.id ?? null,
			title: "New Question",
			description: null,
			photo: null,
			type: "text",
			required: false
		}

		setIsCreating.on()
		await createFormQuestion({ form_id: formId, token, ...question })
		setIsCreating.off()
	}

	return (
		<IconButton
			h={8}
			w="full"
			mb={{ base: 2, md: 4 }}
			bg="bg"
			_hover={{ bg: "card" }}
			aria-label="Add Question"
			isDisabled={isCreating}
			onClick={handleCreate}
			icon={
				isCreating ? (
					<Spinner
						w={3}
						h={3}
					/>
				) : (
					<AddIcon
						w={3}
						h={3}
					/>
				)
			}
		/>
	)
}

export default AddQuestion
