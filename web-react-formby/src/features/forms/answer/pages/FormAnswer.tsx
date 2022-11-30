import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useImmer } from "use-immer"

import { Box, Button, Center, Container, Spinner, useToast } from "@chakra-ui/react"

import { useGetFormQuery } from "../../../../api/forms"
import { useGetFormQuestionsQuery } from "../../../../api/questions"
import { useCreateFormResponseMutation } from "../../../../api/responses"
import AuthContext from "../../../../contexts/AuthContext"
import useToastError from "../../../../hooks/useToastError"
import { iAnswer } from "../../../../models/Answer"
import { getAnswerError, getEmptyAnswer, isAnswerEmpty } from "../../../../utils/answerUtils"
import FormHeader from "../components/FormHeader"
import QuestionInput from "../components/QuestionInput"
import SubmittedCard from "../components/SubmittedCard"

const FormAnswer = () => {
	const { token } = useContext(AuthContext)
	const navigate = useNavigate()
	const form_id = useParams().form_id!
	const toast = useToast()

	const { data: form, error: formError } = useGetFormQuery({ form_id, token })
	const { data: questions, error: questionsError } = useGetFormQuestionsQuery({ form_id, token })
	const [createFormResponse, { isLoading, isSuccess, error }] = useCreateFormResponseMutation()

	const [anonymous, setAnonymous] = useState(!token)
	const [errors, setErrors] = useState<(string | null)[] | null>(null)
	const [answers, setAnswers] = useImmer<Omit<iAnswer<any>, "id" | "response_id">[] | null>(null)

	useToastError(formError, true)
	useToastError(questionsError, true)
	useToastError(error)

	useEffect(() => {
		setAnswers(
			_ => questions?.map<Omit<iAnswer<any>, "id" | "response_id">>(getEmptyAnswer) ?? null
		)
	}, [questions])

	useEffect(() => {
		if (!form) return

		if (form.state === "draft") {
			navigate("edit")
		}
	}, [form])

	const handleSubmit = async () => {
		if (!form || !questions || !answers) return

		const errors = questions.map((question, i) => getAnswerError(question, answers[i]!))

		setErrors(errors)
		if (errors.every(item => item === null)) {
			await createFormResponse({
				token: form.auth ? token : anonymous ? null : token,
				form_id: form.id,
				answers: answers.filter(
					(answer, i) => questions[i]!.required || !isAnswerEmpty(questions[i]!, answer)
				)
			})
		} else {
			toast({
				title: "Error",
				description: `Form contains ${
					errors.filter(item => item !== null).length
				} error(s)`,
				status: "error",
				isClosable: true
			})
		}
	}

	return (
		<Container
			mt={4}
			maxW="4xl">
			{isSuccess ? (
				<SubmittedCard />
			) : form ? (
				<>
					<FormHeader
						form={form}
						anonymous={anonymous}
						setAnonymous={form.auth || !token ? null : setAnonymous}
					/>
					{questions && answers ? (
						questions!.map((question, i) => (
							<QuestionInput
								key={question.id}
								question={question}
								answer={answers![i]!}
								setAnswer={answer => {
									setAnswers(answers => {
										answers![i] = answer
									})
								}}
								error={errors?.[i] ?? null}
							/>
						))
					) : (
						<Center>
							<Spinner mt={4} />
						</Center>
					)}

					{questions && answers ? (
						<Button
							disabled={isLoading}
							variant="primary"
							onClick={handleSubmit}>
							Submit
						</Button>
					) : null}

					<Box h={16} />
				</>
			) : (
				<Center>
					<Spinner mt={4} />
				</Center>
			)}
		</Container>
	)
}

export default FormAnswer
