import { PropsWithChildren, useContext } from "react"

import { AddIcon } from "@chakra-ui/icons"
import { IconButton, Spinner, useBoolean } from "@chakra-ui/react"

import AuthContext from "../../../contexts/AuthContext"
import FormContext from "../../../contexts/FormContext"
import useFetcher from "../../../hooks/useFetcher"
import { iTextQuestion } from "../../../models/Question"

const NewQuestionButton = (
	props: PropsWithChildren<{
		index: number
	}>
) => {
	const { index } = props

	const { token } = useContext(AuthContext)
	const { form, questions, setQuestions } = useContext(FormContext)
	const fetcher = useFetcher()

	const [isCreating, setIsCreating] = useBoolean()

	const handleCreate = async (index: number) => {
		if (questions === null || token === null) return

		const question: Omit<iTextQuestion, "id" | "form_id"> = {
			previous_question_id: questions[index - 1]?.id ?? null,
			title: "New Question",
			description: "",
			photo: "",
			type: "text",
			required: false
		}

		setIsCreating.on()
		const { data } = await fetcher({
			url: "/forms/{form_id}/questions",
			method: "POST",
			parameters: {
				form_id: form!.id
			},
			body: question,
			token
		})

		if (data) {
			setQuestions(questions => {
				questions.splice(index, 0, data.question)

				if (questions.length !== index) {
					questions.at(index + 1)!.previous_question_id = data.question.id
				}
			})
		}

		setIsCreating.off()
	}

	return (
		<IconButton
			aria-label="Add Question"
			isDisabled={isCreating}
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
			h={8}
			w="max"
			mb={4}
			onClick={() => handleCreate(index)}
		/>
	)
}

export default NewQuestionButton
