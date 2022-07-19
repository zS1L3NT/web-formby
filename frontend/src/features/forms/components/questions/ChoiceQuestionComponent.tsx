import { createRef, FC, PropsWithChildren, RefObject, useState } from "react"

import { CloseIcon } from "@chakra-ui/icons"
import {
	Box, Checkbox, CheckboxGroup, Flex, Input, Radio, RadioGroup, Text
} from "@chakra-ui/react"

import Dropdown from "../../../../components/Dropdown"
import { ChoiceQuestion } from "../../../../models/Question"
import QuestionComponent from "../QuestionComponent"

const ChoiceQuestionComponent: FC<
	PropsWithChildren<{
		question: ChoiceQuestion
		editable: boolean
	}>
> = props => {
	const { question, editable } = props

	const [title, setTitle] = useState(question.title)
	const [description, setDescription] = useState(question.description)
	const [choiceType, setChoiceType] = useState(question.choiceType)
	const [choices, setChoices] = useState(question.choices)
	const [choiceRefs, setChoiceRefs] = useState(
		choices.map<RefObject<HTMLInputElement>>(createRef)
	)
	const [selectedChoices, setSelectedChoices] = useState<string[]>([])

	return (
		<QuestionComponent
			editable={editable}
			question={question}>
			{editable ? (
				<Flex alignItems="center">
					<Text w="56px">Type:</Text>
					<Box w="2xs">
						<Dropdown
							choices={["radio", "checkbox", "dropdown"]}
							selectedChoice={choiceType}
							setSelectedChoice={choice => {
								if (choice !== null) {
									setChoiceType(choice as "radio" | "checkbox" | "dropdown")
								}
							}}
						/>
					</Box>
				</Flex>
			) : null}

			<CheckboxGroup
				onChange={selected => setSelectedChoices(selected as string[])}
				value={editable ? [] : selectedChoices}>
				<RadioGroup
					onChange={e => setSelectedChoices([e])}
					value={editable ? 0 : selectedChoices[0]}>
					{choices.map((choice, i) => (
						<Flex
							key={i}
							my={!editable && choiceType === "dropdown" ? 0 : 4}>
							{choiceType === "checkbox" ? (
								<Checkbox
									value={choice}
									mx={4}
									my="auto"
									flex={editable ? 0 : 1}
									isDisabled={editable}>
									<Text>{editable ? null : choice}</Text>
								</Checkbox>
							) : choiceType === "radio" ? (
								<Radio
									value={choice}
									mx={4}
									my="auto"
									flex={editable ? 0 : 1}
									isDisabled={editable}>
									<Text>{editable ? null : choice}</Text>
								</Radio>
							) : editable ? (
								<Text
									width="24px"
									mx={4}>
									{i + 1}
								</Text>
							) : null}

							{editable ? (
								<Input
									ref={choiceRefs[i]}
									flex={1}
									mr={editable && choices.length === 1 ? 12 : 0}
									defaultValue={choice}
									onBlur={e => {
										if (e.target.value !== "") {
											setChoices(
												choices.map((c, j) =>
													i === j ? e.target.value : c
												)
											)
										} else {
											e.target.value = choice
										}
									}}
								/>
							) : null}

							{editable && choices.length > 1 ? (
								<CloseIcon
									mx={4}
									my="auto"
									color="gray.300"
									onClick={() => {
										choiceRefs.at(-2)!.current!.focus()
										setChoices(choices.filter((_, j) => i !== j))
										setChoiceRefs(choiceRefs.filter((_, j) => i !== j))
									}}
								/>
							) : null}
						</Flex>
					))}

					{!editable && choiceType === "dropdown" ? (
						<Box mt={4}>
							<Dropdown
								choices={choices}
								selectedChoice={selectedChoices[0] ?? null}
								setSelectedChoice={choice => {
									if (choice !== null) {
										setSelectedChoices([choice])
									}
								}}
							/>
						</Box>
					) : null}

					{editable ? (
						<Flex my={4}>
							{choiceType === "checkbox" ? (
								<Checkbox
									mx={4}
									my="auto"
									isDisabled={true}
								/>
							) : choiceType === "radio" ? (
								<Radio
									mx={4}
									my="auto"
									isDisabled={true}
								/>
							) : (
								<Text
									width="24px"
									mx={4}>
									{choices.length + 1}
								</Text>
							)}

							<Input
								defaultValue={""}
								ml={choiceType === "dropdown" ? 0 : 2}
								mr={12}
								onFocus={() => {
									const choiceRef = createRef<HTMLInputElement>()
									setChoices([...choices, `Choice ${choices.length + 1}`])
									setChoiceRefs([...choiceRefs, choiceRef])
									setTimeout(() => choiceRef.current!.focus(), 0)
								}}
								flex="1"
							/>
						</Flex>
					) : null}
				</RadioGroup>
			</CheckboxGroup>
		</QuestionComponent>
	)
}

export default ChoiceQuestionComponent
