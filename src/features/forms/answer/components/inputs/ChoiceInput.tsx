import { Box, Checkbox, CheckboxGroup, Flex, Radio, RadioGroup, Text } from "@chakra-ui/react"

import Dropdown from "../../../../../components/Dropdown"
import { InputProps } from "../QuestionInput"

const ChoiceInput = ({ question, answer, setAnswer }: InputProps<"choice">) => {
	const { choices, choice_type: choiceType } = question

	const listMaker = choices.map((choice, i) =>
		choice === null || i === null ? (
			<Box
				key={i}
				ml={{ base: 0, md: 2 }}
				mr={{ base: 2, md: 4 }}
				my={2}
				w="24px"
			/>
		) : choiceType === "checkbox" ? (
			<Checkbox
				key={i}
				value={choice}
				ml={{ base: 0, md: 2 }}
				mr={2}
				my={2}
				flex={1}>
				<Text ml={{ md: 2 }}>{choice}</Text>
			</Checkbox>
		) : choiceType === "radio" ? (
			<Radio
				key={i}
				value={choice}
				ml={{ base: 0, md: 2 }}
				mr={2}
				my={2}
				flex={1}>
				<Text ml={{ md: 2 }}>{choice}</Text>
			</Radio>
		) : (
			<Text
				key={i}
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
				<CheckboxGroup
					value={answer.choices}
					onChange={choices => setAnswer({ ...answer, choices: choices as string[] })}>
					<Flex direction="column">{listMaker}</Flex>
				</CheckboxGroup>
			) : null}

			{choiceType === "radio" ? (
				<RadioGroup
					value={answer.choices[0]}
					onChange={choice => setAnswer({ ...answer, choices: [choice] })}>
					<Flex direction="column">{listMaker}</Flex>
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

export default ChoiceInput
