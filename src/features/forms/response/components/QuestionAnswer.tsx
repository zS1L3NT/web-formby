import { Box, Image, Text } from "@chakra-ui/react"

import Card from "../../../../components/Card"
import { iQuestionType, WithTimestamps } from "../../../../models"
import { iAnswer } from "../../../../models/Answer"
import { iQuestion } from "../../../../models/Question"
import RenderAnswer from "./RenderAnswer"

export type AnswerProps<T extends iQuestionType> = {
	question: WithTimestamps<iQuestion<T>>
	answer: WithTimestamps<iAnswer<T>> | null
}

const QuestionAnswer = ({ question, answer }: AnswerProps<any>) => {
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

			<Box h={4} />

			<RenderAnswer
				question={question}
				answer={answer}
			/>
		</Card>
	)
}

export default QuestionAnswer
