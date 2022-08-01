import { Box, Checkbox, CheckboxGroup, Flex, Radio, RadioGroup, Text } from "@chakra-ui/react"

import Dropdown from "../../../../components/Dropdown"
import { iChoiceAnswer } from "../../../../models/Answer"
import { iChoiceQuestion } from "../../../../models/Question"
import ListMaker from "../../edit/components/ListMaker"
import { QuestionProps } from "../Question"

const ChoiceQuestion = ({
	editable,
	question,
	setQuestion,
	answer,
	setAnswer
}: QuestionProps<iChoiceQuestion, iChoiceAnswer>) => {
	const { choices, choice_type: choiceType } = question

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
					value={editable ? [] : answer.choices}
					onChange={choices => setAnswer({ ...answer, choices: choices as string[] })}>
					{listMaker}
				</CheckboxGroup>
			) : null}

			{choiceType === "radio" ? (
				<RadioGroup
					value={editable ? 0 : answer.choices[0]}
					onChange={choice => setAnswer({ ...answer, choices: [choice] })}>
					{listMaker}
				</RadioGroup>
			) : null}

			{choiceType === "dropdown" ? (
				editable ? (
					listMaker
				) : (
					<Dropdown
						choices={choices}
						selectedChoice={answer.choices[0] ?? null}
						setSelectedChoice={choice => {
							if (choice !== null) {
								setAnswer({ ...answer, choices: [choice] })
							}
						}}
					/>
				)
			) : null}
		</>
	)
}

export default ChoiceQuestion
