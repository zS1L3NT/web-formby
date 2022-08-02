import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useImmer } from "use-immer"

import { Box, Button, Center, Spinner, useBoolean, useToast } from "@chakra-ui/react"

import { useGetFormQuery, useGetFormQuestionsQuery, useSetAnswersMutation } from "../../../../api"
import AuthContext from "../../../../contexts/AuthContext"
import { iAnswer } from "../../../../models/Answer"
import { getAnswerError, isAnswerEmpty } from "../../../../utils/answerUtils"
import FormHeader from "../components/FormHeader"
import QuestionInput from "../components/QuestionInput"

const FormAnswer = () => {
	const { token, user } = useContext(AuthContext)
	const params = useParams()
	const toast = useToast()
	const { data: form } = useGetFormQuery({ form_id: params.form_id!, token })
	const { data: questions } = useGetFormQuestionsQuery({ form_id: params.form_id!, token })
	const [setAnswersMutation] = useSetAnswersMutation()

	const [isSubmitting, setIsSubmitting] = useBoolean()
	const [errors, setErrors] = useState<(string | null)[] | null>(null)
	const [answers, setAnswers] = useImmer<Omit<iAnswer, "id">[] | null>(null)

	useEffect(() => {
		setAnswers(
			_ =>
				questions?.map<Omit<iAnswer, "id">>(question => {
					const answer = {
						user_id: user?.id ?? null,
						question_id: question.id
					}

					switch (question.type) {
						case "text":
							return { ...answer, text: "" }
						case "paragraph":
							return { ...answer, paragraph: "" }
						case "color":
							return { ...answer, color: "" }
						case "choice":
							return { ...answer, choices: [] }
						case "switch":
							return { ...answer, switch: false }
						case "slider":
							return { ...answer, slider: question.slider_min }
						case "datetime":
							return { ...answer, datetime: "" }
						case "table":
							return { ...answer, table: [] }
						default:
							throw new Error("Unknown question type")
					}
				}) ?? null
		)
	}, [user, questions])

	const handleSubmit = async () => {
		if (!questions || !answers) return

		const errors = questions.map((question, i) => getAnswerError(question, answers[i]!))

		setErrors(errors)
		if (errors.every(item => item === null)) {
			setIsSubmitting.on()
			await setAnswersMutation({
				answers: answers.filter(
					(answer, i) => questions[i]!.required || !isAnswerEmpty(questions[i]!, answer)
				),
				token
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

	return form && questions && answers ? (
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
	)
}

export default FormAnswer
