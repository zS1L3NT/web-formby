import { useParams } from "react-router-dom"

import { Container } from "@chakra-ui/react"

import { useGetFormQuery, useGetFormQuestionsQuery, useGetFormResponseQuery } from "../../../api"
import useOnlyAuthenticated from "../../../hooks/useOnlyAuthenticated"
import useOnlyFormOwner from "../../../hooks/useOnlyFormOwner"
import useToastError from "../../../hooks/useToastError"

const FormResponse = () => {
	const { token, user } = useOnlyAuthenticated()
	const form_id = useParams().form_id as string
	const response_id = useParams().response_id as string

	const { data: form, error: formError } = useGetFormQuery({ form_id, token })
	const { data: questions, error: questionsError } = useGetFormQuestionsQuery({ form_id, token })
	const { data: response, error: responseError } = useGetFormResponseQuery({ form_id, response_id, token })

	useOnlyFormOwner(user, form)

	useToastError(formError)
	useToastError(questionsError)
	useToastError(responseError)

	return (
		<Container
			mt={4}
			maxW="4xl"></Container>
	)
}

export default FormResponse
