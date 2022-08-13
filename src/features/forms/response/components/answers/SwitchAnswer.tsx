import { Flex, Switch, Text } from "@chakra-ui/react"

import { AnswerProps } from "../QuestionAnswer"

const SwitchAnswer = ({ answer }: AnswerProps<"switch">) => {
	return (
		<Flex
			alignItems="center"
			justifyContent={{
				base: "space-between",
				sm: "start"
			}}>
			<Text
				width={24}
				pl={1}
				textAlign="start">
				{answer?.switch ? "Enabled" : "Disabled"}
			</Text>
			<Switch
				mx={4}
				size="lg"
				isChecked={answer?.switch}
				isReadOnly
			/>
		</Flex>
	)
}

export default SwitchAnswer
