import { useState } from "react"
import { useParams } from "react-router-dom"

import { Center, Container, Spinner } from "@chakra-ui/react"

import {
	useGetFormQuery, useGetFormQuestionsQuery, useGetFormResponsesQuery,
	useLazyGetFormResponseAnswersQuery, useLazyGetUserQuery
} from "../../../api"
import useAsyncEffect from "../../../hooks/useAsyncEffect"
import useOnlyAuthenticated from "../../../hooks/useOnlyAuthenticated"
import useOnlyFormOwner from "../../../hooks/useOnlyFormOwner"
import useToastError from "../../../hooks/useToastError"
import { WithTimestamps } from "../../../models"
import { iAnswer } from "../../../models/Answer"
import { iUser } from "../../../models/User"
import QuestionAnswers from "./components/QuestionAnswers"
import ResponsesOverview from "./components/ResponsesOverview"

const FormResponses = () => {
	const { token, user } = useOnlyAuthenticated()
	const form_id = useParams().form_id!

	const { data: form, error: formError } = useGetFormQuery({ form_id, token })
	const { data: questions, error: questionsError } = useGetFormQuestionsQuery({ form_id, token })
	const { data: responses, error: responsesError } = useGetFormResponsesQuery({ form_id, token })
	const [getResponseAnswers] = useLazyGetFormResponseAnswersQuery()
	const [getUser] = useLazyGetUserQuery()

	const [answers, setAnswers] = useState<WithTimestamps<iAnswer>[]>()
	const [users, setUsers] = useState<WithTimestamps<iUser>[]>()

	useOnlyFormOwner(user, form)

	useToastError(formError)
	useToastError(questionsError)
	useToastError(responsesError)

	useAsyncEffect(async () => {
		if (!token || !responses) return

		Promise.all(
			responses
				.filter(response => !!response.user_id)
				.map(response => getUser({ user_id: response.user_id!, token }).unwrap())
		).then(setUsers)

		Promise.all(
			responses.map(response =>
				getResponseAnswers({
					response_id: response.id,
					form_id: response.form_id,
					token
				}).unwrap()
			)
		).then(answers => setAnswers(answers.flat()))
	}, [token, responses])

	return (
		<Container
			mt={4}
			maxW="4xl">
			{form && questions && responses && answers && users ? (
				<>
					<ResponsesOverview
						form={form}
						responses={responses}
					/>
					{questions.map(question => (
						<QuestionAnswers
							key={question.id}
							question={question}
							responses={responses}
							answers={answers.filter(answer => answer.question_id === question.id)}
							users={users}
						/>
					))}
				</>
			) : (
				<Center>
					<Spinner />
				</Center>
			)}
		</Container>
	)
}

export default FormResponses
