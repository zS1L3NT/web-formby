import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useImmer } from "use-immer"

import { Box, Center, Container, Spinner, useToast } from "@chakra-ui/react"

import { useGetFormQuery } from "../../../../api/forms"
import { useGetFormQuestionsQuery } from "../../../../api/questions"
import useOnlyAuthenticated from "../../../../hooks/useOnlyAuthenticated"
import useOnlyFormOwner from "../../../../hooks/useOnlyFormOwner"
import useToastError from "../../../../hooks/useToastError"
import { iAnswer } from "../../../../models/Answer"
import { getEmptyAnswer } from "../../../../utils/answerUtils"
import FormHeader from "../../answer/components/FormHeader"
import QuestionInput from "../../answer/components/QuestionInput"

const FormPreview = () => {
	const { token, user } = useOnlyAuthenticated()
	const navigate = useNavigate()
	const form_id = useParams().form_id!
	const toast = useToast()

	const { data: form, error: formError } = useGetFormQuery({ form_id, token })
	const { data: questions, error: questionsError } = useGetFormQuestionsQuery({ form_id, token })

	const [anonymous, setAnonymous] = useState(!token)
	const [answers, setAnswers] = useImmer<Omit<iAnswer<any>, "id" | "response_id">[] | null>(null)

	useOnlyFormOwner(user, form)

	useToastError(formError, true)
	useToastError(questionsError, true)

	useEffect(() => {
		setAnswers(
			_ => questions?.map<Omit<iAnswer<any>, "id" | "response_id">>(getEmptyAnswer) ?? null
		)
	}, [user, questions])

	useEffect(() => {
		if (!form) return

		if (form.state !== "draft") {
			navigate("../responses")
			toast({
				title: "Cannot preview a non-draft form",
				status: "error",
				isClosable: true
			})
		}
	}, [form])

	return (
		<Container
			mt={4}
			maxW="4xl">
			{form ? (
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
								error={null}
							/>
						))
					) : (
						<Center>
							<Spinner mt={4} />
						</Center>
					)}

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

export default FormPreview
