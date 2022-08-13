import { useState } from "react"
import { useParams } from "react-router-dom"

import { Box, Center, Container, Spinner } from "@chakra-ui/react"

import {
	useGetFormQuery, useGetFormQuestionsQuery, useGetFormResponseQuery,
	useLazyGetFormResponseAnswersQuery, useLazyGetUserQuery
} from "../../../../api"
import useAsyncEffect from "../../../../hooks/useAsyncEffect"
import useOnlyAuthenticated from "../../../../hooks/useOnlyAuthenticated"
import useOnlyFormOwner from "../../../../hooks/useOnlyFormOwner"
import useToastError from "../../../../hooks/useToastError"
import { WithTimestamps } from "../../../../models"
import { iAnswer } from "../../../../models/Answer"
import { iUser } from "../../../../models/User"
import QuestionAnswer from "../components/QuestionAnswer"
import ResponseOverview from "../components/ResponseOverview"

const FormResponse = () => {
	const { token, user } = useOnlyAuthenticated()
	const form_id = useParams().form_id!
	const response_id = useParams().response_id!

	const { data: form, error: formError } = useGetFormQuery({ form_id, token })
	const { data: questions, error: questionsError } = useGetFormQuestionsQuery({ form_id, token })
	const { data: response, error: responseError } = useGetFormResponseQuery({
		form_id,
		response_id,
		token
	})
	const [getResponseAnswers, { error: responseAnswersError }] =
		useLazyGetFormResponseAnswersQuery()
	const [getUser, { error: userError }] = useLazyGetUserQuery()

	const [answers, setAnswers] = useState<WithTimestamps<iAnswer>[]>()
	const [_user, setUser] = useState<WithTimestamps<iUser> | null>()

	useOnlyFormOwner(user, form)

	useToastError(formError, true)
	useToastError(questionsError, true)
	useToastError(responseError, true)
	useToastError(userError, true)
	useToastError(responseAnswersError, true)

	useAsyncEffect(async () => {
		if (!token || !response) return

		if (response.user_id) {
			getUser(
				{
					user_id: response.user_id,
					token
				},
				true
			)
				.unwrap()
				.then(setUser)
		} else {
			setUser(null)
		}

		getResponseAnswers(
			{
				response_id: response.id,
				form_id: response.form_id,
				token
			},
			true
		)
			.unwrap()
			.then(setAnswers)
	}, [token, response])

	return (
		<Container
			mt={4}
			maxW="4xl">
			{form ? (
				<>
					<ResponseOverview
						form={form}
						user={_user}
					/>
					{questions && answers ? (
						questions.map(question => (
							<QuestionAnswer
								key={question.id}
								question={question}
								answer={
									answers.find(answer => answer.question_id === question.id) ??
									null
								}
							/>
						))
					) : (
						<Center mt={4}>
							<Spinner />
						</Center>
					)}
					<Box h={16} />
				</>
			) : (
				<Center mt={4}>
					<Spinner />
				</Center>
			)}
		</Container>
	)
}

export default FormResponse
