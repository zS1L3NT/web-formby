import { Box, Image, Text } from "@chakra-ui/react"

import Card from "../../../../components/Card"
import { WithTimestamps } from "../../../../models"
import { iAnswer } from "../../../../models/Answer"
import { iQuestion } from "../../../../models/Question"
import { iResponse } from "../../../../models/Response"
import { iUser } from "../../../../models/User"
import RenderAnswers from "./RenderAnswers"

export type AnswersProps<iQ extends iQuestion, iA extends iAnswer> = {
	question: WithTimestamps<iQ>
	answers: WithTimestamps<iA>[]
	responses: WithTimestamps<iResponse>[]
	users: WithTimestamps<iUser>[]
}

const QuestionAnswers = ({
	question,
	responses,
	answers,
	users
}: AnswersProps<iQuestion, iAnswer>) => {
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

			<RenderAnswers
				question={question}
				answers={answers}
				responses={responses}
				users={users}
			/>
		</Card>
	)
}

export default QuestionAnswers
