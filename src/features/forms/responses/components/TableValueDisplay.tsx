import { DateTime } from "luxon"
import { useNavigate } from "react-router-dom"

import { Table, TableContainer, Tbody, Td, Th, Thead, Tooltip, Tr } from "@chakra-ui/react"

import { WithTimestamps } from "../../../../models"
import { iAnswer } from "../../../../models/Answer"
import { iResponse } from "../../../../models/Response"
import { iUser } from "../../../../models/User"

const TableValueDisplay = <iA extends iAnswer>({
	answers,
	responses,
	users,
	columnHeader,
	getDataColumn
}: {
	answers: WithTimestamps<iA>[]
	responses: WithTimestamps<iResponse>[]
	users: WithTimestamps<iUser>[]
	columnHeader: string
	getDataColumn: (answer: WithTimestamps<iA>) => JSX.Element
}) => {
	const navigate = useNavigate()

	return (
		<TableContainer
			maxH={80}
			overflowY="scroll">
			<Table>
				<Thead
					pos="sticky"
					top={0}
					bg="card">
					<Tr>
						<Th width="fit-content">Respondent</Th>
						<Th>{columnHeader}</Th>
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
									<Td>{getDataColumn(answer)}</Td>
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

export default TableValueDisplay
