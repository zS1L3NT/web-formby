import { createRef, FC, PropsWithChildren, RefObject, useState } from "react"

import { CloseIcon } from "@chakra-ui/icons"
import {
	Box, Checkbox, CheckboxGroup, Flex, Input, Radio, RadioGroup, Table, TableContainer, Tbody,
	Text, Th, Thead, Tr
} from "@chakra-ui/react"

import { TableQuestion } from "../../../../models/Question"
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

	const [rowRefs, setRowRefs] = useState(tableRows.map<RefObject<HTMLInputElement>>(createRef))
	const [columnRefs, setColumnRefs] = useState(
		tableColumns.map<RefObject<HTMLInputElement>>(createRef)
	)

	return (
		<QuestionComponent
			editable={editable}
			question={question}>
			<Flex
				justifyContent="space-evenly"
				direction={{ base: "column", md: "row" }}>
				<Box
					p={4}
					w="max">
					<Text textAlign="left">Rows</Text>
					{tableRows.map((row, i) => (
						<Flex my={4}>
							<Input
								ref={rowRefs[i]}
								flex={1}
								mr={editable && tableRows.length === 1 ? 12 : 0}
								defaultValue={row}
								onBlur={e => {
									const newRow = e.target.value.trim()
									if (newRow !== "" && !tableRows.includes(newRow)) {
										setTableRows(
											tableRows.map((c, j) => (i === j ? newRow : c))
										)
									} else {
										e.target.value = row
									}
								}}
							/>
							{tableRows.length > 1 ? (
								<CloseIcon
									mx={4}
									my="auto"
									color="gray.300"
									onClick={() => {
										rowRefs.at(-2)!.current!.focus()
										setTableRows(tableRows.filter((_, j) => i !== j))
										setRowRefs(rowRefs.filter((_, j) => i !== j))
									}}
								/>
							) : null}
						</Flex>
					))}

					<Flex my={4}>
						<Input
							flex={1}
							mr={12}
							onFocus={() => {
								const rowRef = createRef<HTMLInputElement>()
								setTableRows([...tableRows, `Choice ${tableRows.length + 1}`])
								setRowRefs([...rowRefs, rowRef])
								setTimeout(() => {
									rowRef.current!.focus()
									rowRef.current!.setSelectionRange(0, -1)
								}, 0)
							}}
						/>
					</Flex>
				</Box>

				<Box
					p={4}
					w="max">
					<Text textAlign="left">Columns</Text>
					{tableColumns.map((column, i) => (
						<Flex my={4}>
							<Input
								ref={columnRefs[i]}
								flex={1}
								mr={editable && tableColumns.length === 1 ? 12 : 0}
								defaultValue={column}
								onBlur={e => {
									const newColumn = e.target.value.trim()
									if (newColumn !== "" && !tableColumns.includes(newColumn)) {
										setTableColumns(
											tableColumns.map((c, j) => (i === j ? newColumn : c))
										)
									} else {
										e.target.value = column
									}
								}}
							/>
							{tableColumns.length > 1 ? (
								<CloseIcon
									mx={4}
									my="auto"
									color="gray.300"
									onClick={() => {
										columnRefs.at(-2)!.current!.focus()
										setTableColumns(tableColumns.filter((_, j) => i !== j))
										setColumnRefs(columnRefs.filter((_, j) => i !== j))

										console.log(columnRefs, tableColumns);
										
										columnRefs.forEach((columnRef, j) => {
											if (i === j) return
											columnRef.current!.value = tableColumns[j]!
										})
									}}
								/>
							) : null}
						</Flex>
					))}

					<Flex my={4}>
						<Input
							flex={1}
							mr={12}
							onFocus={() => {
								const columnRef = createRef<HTMLInputElement>()
								setTableColumns([
									...tableColumns,
									`Choice ${tableColumns.length + 1}`
								])
								setColumnRefs([...columnRefs, columnRef])
								setTimeout(() => {
									columnRef.current!.focus()
									columnRef.current!.setSelectionRange(0, -1)
								}, 0)
							}}
						/>
					</Flex>
				</Box>
			</Flex>

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
