import { FC, PropsWithChildren, useState } from "react"

import { Box, Checkbox, CheckboxGroup, Flex, Radio, RadioGroup, Text } from "@chakra-ui/react"

import Dropdown from "../../../../components/Dropdown"
import { ChoiceQuestion } from "../../../../models/Question"
import ListMaker from "../ListMaker"
import QuestionComponent from "../QuestionComponent"

const ChoiceQuestionComponent: FC<
	PropsWithChildren<{
		question: ChoiceQuestion
		editable: boolean
	}>
> = props => {
	const { question, editable } = props

	const [title, setTitle] = useState(question.title)
	const [description, setDescription] = useState(question.description)
	const [choiceType, setChoiceType] = useState(question.choiceType)
	const [choices, setChoices] = useState(question.choices)
	const [selectedChoices, setSelectedChoices] = useState<string[]>([])

	const listMaker = (
		<ListMaker
			editable={editable}
			items={choices}
			setItems={setChoices}
			leading={(choice, i) =>
				choice === null || i === null ? (
					<Box
						ml={{ base: 0, md: 2 }}
						mr={{ base: 2, md: 4 }}
						w="24px"></Box>
				) : choiceType === "checkbox" ? (
					<Checkbox
						value={choice}
						ml={{ base: 0, md: 2 }}
						mr={2}
						my="auto"
						flex={editable ? 0 : 1}
						isDisabled={editable}>
						<Text ml={{ md: 2 }}>{editable ? null : choice}</Text>
					</Checkbox>
				) : choiceType === "radio" ? (
					<Radio
						value={choice}
						ml={{ base: 0, md: 2 }}
						mr={2}
						my="auto"
						flex={editable ? 0 : 1}
						isDisabled={editable}>
						<Text ml={{ md: 2 }}>{editable ? null : choice}</Text>
					</Radio>
				) : (
					<Text
						ml={{ base: 0, md: 2 }}
						mr={4}
						my="auto"
						h="fit-content"
						w="24px">
						{i + 1}
					</Text>
				)
			}
		/>
	)

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
							choices={["radio", "checkbox", "dropdown"]}
							selectedChoice={choiceType}
							setSelectedChoice={choice => {
								if (choice !== null) {
									setChoiceType(choice as "radio" | "checkbox" | "dropdown")
								}
							}}
						/>
					</Box>
				</Flex>
			) : null}

			{question.choiceType === "checkbox" ? (
				<CheckboxGroup
					onChange={selected => setSelectedChoices(selected as string[])}
					value={editable ? [] : selectedChoices}>
					{listMaker}
				</CheckboxGroup>
			) : null}

			{question.choiceType === "radio" ? (
				<RadioGroup
					onChange={e => setSelectedChoices([e])}
					value={editable ? 0 : selectedChoices[0]}>
					{listMaker}
				</RadioGroup>
			) : null}

			{question.choiceType === "dropdown" ? (
				editable ? (
					listMaker
				) : (
					<Dropdown
						choices={choices}
						selectedChoice={selectedChoices[0] ?? null}
						setSelectedChoice={choice => {
							if (choice !== null) {
								setSelectedChoices([choice])
							}
						}}
					/>
				)
			) : null}
		</QuestionComponent>
	)
}

export default ChoiceQuestionComponent
