import { FC, PropsWithChildren } from "react"

import { Flex, Switch, Text, useBoolean } from "@chakra-ui/react"

import { SwitchQuestion } from "../../../../models/Question"
import QuestionComponent from "../QuestionComponent"

const SwitchQuestionComponent: FC<
	PropsWithChildren<{
		question: SwitchQuestion
		editable: boolean
	}>
> = props => {
	const { question, editable } = props

	const [value, setValue] = useBoolean()

	return (
		<QuestionComponent
			editable={editable}
			question={question}>
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
		</QuestionComponent>
	)
}

export default SwitchQuestionComponent
