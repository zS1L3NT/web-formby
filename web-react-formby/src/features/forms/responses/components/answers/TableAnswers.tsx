import { useState } from "react"

import { Box, Flex, Text } from "@chakra-ui/react"

import Dropdown from "../../../../../components/Dropdown"
import ChartValueDisplay from "../ChartValueDisplay"
import { AnswersProps } from "../QuestionAnswers"

const TableAnswers = ({ question, answers, responses, users }: AnswersProps<"table">) => {
	const [selectedRow, setSelectedRow] = useState<string | null>(null)

	return (
		<>
			<Flex alignItems="center">
				<Text>Table Row:</Text>
				<Box
					ml={4}
					flex={1}>
					<Dropdown
						choices={question.table_rows}
						selectedChoice={selectedRow}
						setSelectedChoice={setSelectedRow}
					/>
				</Box>
			</Flex>
			<ChartValueDisplay
				id={question.id}
				title="Table Columns"
				values={question.table_columns}
				data={answers
					.map(answer => {
						const response = responses.find(
							response => response.id === answer.response_id
						)!
						const user = users.find(user => user.id === response.user_id)

						return answer.table
							.filter(item => item[0] === selectedRow)
							.map(item => ({
								value: item[1],
								response,
								user: user ?? null
							}))
					})
					.flat()}
				getModalHeader={value => `Responses for row "${value}"`}
			/>
		</>
	)
}

export default TableAnswers
