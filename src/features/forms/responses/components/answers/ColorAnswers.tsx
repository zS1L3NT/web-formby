import { Box, Flex } from "@chakra-ui/react"

import { iColorAnswer } from "../../../../../models/Answer"
import { iColorQuestion } from "../../../../../models/Question"
import { AnswersProps } from "../QuestionAnswers"
import TableValueDisplay from "../TableValueDisplay"

const ColorAnswers = ({
	answers,
	responses,
	users
}: AnswersProps<iColorQuestion, iColorAnswer>) => {
	return (
		<TableValueDisplay
			answers={answers}
			responses={responses}
			users={users}
			columnHeader="Color"
			getDataColumn={answer => (
				<Flex alignItems="center">
					<Box
						h={6}
						w={6}
						borderRadius="50%"
						bg={answer.color}
						mr={2}
					/>
					{answer.color.toUpperCase()}
				</Flex>
			)}
		/>
	)
}

export default ColorAnswers
