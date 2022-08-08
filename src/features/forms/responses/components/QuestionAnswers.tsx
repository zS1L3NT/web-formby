import { Box, Center, Image, Spinner, Text } from "@chakra-ui/react"

import { useGetFormQuestionAnswersQuery } from "../../../../api"
import Card from "../../../../components/Card"
import useOnlyAuthenticated from "../../../../hooks/useOnlyAuthenticated"
import { iQuestion } from "../../../../models/Question"
import RenderAnswers from "./RenderAnswers"

const QuestionAnswers = ({ question }: { question: iQuestion }) => {
	const { token } = useOnlyAuthenticated()
	const { data: answers } = useGetFormQuestionAnswersQuery({
		form_id: question.form_id,
		question_id: question.id,
		token
	})

	return (
		<Card mb={4}>
			<Text
				fontSize="2xl"
				noOfLines={2}
				textAlign="left"
				color="text">
				{question.title}
			</Text>

			{question.description ? (
				<Text
					fontSize="lg"
					noOfLines={2}
					mt={2}
					textAlign="left"
					color="text">
					{question.description}
				</Text>
			) : null}

			{question.required ? (
				<Text
					color="red"
					textAlign="start"
					fontSize={14}
					mt={2}>
					* Required
				</Text>
			) : null}

			{question.photo ? (
				<Box
					pos="relative"
					w="fit-content"
					mx="auto"
					maxH={56}>
					<Image
						src={question.photo}
						mt={2}
						maxH={56}
					/>
				</Box>
			) : null}
			
			{answers ? (
				<RenderAnswers
					question={question}
					answers={answers}
				/>
			) : (
				<Center>
					<Spinner />
				</Center>
			)}
		</Card>
	)
}

export default QuestionAnswers
