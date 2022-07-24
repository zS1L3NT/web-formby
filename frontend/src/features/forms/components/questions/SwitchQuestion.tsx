import { FC } from "react"

import { Flex, Switch, Text, useBoolean } from "@chakra-ui/react"

import { iSwitchQuestion } from "../../../../models/Question"
import { QuestionProps } from "../Question"

const SwitchQuestion: FC<QuestionProps<iSwitchQuestion>> = props => {
	const { editable } = props

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

export default SwitchQuestion
