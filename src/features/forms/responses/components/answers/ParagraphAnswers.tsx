import { DateTime } from "luxon"
import { useNavigate } from "react-router-dom"

import { Table, TableContainer, Tbody, Td, Th, Thead, Tooltip, Tr } from "@chakra-ui/react"

import { iParagraphAnswer } from "../../../../../models/Answer"
import { iParagraphQuestion } from "../../../../../models/Question"
import { AnswersProps } from "../QuestionAnswers"

const ParagraphAnswers = ({
	answers,
	responses,
	users
}: AnswersProps<iParagraphQuestion, iParagraphAnswer>) => {
	const navigate = useNavigate()

	return (
		<TableContainer>
			<Table>
				<Thead>
					<Tr>
						<Th width="fit-content">Respondent</Th>
						<Th>Paragraph</Th>
						<Th isNumeric>Date</Th>
					</Tr>
				</Thead>
				<Tbody>
					{answers
						.sort(
							(a, b) =>
								new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
						)
						.map(answer => {
							const response = responses.find(r => r.id === answer.response_id)!
							const user = users.find(u => u.id === response.user_id)

							return (
								<Tr key={answer.id}>
									<Td
										textDecor="underline"
										cursor="pointer"
										onClick={() => navigate(response.id)}>
										<Tooltip
											label={
												user
													? `View ${user.name}'s full response`
													: "View full response"
											}>
											{user?.name ?? "Anonymous User"}
										</Tooltip>
									</Td>
									<Td>{answer.paragraph}</Td>
									<Td isNumeric>
										{DateTime.fromISO(answer.created_at).toFormat(
											"dd LLL yyyy, HH:mm:ss"
										)}
									</Td>
								</Tr>
							)
						})}
				</Tbody>
			</Table>
		</TableContainer>
	)
}

export default ParagraphAnswers
