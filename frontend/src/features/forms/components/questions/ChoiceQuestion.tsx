import { FC, useState } from "react"

import { Box, Checkbox, CheckboxGroup, Flex, Radio, RadioGroup, Text } from "@chakra-ui/react"

import Dropdown from "../../../../components/Dropdown"
import { iChoiceQuestion } from "../../../../models/Question"
import ListMaker from "../ListMaker"
import { QuestionProps } from "../Question"

const ChoiceQuestion: FC<QuestionProps<iChoiceQuestion>> = props => {
	const { editable, question, setQuestion } = props
	const { choices, choice_type: choiceType } = question

	const [selectedChoices, setSelectedChoices] = useState<string[]>([])

	const listMaker = (
		<ListMaker
			editable={editable}
			items={choices ?? []}
			setItems={choices => setQuestion({ ...question, choices })}
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
							choices={["radio", "checkbox", "dropdown"]}
							selectedChoice={choiceType}
							setSelectedChoice={choice_type => {
								if (choice_type !== null) {
									setQuestion({
										...question,
										choice_type
									})
								}
							}}
						/>
					</Box>
				</Flex>
			) : null}

			{choiceType === "checkbox" ? (
				<CheckboxGroup
					value={editable ? [] : selectedChoices}
					onChange={selected => setSelectedChoices(selected as string[])}>
					{listMaker}
				</CheckboxGroup>
			) : null}

			{choiceType === "radio" ? (
				<RadioGroup
					value={editable ? 0 : selectedChoices[0]}
					onChange={e => setSelectedChoices([e])}>
					{listMaker}
				</RadioGroup>
			) : null}

			{choiceType === "dropdown" ? (
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
		</>
	)
}

export default ChoiceQuestion
