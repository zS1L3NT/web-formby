import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useImmer } from "use-immer"

import { Box, Button, Center, Container, Spinner, useBoolean, useToast } from "@chakra-ui/react"

import {
	useCreateFormResponseMutation, useGetFormQuery, useGetFormQuestionsQuery
} from "../../../../api"
import AuthContext from "../../../../contexts/AuthContext"
import useToastError from "../../../../hooks/useToastError"
import { iAnswer } from "../../../../models/Answer"
import { getAnswerError, getEmptyAnswer, isAnswerEmpty } from "../../../../utils/answerUtils"
import FormHeader from "../components/FormHeader"
import QuestionInput from "../components/QuestionInput"

const FormAnswer = () => {
	const { token, user } = useContext(AuthContext)
	const toast = useToast()
	const form_id = useParams().form_id!

	const { data: form, error: formError } = useGetFormQuery({ form_id, token })
	const { data: questions, error: questionsError } = useGetFormQuestionsQuery({ form_id, token })
	const [createFormResponse] = useCreateFormResponseMutation()

	const [isSubmitting, setIsSubmitting] = useBoolean()
	const [errors, setErrors] = useState<(string | null)[] | null>(null)
	const [answers, setAnswers] = useImmer<Omit<iAnswer, "id">[] | null>(null)

	useToastError(formError)
	useToastError(questionsError)

	useEffect(() => {
		setAnswers(
			_ =>
				questions?.map<Omit<iAnswer, "id">>(question => getEmptyAnswer(user, question)) ??
				null
		)
	}, [user, questions])

	const handleSubmit = async () => {
		if (!form || !questions || !answers) return

		const errors = questions.map((question, i) => getAnswerError(question, answers[i]!))

		setErrors(errors)
		if (errors.every(item => item === null)) {
			setIsSubmitting.on()
			await createFormResponse({
				token,
				form_id: form.id,
				answers: answers.filter(
					(answer, i) => questions[i]!.required || !isAnswerEmpty(questions[i]!, answer)
				)
			})
			setIsSubmitting.off()
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
			{form && questions && answers ? (
				<>
					<FormHeader form={form} />
					{questions!.map((question, i) => (
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
					))}
					<Button
						disabled={isSubmitting}
						variant="primary"
						onClick={handleSubmit}>
						Submit
					</Button>
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
