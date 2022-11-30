import { Box, Checkbox, CheckboxGroup, Flex, Radio, RadioGroup, Text } from "@chakra-ui/react"

import Dropdown from "../../../../../components/Dropdown"
import { AnswerProps } from "../QuestionAnswer"

const ChoiceAnswer = ({ question, answer }: AnswerProps<"choice">) => {
	const { choices, choice_type: choiceType } = question

	const listMaker = choices.map((choice, i) =>
		choice === null || i === null ? (
			<Box
				key={choice}
				ml={{ base: 0, md: 2 }}
				mr={{ base: 2, md: 4 }}
				my={2}
				w="24px"
			/>
		) : choiceType === "checkbox" ? (
			<Checkbox
				key={choice}
				value={choice}
				ml={{ base: 0, md: 2 }}
				mr={2}
				my={2}
				flex={1}
				cursor="not-allowed">
				<Text ml={{ md: 2 }}>{choice}</Text>
			</Checkbox>
		) : choiceType === "radio" ? (
			<Radio
				key={choice}
				value={choice}
				ml={{ base: 0, md: 2 }}
				mr={2}
				my={2}
				flex={1}
				cursor="not-allowed">
				<Text ml={{ md: 2 }}>{choice}</Text>
			</Radio>
		) : (
			<Text
				key={choice}
				ml={{ base: 0, md: 2 }}
				mr={4}
				my={2}
				h="fit-content"
				w="24px">
				{i + 1}
			</Text>
		)
	)

	return (
		<>
			{choiceType === "checkbox" ? (
				<CheckboxGroup value={answer?.choices}>
					<Flex direction="column">{listMaker}</Flex>
				</CheckboxGroup>
			) : null}

			{choiceType === "radio" ? (
				<RadioGroup value={answer?.choices[0]}>
					<Flex direction="column">{listMaker}</Flex>
				</RadioGroup>
			) : null}

			{choiceType === "dropdown" ? (
				<Dropdown
					choices={choices}
					selectedChoice={answer?.choices[0] ?? null}
					setSelectedChoice={() => {}}
					isDisabled={true}
				/>
			) : null}
		</>
	)
}

export default ChoiceAnswer
