import { FC, PropsWithChildren, useState } from "react"

import {
	Box, Checkbox, CheckboxGroup, Flex, Radio, RadioGroup, Stack, Table, TableContainer, Tbody,
	Text, Th, Thead, Tr
} from "@chakra-ui/react"

import Dropdown from "../../../../components/Dropdown"
import { TableQuestion } from "../../../../models/Question"
import ListMaker from "../ListMaker"
import QuestionComponent from "../QuestionComponent"

const TableQuestionComponent: FC<
	PropsWithChildren<{
		question: TableQuestion
		editable: boolean
	}>
> = props => {
	const { question, editable } = props

	const [tableType, setTableType] = useState(question.tableType)
	const [tableRows, setTableRows] = useState(question.tableRows)
	const [tableColumns, setTableColumns] = useState(question.tableColumns)

	return (
		<QuestionComponent
			editable={editable}
			question={question}>
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
							setSelectedChoice={choice => {
								if (choice !== null) {
									setTableType(choice as "radio" | "checkbox")
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
							items={tableRows}
							setItems={setTableRows}
						/>
					</Box>

					<Box
						px={{ md: 4 }}
						w="max">
						<Text textAlign="left">Columns</Text>
						<ListMaker
							editable={editable}
							items={tableColumns}
							setItems={setTableColumns}
						/>
					</Box>
				</Stack>
			) : null}

			<TableContainer>
				<Table>
					<Thead>
						<Tr>
							<Th />
							{tableColumns.map(row => (
								<Th key={row}>{row}</Th>
							))}
						</Tr>
					</Thead>
					<Tbody>
						{[
							tableRows.map(column =>
								tableType === "checkbox" ? (
									<Tr key={column}>
										<CheckboxGroup>
											<Th>{column}</Th>
											{tableColumns.map(row => (
												<Th key={column + "-" + row}>
													<Checkbox isDisabled={editable} />
												</Th>
											))}
										</CheckboxGroup>
									</Tr>
								) : (
									<RadioGroup
										key={column}
										as={Tr}>
										<Th>{column}</Th>
										{tableColumns.map(row => (
											<Th key={column + "-" + row}>
												<Radio isDisabled={editable} />
											</Th>
										))}
									</RadioGroup>
								)
							)
						]}
					</Tbody>
				</Table>
			</TableContainer>
		</QuestionComponent>
	)
}

export default TableQuestionComponent
