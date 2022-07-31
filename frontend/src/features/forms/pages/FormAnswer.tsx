import { useContext, useState } from "react"

import { Box, Button, Center, Spinner, useBoolean, useToast } from "@chakra-ui/react"

import AuthContext from "../../../contexts/AuthContext"
import FormContext from "../../../contexts/FormContext"
import useFetcher from "../../../hooks/useFetcher"
import { getAnswerError, isAnswerEmpty } from "../../../utils/answerUtils"
import FormHeader from "../components/FormHeader"
import Question from "../components/Question"

const FormAnswer = () => {
	const { token } = useContext(AuthContext)
	const { questions, answers } = useContext(FormContext)
	const fetcher = useFetcher()
	const toast = useToast()

	const [isSubmitting, setIsSubmitting] = useBoolean()
	const [errors, setErrors] = useState<(string | null)[] | null>(null)

	const handleSubmit = async () => {
		if (!questions || !answers) return

		const errors = questions.map((question, i) => getAnswerError(question, answers[i]!))

		setErrors(errors)
		if (errors.every(item => item === null)) {
			setIsSubmitting.on()
			await fetcher({
				url: "/answers",
				method: "POST",
				body: {
					answers: answers.filter(
						(answer, i) =>
							questions[i]!.required || !isAnswerEmpty(questions[i]!, answer)
					)
				},
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

	return questions && answers ? (
		<>
			<FormHeader editable={false} />
			{questions.map((question, i) => (
				<Question
					key={question.id}
					index={i}
					editable={false}
					parentQuestion={question}
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
