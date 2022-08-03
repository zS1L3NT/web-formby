import { Box, Checkbox, CheckboxGroup, Flex, Radio, RadioGroup, Text } from "@chakra-ui/react"

import Dropdown from "../../../../../components/Dropdown"
import { iChoiceQuestion } from "../../../../../models/Question"
import ListMaker from "../ListMaker"
import { EditorProps } from "../QuestionEditor"

const ChoiceEditor = ({ question, setQuestion }: EditorProps<iChoiceQuestion>) => {
	const listMaker = (
		<ListMaker
			items={question.choices}
			setItems={choices => setQuestion({ ...question, choices })}
			leading={(choice, i) =>
				choice === null || i === null ? (
					<Box
						ml={{ base: 0, md: 2 }}
						mr={{ base: 2, md: 4 }}
						w="24px"
					/>
				) : question.choice_type === "checkbox" ? (
					<Checkbox
						value={choice}
						ml={{ base: 0, md: 2 }}
						mr={{ base: 4, md: 6 }}
						my="auto"
						isDisabled={true}
					/>
				) : question.choice_type === "radio" ? (
					<Radio
						value={choice}
						ml={{ base: 0, md: 2 }}
						mr={{ base: 4, md: 6 }}
						my="auto"
						isDisabled={true}
					/>
				) : (
					<Text
						ml={{ base: 0, md: 2 }}
						mr={{ base: 2, md: 4 }}
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
						selectedChoice={question.choice_type}
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

			{question.choice_type === "checkbox" ? (
				<CheckboxGroup value={[]}>{listMaker}</CheckboxGroup>
			) : null}

			{question.choice_type === "radio" ? (
				<RadioGroup value={0}>{listMaker}</RadioGroup>
			) : null}

			{question.choice_type === "dropdown" ? listMaker : null}
		</>
	)
}

export default ChoiceEditor
