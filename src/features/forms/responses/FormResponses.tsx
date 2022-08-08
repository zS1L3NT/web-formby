import { useParams } from "react-router-dom"

import { Container } from "@chakra-ui/react"

import {
	useGetFormQuery, useGetFormQuestionsQuery, useGetFormResponsesQuery
} from "../../../api"
import useOnlyAuthenticated from "../../../hooks/useOnlyAuthenticated"
import useOnlyFormOwner from "../../../hooks/useOnlyFormOwner"
import useToastError from "../../../hooks/useToastError"

const FormResponses = () => {
	const { token, user } = useOnlyAuthenticated()
	const form_id = useParams().form_id!

	const { data: form, error: formError } = useGetFormQuery({ form_id, token })
	const { data: questions, error: questionsError } = useGetFormQuestionsQuery({ form_id, token })
	const { data: responses, error: responsesError } = useGetFormResponsesQuery({ form_id, token })

	useOnlyFormOwner(user, form)

	useToastError(formError)
	useToastError(questionsError)
	useToastError(responsesError)

	return (
		<Container
			mt={4}
			maxW="4xl">
		</Container>
	)
}

export default FormResponses
