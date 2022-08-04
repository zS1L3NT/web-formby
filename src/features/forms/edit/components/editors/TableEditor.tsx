import {
	Box, Checkbox, CheckboxGroup, Flex, Radio, RadioGroup, Stack, Table, TableContainer, Tbody,
	Text, Th, Thead, Tr
} from "@chakra-ui/react"

import Dropdown from "../../../../../components/Dropdown"
import { iTableQuestion } from "../../../../../models/Question"
import ListMaker from "../ListMaker"
import { EditorProps } from "../QuestionEditor"

const TableEditor = ({ question, setQuestion }: EditorProps<iTableQuestion>) => {
	const { table_rows: tableRows, table_columns: tableColumns, table_type: tableType } = question

	return (
		<>
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
						items={tableRows ?? []}
						setItems={table_rows => setQuestion({ ...question, table_rows })}
					/>
				</Box>

				<Box
					px={{ md: 4 }}
					w="max">
					<Text textAlign="left">Columns</Text>
					<ListMaker
						items={tableColumns ?? []}
						setItems={table_columns => setQuestion({ ...question, table_columns })}
					/>
				</Box>
			</Stack>

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
						{tableRows?.map(column =>
							tableType === "checkbox" ? (
								<Tr key={column}>
									<CheckboxGroup value={[]}>
										<Th>{column}</Th>
										{tableColumns?.map(row => (
											<Th key={column + "-" + row}>
												<Checkbox
													value={row}
													isDisabled={true}
												/>
											</Th>
										))}
									</CheckboxGroup>
								</Tr>
							) : (
								<RadioGroup
									key={column}
									as={Tr}>
									<Th>{column}</Th>
									{tableColumns?.map(row => (
										<Th key={column + "-" + row}>
											<Radio
												value={row}
												isDisabled={true}
											/>
										</Th>
									))}
								</RadioGroup>
							)
						)}
					</Tbody>
				</Table>
			</TableContainer>
		</>
	)
}

export default TableEditor
