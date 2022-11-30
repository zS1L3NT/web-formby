import { AddIcon } from "@chakra-ui/icons"
import { IconButton } from "@chakra-ui/react"

import { useCreateFormQuestionMutation } from "../../../../api/questions"
import useOnlyAuthenticated from "../../../../hooks/useOnlyAuthenticated"
import useToastError from "../../../../hooks/useToastError"
import { iQuestion } from "../../../../models/Question"

const AddQuestion = ({
	formId,
	previousQuestion
}: {
	formId: string
	previousQuestion: iQuestion<any> | null
}) => {
	const { token } = useOnlyAuthenticated()

	const [createFormQuestion, { error }] = useCreateFormQuestionMutation()

	useToastError(error)

	return (
		<IconButton
			h={8}
			w="full"
			mb={{ base: 2, md: 4 }}
			bg="bg"
			_hover={{ bg: "card" }}
			aria-label="Add Question"
			onClick={() =>
				createFormQuestion({
					form_id: formId,
					token,
					previous_question_id: previousQuestion?.id ?? null,
					title: "New Question",
					description: null,
					photo: null,
					type: "text",
					required: false
				})
			}
			icon={
				<AddIcon
					w={3}
					h={3}
				/>
			}
		/>
	)
}

export default AddQuestion
