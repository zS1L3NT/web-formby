import { useParams } from "react-router-dom"

import { Center, Container, Spinner } from "@chakra-ui/react"

import { useGetFormQuery, useGetFormQuestionsQuery, useGetFormResponsesQuery } from "../../../api"
import useOnlyAuthenticated from "../../../hooks/useOnlyAuthenticated"
import useOnlyFormOwner from "../../../hooks/useOnlyFormOwner"
import useToastError from "../../../hooks/useToastError"
import QuestionAnswers from "./components/QuestionAnswers"
import ResponsesOverview from "./components/ResponsesOverview"

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
			{form && questions && responses ? (
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
