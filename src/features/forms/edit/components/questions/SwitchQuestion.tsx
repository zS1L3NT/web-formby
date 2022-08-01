import { Flex, Switch, Text } from "@chakra-ui/react"

import { iSwitchAnswer } from "../../../../models/Answer"
import { iSwitchQuestion } from "../../../../models/Question"
import { QuestionProps } from "../Question"

const SwitchQuestion = ({
	editable,
	answer,
	setAnswer
}: QuestionProps<iSwitchQuestion, iSwitchAnswer>) => {
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
				isDisabled={editable}
				onChange={() => setAnswer({ ...answer, switch: !answer.switch })}
				mx={4}
			/>
		</Flex>
	)
}

export default SwitchQuestion
