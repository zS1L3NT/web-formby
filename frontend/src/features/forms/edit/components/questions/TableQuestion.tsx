import {
	Box, Checkbox, CheckboxGroup, Flex, Radio, RadioGroup, Stack, Table, TableContainer, Tbody,
	Text, Th, Thead, Tr
} from "@chakra-ui/react"

import Dropdown from "../../../../components/Dropdown"
import { iTableAnswer } from "../../../../models/Answer"
import { iTableQuestion } from "../../../../models/Question"
import ListMaker from "../../edit/components/ListMaker"
import { QuestionProps } from "../Question"

const TableQuestion = ({
	editable,
	question,
	setQuestion,
	answer,
	setAnswer
}: QuestionProps<iTableQuestion, iTableAnswer>) => {
	const { table_rows: tableRows, table_columns: tableColumns, table_type: tableType } = question

	return (
		<>
			{editable ? (
				<Flex
					alignItems="center"
					justifyContent={{ base: "space-between", md: "start" }}>
					<Text textAlign="start">Type:</Text>
					<Box
						ml={{ md: 2 }}
						my={2}
						w="2xs">
						<Dropdown
							choices={["radio", "checkbox"]}
							selectedChoice={tableType}
							setSelectedChoice={table_type => {
								if (table_type !== null) {
									setQuestion({
										...question,
										table_type
									})
								}
							}}
						/>
					</Box>
				</Flex>
			) : null}

			{editable ? (
				<Stack
					justifyContent="space-evenly"
					direction={{ base: "column", md: "row" }}
					spacing={4}
					py={4}>
					<Box
						px={{ md: 4 }}
						w="max">
						<Text textAlign="left">Rows</Text>
						<ListMaker
							editable={editable}
							items={tableRows ?? []}
							setItems={table_rows => setQuestion({ ...question, table_rows })}
						/>
					</Box>

					<Box
						px={{ md: 4 }}
						w="max">
						<Text textAlign="left">Columns</Text>
						<ListMaker
							editable={editable}
							items={tableColumns ?? []}
							setItems={table_columns => setQuestion({ ...question, table_columns })}
						/>
					</Box>
				</Stack>
			) : null}

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
													<Checkbox
														value={row}
														isDisabled={editable}
													/>
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
													...answer.table.filter(
														item => item[0] !== column
													),
													[column, choice]
												]
											})
										}}>
										<Th>{column}</Th>
										{tableColumns?.map(row => (
											<Th key={column + "-" + row}>
												<Radio
													value={row}
													isDisabled={editable}
												/>
											</Th>
										))}
									</RadioGroup>
								)
							)
						]}
					</Tbody>
				</Table>
			</TableContainer>
		</>
	)
}

export default TableQuestion
