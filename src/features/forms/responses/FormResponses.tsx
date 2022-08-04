import { useState } from "react"
import { useParams } from "react-router-dom"

import { Container } from "@chakra-ui/react"

import {
	useGetFormQuery, useGetFormQuestionsQuery, useGetFormResponsesQuery, useLazyGetFormQuestionQuery
} from "../../../api"
import useAppDispatch from "../../../hooks/useAppDispatch"
import useAsyncEffect from "../../../hooks/useAsyncEffect"
import useOnlyAuthenticated from "../../../hooks/useOnlyAuthenticated"
import useOnlyFormOwner from "../../../hooks/useOnlyFormOwner"
import useToastError from "../../../hooks/useToastError"
import { WithTimestamps } from "../../../models"
import { iQuestion } from "../../../models/Question"
import { setError } from "../../../slices/ErrorSlice"
import RenderModal from "./components/RenderModal"

const FormResponses = () => {
	const { token, user } = useOnlyAuthenticated()
	const dispatch = useAppDispatch()
	const form_id = useParams().form_id!
	const question_id = useParams().question_id ?? null

	const { data: form, error: formError } = useGetFormQuery({ form_id, token })
	const { data: questions, error: questionsError } = useGetFormQuestionsQuery({ form_id, token })
	const { data: responses, error: responsesError } = useGetFormResponsesQuery({ form_id, token })
	const [getFormQuestion, { isFetching: questionIsFetching }] = useLazyGetFormQuestionQuery()

	const [question, setQuestion] = useState<WithTimestamps<iQuestion> | null>(null)

	useOnlyFormOwner(user, form)

	useToastError(formError)
	useToastError(questionsError)
	useToastError(responsesError)

	useAsyncEffect(async () => {
		if (!question_id || !form) return

		const result = await getFormQuestion({ form_id: form.id, question_id, token })
		if ("data" in result) {
			setQuestion(result.data!)
		} else {
			dispatch(setError(result.error!))
		}
	}, [form, token, question_id])

	return (
		<Container
			mt={4}
			maxW="4xl">
			<RenderModal
				question={question}
				isFetching={questionIsFetching}
			/>
		</Container>
	)
}

export default FormResponses
