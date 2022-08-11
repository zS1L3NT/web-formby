import {
	Checkbox, CheckboxGroup, Radio, RadioGroup, Table, TableContainer, Tbody, Th, Thead, Tr
} from "@chakra-ui/react"

import { iTableAnswer } from "../../../../../models/Answer"
import { iTableQuestion } from "../../../../../models/Question"
import { InputProps } from "../QuestionInput"

const TableInput = ({
	question,
	answer,
	setAnswer
}: InputProps<iTableQuestion, iTableAnswer>) => {
	const { table_rows: tableRows, table_columns: tableColumns, table_type: tableType } = question

	return (
		<TableContainer>
			<Table>
				<Thead>
					<Tr>
						<Th />
						{tableColumns?.map(column => (
							<Th key={column}>{column}</Th>
						))}
					</Tr>
				</Thead>
				<Tbody>
					{[
						tableRows?.map(row =>
							tableType === "checkbox" ? (
								<Tr key={row}>
									<CheckboxGroup
										value={answer.table
											.filter(item => item[0] === row)
											.map(item => item[1])}
										onChange={choices => {
											setAnswer({
												...answer,
												table: [
													...answer.table.filter(
														item => item[0] !== row
													),
													...choices.map<[string, string]>(choice => [
														row,
														choice as string
													])
												]
											})
										}}>
										<Th>{row}</Th>
										{tableColumns?.map(row => (
											<Th key={row + "-" + row}>
												<Checkbox value={row} />
											</Th>
										))}
									</CheckboxGroup>
								</Tr>
							) : (
								<RadioGroup
									key={row}
									as={Tr}
									value={
										answer.table
											.filter(item => item[0] === row)
											.map(item => item[1])[0]
									}
									onChange={choice => {
										setAnswer({
											...answer,
											table: [
												...answer.table.filter(item => item[0] !== row),
												[row, choice]
											]
										})
									}}>
									<Th>{row}</Th>
									{tableColumns?.map(row => (
										<Th key={row + "-" + row}>
											<Radio value={row} />
										</Th>
									))}
								</RadioGroup>
							)
						)
					]}
				</Tbody>
			</Table>
		</TableContainer>
	)
}

export default TableInput
