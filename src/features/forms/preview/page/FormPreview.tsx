import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useImmer } from "use-immer"

import { Box, Center, Container, Spinner, useToast } from "@chakra-ui/react"

import { useGetFormQuery, useGetFormQuestionsQuery } from "../../../../api"
import useOnlyAuthenticated from "../../../../hooks/useOnlyAuthenticated"
import useOnlyFormOwner from "../../../../hooks/useOnlyFormOwner"
import { iAnswer } from "../../../../models/Answer"
import { getEmptyAnswer } from "../../../../utils/answerUtils"
import FormHeader from "../../answer/components/FormHeader"
import QuestionInput from "../../answer/components/QuestionInput"

const FormPreview = () => {
	const { token, user } = useOnlyAuthenticated()
	const navigate = useNavigate()
	const form_id = useParams().form_id!
	const toast = useToast()

	const { data: form } = useGetFormQuery({ form_id, token })
	const { data: questions } = useGetFormQuestionsQuery({ form_id, token })

	const [answers, setAnswers] = useImmer<Omit<iAnswer, "id">[] | null>(null)

	useOnlyFormOwner(user, form)

	useEffect(() => {
		setAnswers(
			_ =>
				questions?.map<Omit<iAnswer, "id">>(question => getEmptyAnswer(user, question)) ??
				null
		)
	}, [user, questions])

	useEffect(() => {
		if (!form) return

		if (form.state !== "draft") {
			navigate("../responses")
			toast({
				title: "Cannot edit a non-draft form",
				status: "error",
				isClosable: true
			})
		}
	}, [form])

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
							error={null}
						/>
					))}
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
