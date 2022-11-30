import { Flex, Switch, Text } from "@chakra-ui/react"

import { InputProps } from "../QuestionInput"

const SwitchInput = ({ answer, setAnswer }: InputProps<"switch">) => {
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
				{answer.switch ? "Enabled" : "Disabled"}
			</Text>
			<Switch
				size="lg"
				isChecked={answer.switch}
				onChange={() => setAnswer({ ...answer, switch: !answer.switch })}
				mx={4}
			/>
		</Flex>
	)
}

export default SwitchInput
