import { FC } from "react"

import { Flex, Switch, Text, useBoolean } from "@chakra-ui/react"

import { SwitchQuestion } from "../../../../models/Question"
import { QuestionComponentProps } from "../QuestionComponent"

const SwitchQuestionComponent: FC<QuestionComponentProps<SwitchQuestion>> = props => {
	const { editable, dirtyQuestion, setDirtyQuestion, question } = props

	const [value, setValue] = useBoolean()

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
				{value ? "Enabled" : "Disabled"}
			</Text>
			<Switch
				size="lg"
				isChecked={value}
				isDisabled={editable}
				onChange={setValue.toggle}
				mx={4}
			/>
		</Flex>
	)
}

export default SwitchQuestionComponent
