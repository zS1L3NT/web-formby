import { useContext } from "react"
import { DraggableProvided } from "react-beautiful-dnd"

import { Alert, AlertIcon, AlertTitle, Box, Collapse, Image, Text } from "@chakra-ui/react"

import Card from "../../../../components/Card"
import FormContext from "../../../../contexts/FormContext"
import { iAnswer } from "../../../../models/Answer"
import { iQuestion } from "../../../../models/Question"
import { RenderQuestion } from "../../../../utils/questionUtils"

export type QuestionProps<iQ extends iQuestion, iA extends iAnswer> = {
	question: iQ
	answer: Omit<iA, "id">
	setAnswer: (answer: Omit<iA, "id">) => void
}

const Question = ({
	index,
	provided,
	question,
	error
}: {
	index: number
	provided?: DraggableProvided
	question: iQuestion
	error: string | null
}) => {
	const { answers, setAnswers } = useContext(FormContext)

	return (
		<Box ref={provided?.innerRef}>
			<Card
				mb={4}
				pos="relative"
				borderWidth={error ? 4 : 0}
				borderColor="red.200"
				borderRadius="lg"
				transition="borderWidth 0.3s">
				<Text fontSize="2xl" noOfLines={2} textAlign="left" color="text">
					{question.title}
				</Text>

				{question.description ? (
					<Text fontSize="lg" noOfLines={2} mt={2} textAlign="left" color="text">
						{question.description}
					</Text>
				) : null}

				{question.required ? (
					<Text color="red" textAlign="start" fontSize={14} mt={2}>
						* Required
					</Text>
				) : null}

				{question.photo ? (
					<Box pos="relative" w="fit-content" mx="auto" maxH={56}>
						<Image src={question.photo} mt={2} maxH={56} />
					</Box>
				) : null}

				<Box h={4} />

				<RenderQuestion
					question={question}
					answer={answers![index]!}
					setAnswer={answer => {
						setAnswers(answers => {
							answers[index] = answer
						})
					}}
				/>

				<Collapse in={!!error} animateOpacity>
					<Alert variant="left-accent" status="error" mt={4}>
						<AlertIcon />
						<AlertTitle>{error}</AlertTitle>
					</Alert>
				</Collapse>
			</Card>
		</Box>
	)
}

export default Question
