import { ArcElement } from "chart.js"
import { DateTime } from "luxon"
import { createRef, useState } from "react"
import { Pie } from "react-chartjs-2"
import { ChartJSOrUndefined } from "react-chartjs-2/dist/types"
import { useNavigate } from "react-router-dom"

import {
	Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader,
	ModalOverlay, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tooltip, Tr, useColorModeValue
} from "@chakra-ui/react"

import { WithTimestamps } from "../../../../models"
import { iResponse } from "../../../../models/Response"
import { iUser } from "../../../../models/User"

const ChartValueDisplay = ({
	id,
	title,
	data,
	values,
	getModalHeader
}: {
	id: string
	title: string
	data: {
		user: WithTimestamps<iUser> | null
		response: WithTimestamps<iResponse>
		value: string
	}[]
	values: string[]
	getModalHeader: (value: string) => string
}) => {
	const ref = createRef<ChartJSOrUndefined<"pie", number[], string>>()
	const navigate = useNavigate()

	const [modalVoice, setModalValue] = useState<string | null>(null)

	const colors = [
		"#4dc9f6",
		"#f67019",
		"#f53794",
		"#537bc4",
		"#acc236",
		"#166a8f",
		"#00a950",
		"#58595b",
		"#8549ba"
	]

	return (
		<>
			<Flex justifyContent="space-evenly">
				<Flex
					display={{ base: "none", md: "flex" }}
					direction="column"
					justifyContent="center"
					w="20rem">
					<Text
						textDecor="underline"
						ml={2}
						mb={1}>
						{title}
					</Text>
					{values.map((value, i) => (
						<Flex
							key={value}
							px={2}
							py={1}
							alignItems="center"
							background="card"
							cursor="pointer"
							_hover={{
								filter: useColorModeValue("brightness(0.9)", "brightness(1.2)")
							}}
							onMouseOver={() => {
								const chart = ref.current
								if (chart) {
									const rect = chart.canvas.getBoundingClientRect()
									const arc = chart.getDatasetMeta(0).data[
										i
									]! as unknown as ArcElement
									const point = arc.getCenterPoint()

									chart.canvas.dispatchEvent(
										new MouseEvent("mousemove", {
											clientX: rect.left + point.x,
											clientY: rect.top + point.y - 2
										})
									)
								}
							}}
							onMouseOut={() => {
								const chart = ref.current
								if (chart) {
									chart.canvas.dispatchEvent(
										new MouseEvent("mouseout", {
											clientX: 0,
											clientY: 0
										})
									)
								}
							}}
							onClick={() => setModalValue(value)}>
							<Box
								h={3}
								w={3}
								mr={2}
								borderWidth={2}
								borderColor="white"
								bg={colors[i % 9]}
							/>
							<Text>{value}</Text>
							<Text ml="auto">
								{data.filter(item => item.value === value).length}
							</Text>
						</Flex>
					))}
				</Flex>
				<Box
					w={{ base: "max", md: "20rem" }}
					minH="16rem"
					py={4}>
					<Pie
						ref={ref}
						datasetIdKey={id}
						options={{
							maintainAspectRatio: false
						}}
						data={{
							labels: values,
							datasets: [
								{
									label: id,
									data: values.map(
										value => data.filter(item => item.value === value).length
									),
									backgroundColor: values.map((_, i) => colors[i % 9])
								}
							]
						}}
					/>
				</Box>
			</Flex>
			<Modal
				size="lg"
				isOpen={!!modalVoice}
				onClose={() => setModalValue(null)}
				isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{getModalHeader(modalVoice!)}</ModalHeader>
					<ModalCloseButton />

					<ModalBody>
						<TableContainer
							maxH={80}
							overflowY="scroll">
							<Table>
								<Thead>
									<Tr>
										<Th width="fit-content">Respondent</Th>
										<Th isNumeric>Date</Th>
									</Tr>
								</Thead>
								<Tbody>
									{data
										.filter(item => item.value === modalVoice)
										.sort(
											(a, b) =>
												new Date(b.response.created_at).getTime() -
												new Date(a.response.created_at).getTime()
										)
										.map(item => {
											const { user, response } = item

											return (
												<Tr key={response.id}>
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
													<Td isNumeric>
														{DateTime.fromISO(
															response.created_at
														).toFormat("dd LLL yyyy, HH:mm:ss")}
													</Td>
												</Tr>
											)
										})}
								</Tbody>
							</Table>
						</TableContainer>
					</ModalBody>

					<ModalFooter>
						<Button onClick={() => setModalValue(null)}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default ChartValueDisplay
