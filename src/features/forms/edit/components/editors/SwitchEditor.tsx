import { Flex, Switch, Text } from "@chakra-ui/react"

import { iSwitchQuestion } from "../../../../../models/Question"
import { EditorProps } from "../QuestionEditor"

const SwitchEditor = ({}: EditorProps<iSwitchQuestion>) => {
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
				Disabled
			</Text>
			<Switch
				size="lg"
				isChecked={false}
				isDisabled={true}
				mx={4}
			/>
		</Flex>
	)
}

export default SwitchEditor
