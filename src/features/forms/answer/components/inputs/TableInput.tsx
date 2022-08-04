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
						{tableColumns?.map(row => (
							<Th key={row}>{row}</Th>
						))}
					</Tr>
				</Thead>
				<Tbody>
					{[
						tableRows?.map(column =>
							tableType === "checkbox" ? (
								<Tr key={column}>
									<CheckboxGroup
										value={answer.table
											.filter(item => item[0] === column)
											.map(item => item[1])}
										onChange={choices => {
											setAnswer({
												...answer,
												table: [
													...answer.table.filter(
														item => item[0] !== column
													),
													...choices.map<[string, string]>(choice => [
														column,
														choice as string
													])
												]
											})
										}}>
										<Th>{column}</Th>
										{tableColumns?.map(row => (
											<Th key={column + "-" + row}>
												<Checkbox value={row} />
											</Th>
										))}
									</CheckboxGroup>
								</Tr>
							) : (
								<RadioGroup
									key={column}
									as={Tr}
									value={
										answer.table
											.filter(item => item[0] === column)
											.map(item => item[1])[0]
									}
									onChange={choice => {
										setAnswer({
											...answer,
											table: [
												...answer.table.filter(item => item[0] !== column),
												[column, choice]
											]
										})
									}}>
									<Th>{column}</Th>
									{tableColumns?.map(row => (
										<Th key={column + "-" + row}>
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
