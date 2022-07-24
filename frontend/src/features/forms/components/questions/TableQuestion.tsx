import { FC } from "react"

import {
	Box, Checkbox, CheckboxGroup, Flex, Radio, RadioGroup, Stack, Table, TableContainer, Tbody,
	Text, Th, Thead, Tr
} from "@chakra-ui/react"

import Dropdown from "../../../../components/Dropdown"
import { iTableQuestion } from "../../../../models/Question"
import ListMaker from "../ListMaker"
import { QuestionProps } from "../Question"

const TableQuestion: FC<QuestionProps<iTableQuestion>> = props => {
	const { editable, dirtyQuestion, setDirtyQuestion } = props
	const {
		table_rows: tableRows,
		table_columns: tableColumns,
		table_type: tableType
	} = dirtyQuestion

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
									setDirtyQuestion({
										...dirtyQuestion,
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
							items={tableRows}
							setItems={table_rows =>
								setDirtyQuestion({ ...dirtyQuestion, table_rows })
							}
						/>
					</Box>

					<Box
						px={{ md: 4 }}
						w="max">
						<Text textAlign="left">Columns</Text>
						<ListMaker
							editable={editable}
							items={tableColumns}
							setItems={table_columns =>
								setDirtyQuestion({ ...dirtyQuestion, table_columns })
							}
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
		</>
	)
}

export default TableQuestion
