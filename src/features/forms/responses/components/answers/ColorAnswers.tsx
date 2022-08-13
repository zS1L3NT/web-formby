import { Box, Flex } from "@chakra-ui/react"

import { AnswersProps } from "../QuestionAnswers"
import TableValueDisplay from "../TableValueDisplay"

const ColorAnswers = ({
	answers,
	responses,
	users
}: AnswersProps<"color">) => {
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
