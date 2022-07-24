import { FC, useState } from "react"

import { Box, Checkbox, CheckboxGroup, Flex, Radio, RadioGroup, Text } from "@chakra-ui/react"

import Dropdown from "../../../../components/Dropdown"
import { ChoiceQuestion } from "../../../../models/Question"
import ListMaker from "../ListMaker"
import { QuestionComponentProps } from "../QuestionComponent"

const ChoiceQuestionComponent: FC<QuestionComponentProps<ChoiceQuestion>> = props => {
	const { editable, dirtyQuestion, setDirtyQuestion, question } = props

	const [selectedChoices, setSelectedChoices] = useState<string[]>([])

	const listMaker = (
		<ListMaker
			editable={editable}
			items={dirtyQuestion.choices}
			setItems={choices =>
				setDirtyQuestion(
					dirtyQuestion => ((dirtyQuestion.choices = choices), dirtyQuestion)
				)
			}
			leading={(choice, i) =>
				choice === null || i === null ? (
					<Box
						ml={{ base: 0, md: 2 }}
						mr={{ base: 2, md: 4 }}
						w="24px"></Box>
				) : dirtyQuestion.choiceType === "checkbox" ? (
					<Checkbox
						value={choice}
						ml={{ base: 0, md: 2 }}
						mr={2}
						my="auto"
						flex={editable ? 0 : 1}
						isDisabled={editable}>
						<Text ml={{ md: 2 }}>{editable ? null : choice}</Text>
					</Checkbox>
				) : dirtyQuestion.choiceType === "radio" ? (
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
							selectedChoice={dirtyQuestion.choiceType}
							setSelectedChoice={choice => {
								if (choice !== null) {
									setDirtyQuestion(
										dirtyQuestion => (
											(dirtyQuestion.choiceType = choice), dirtyQuestion
										)
									)
								}
							}}
						/>
					</Box>
				</Flex>
			) : null}

			{dirtyQuestion.choiceType === "checkbox" ? (
				<CheckboxGroup
					value={editable ? [] : selectedChoices}
					onChange={selected => setSelectedChoices(selected as string[])}>
					{listMaker}
				</CheckboxGroup>
			) : null}

			{dirtyQuestion.choiceType === "radio" ? (
				<RadioGroup
					value={editable ? 0 : selectedChoices[0]}
					onChange={e => setSelectedChoices([e])}>
					{listMaker}
				</RadioGroup>
			) : null}

			{dirtyQuestion.choiceType === "dropdown" ? (
				editable ? (
					listMaker
				) : (
					<Dropdown
						choices={dirtyQuestion.choices}
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

export default ChoiceQuestionComponent
