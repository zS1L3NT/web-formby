import { ArcElement, Chart, registerables } from "chart.js"
import { DateTime } from "luxon"
import { createRef, useState } from "react"
import { Pie } from "react-chartjs-2"
import { ChartJSOrUndefined } from "react-chartjs-2/dist/types"
import { useNavigate } from "react-router-dom"

import {
	Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader,
	ModalOverlay, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tooltip, Tr, useColorModeValue
} from "@chakra-ui/react"

import { iChoiceAnswer } from "../../../../../models/Answer"
import { iChoiceQuestion } from "../../../../../models/Question"
import { AnswersProps } from "../QuestionAnswers"

Chart.register(...registerables)

const ChoiceAnswers = ({
	question,
	answers,
	responses,
	users
}: AnswersProps<iChoiceQuestion, iChoiceAnswer>) => {
	const ref = createRef<ChartJSOrUndefined<"pie", number[], string>>()
	const navigate = useNavigate()

	const [modalChoice, setModalChoice] = useState<string | null>(null)

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
					{question.choices.map((choice, i) => (
						<Flex
							key={choice}
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
							onClick={() => setModalChoice(choice)}>
							<Box
								h={3}
								w={3}
								mr={2}
								borderWidth={2}
								borderColor="white"
								bg={colors[i % 9]}
							/>
							<Text>{choice}</Text>
							<Text ml="auto">
								{answers.filter(answer => answer.choices.includes(choice)).length}
							</Text>
						</Flex>
					))}
				</Flex>
				<Box
					h="16rem"
					py={4}>
					<Pie
						ref={ref}
						datasetIdKey={question.id}
						options={{
							maintainAspectRatio: false
						}}
						data={{
							labels: question.choices,
							datasets: [
								{
									label: question.title,
									data: question.choices.map(
										choice =>
											answers.filter(answer =>
												answer.choices.includes(choice)
											).length
									),
									backgroundColor: question.choices.map((_, i) => colors[i % 9])
								}
							]
						}}
					/>
				</Box>
			</Flex>
			<Modal
				isOpen={!!modalChoice}
				onClose={() => setModalChoice(null)}
				isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Responses with "{modalChoice}" selected</ModalHeader>
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
									{answers
										.filter(answer => answer.choices.includes(modalChoice!))
										.sort(
											(a, b) =>
												new Date(b.created_at).getTime() -
												new Date(a.created_at).getTime()
										)
										.map(answer => {
											const response = responses.find(
												r => r.id === answer.response_id
											)!
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
													<Td isNumeric>
														{DateTime.fromISO(
															answer.created_at
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
						<Button onClick={() => setModalChoice(null)}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default ChoiceAnswers
