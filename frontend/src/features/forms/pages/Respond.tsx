import { useContext, useState } from "react"

import { Box, Button, Center, Spinner, useBoolean, useToast } from "@chakra-ui/react"

import AuthContext from "../../../contexts/AuthContext"
import FormContext from "../../../contexts/FormContext"
import useFetcher from "../../../hooks/useFetcher"
import {
	iChoiceAnswer, iColorAnswer, iDateTimeAnswer, iParagraphAnswer, iTableAnswer, iTextAnswer
} from "../../../models/Answer"
import FormHeader from "../components/FormHeader"
import Question from "../components/Question"

const Respond = () => {
	const { token } = useContext(AuthContext)
	const { questions, answers } = useContext(FormContext)
	const fetcher = useFetcher()
	const toast = useToast()

	const [isSubmitting, setIsSubmitting] = useBoolean()
	const [errors, setErrors] = useState<(string | null)[] | null>(null)

	const handleSubmit = async () => {
		if (!questions || !answers) return

		const errors = questions.map((question, i) => {
			switch (question.type) {
				case "text":
					const textAnswer = answers[i] as iTextAnswer
					if (question.required && textAnswer.text === "") {
						return "Text cannot be empty"
					}
					return null
				case "paragraph":
					const paragraphAnswer = answers[i] as iParagraphAnswer
					if (question.required && paragraphAnswer.paragraph === "") {
						return "Paragraph cannot be empty"
					}
					return null
				case "color":
					const colorAnswer = answers[i] as iColorAnswer
					if (question.required && colorAnswer.color === "") {
						return "Color cannot be empty"
					}
					return null
				case "choice":
					const choiceAnswer = answers[i] as iChoiceAnswer
					if (question.required && choiceAnswer.choices.length === 0) {
						return "You must select at least 1 choice"
					}
					return null
				case "switch":
				case "slider":
					return null
				case "datetime":
					const dateTimeAnswer = answers[i] as iDateTimeAnswer
					if (question.required && dateTimeAnswer.datetime === "") {
						return "DateTime cannot be empty"
					}
					return null
				case "table":
					const tableAnswer = answers[i] as iTableAnswer
					if (
						question.required &&
						question.table_rows
							.map<boolean>(
								tableRow => !!tableAnswer.table.find(item => item[0] === tableRow)
							)
							.some(item => item === false)
					) {
						return "You have to select at least 1 choice per row"
					}
					return null
			}
		})

		setErrors(errors)
		if (errors.every(item => item === null)) {
			setIsSubmitting.on()
			await fetcher({
				url: "/answers",
				method: "POST",
				body: {
					answers
				},
				token
			})
			setIsSubmitting.off()
		} else {
			toast({
				title: "Error",
				description: `Form contains ${errors.filter(item => item !== null).length} error(s)`,
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

export default Respond
