import { Box, Checkbox, CheckboxGroup, Radio, RadioGroup, Text } from "@chakra-ui/react"

import Dropdown from "../../../../../components/Dropdown"
import { iChoiceAnswer } from "../../../../../models/Answer"
import { iChoiceQuestion } from "../../../../../models/Question"
import { QuestionProps } from "../Question"

const ChoiceQuestion = ({
	question,
	answer,
	setAnswer
}: QuestionProps<iChoiceQuestion, iChoiceAnswer>) => {
	const { choices, choice_type: choiceType } = question

	const listMaker = choices.map((choice, i) =>
		choice === null || i === null ? (
			<Box ml={{ base: 0, md: 2 }} mr={{ base: 2, md: 4 }} w="24px"></Box>
		) : choiceType === "checkbox" ? (
			<Checkbox value={choice} ml={{ base: 0, md: 2 }} mr={2} my="auto" flex={1}>
				<Text ml={{ md: 2 }}>{choice}</Text>
			</Checkbox>
		) : choiceType === "radio" ? (
			<Radio value={choice} ml={{ base: 0, md: 2 }} mr={2} my="auto" flex={1}>
				<Text ml={{ md: 2 }}>{choice}</Text>
			</Radio>
		) : (
			<Text ml={{ base: 0, md: 2 }} mr={4} my="auto" h="fit-content" w="24px">
				{i + 1}
			</Text>
		)
	)

	return (
		<>
			{choiceType === "checkbox" ? (
				<CheckboxGroup
					value={answer.choices}
					onChange={choices => setAnswer({ ...answer, choices: choices as string[] })}>
					{listMaker}
				</CheckboxGroup>
			) : null}

			{choiceType === "radio" ? (
				<RadioGroup
					value={answer.choices[0]}
					onChange={choice => setAnswer({ ...answer, choices: [choice] })}>
					{listMaker}
				</RadioGroup>
			) : null}

			{choiceType === "dropdown" ? (
				<Dropdown
					choices={choices}
					selectedChoice={answer.choices[0] ?? null}
					setSelectedChoice={choice => {
						if (choice !== null) {
							setAnswer({ ...answer, choices: [choice] })
						}
					}}
				/>
			) : null}
		</>
	)
}

export default ChoiceQuestion
