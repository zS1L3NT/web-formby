import { Select } from "chakra-react-select"
import { createRef, FC, PropsWithChildren, RefObject, useState } from "react"

import { CloseIcon } from "@chakra-ui/icons"
import { Checkbox, CheckboxGroup, Flex, Input, Radio, RadioGroup, Text } from "@chakra-ui/react"

import Card from "../../../components/Card"
import EditableText from "../../../components/EditableText"
import { ChoiceQuestion } from "../../../models/Question"

const ChoiceQuestionComponent: FC<
	PropsWithChildren<{
		question: ChoiceQuestion
		editable: boolean
	}>
> = props => {
	const { question, editable } = props

	const [title, setTitle] = useState(question.title)
	const [description, setDescription] = useState(question.description)
	const [choices, setChoices] = useState(question.choices)
	const [choiceRefs, setChoiceRefs] = useState(
		choices.map<RefObject<HTMLInputElement>>(createRef)
	)
	const [selectedChoices, setSelectedChoices] = useState<string[]>([])

	return (
		<Card>
			<EditableText
				editable={editable}
				required={true}
				variant="title"
				text={title}
				setText={setTitle}
			/>
			<EditableText
				editable={editable}
				variant="description"
				text={description ?? ""}
				setText={setDescription}
			/>
			<CheckboxGroup
				onChange={selected => setSelectedChoices(selected as string[])}
				value={editable ? [] : selectedChoices}>
				<RadioGroup
					onChange={e => setSelectedChoices([e])}
					value={editable ? 0 : selectedChoices[0]}>
					{choices.map((choice, i) => (
						<Flex
							key={i}
							my={!editable && question.choiceType === "dropdown" ? 0 : 4}>
							{question.choiceType === "checkbox" ? (
								<Checkbox
									value={choice}
									mx={4}
									my="auto"
									flex={editable ? 0 : 1}
									isDisabled={editable}>
									<Text>{editable ? null : choice}</Text>
								</Checkbox>
							) : question.choiceType === "radio" ? (
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

					{!editable && question.choiceType === "dropdown" ? (
						<Select
							onChange={option => {
								if (option !== null) {
									setSelectedChoices([option.value])
								}
							}}
							options={choices.map(choice => ({ value: choice, label: choice }))}
							placeholder="Select a choice"
							className="chakra-react-select"
							classNamePrefix="chakra-react-select"
							chakraStyles={{
								container: provided => ({
									...provided,
									mt: 4,
								}),
								dropdownIndicator: provided => ({
									...provided,
									bg: "transparent",
									px: 2,
									cursor: "inherit",
								}),
								indicatorSeparator: provided => ({
									...provided,
									display: "none"
								})
							}}
							colorScheme="blue.500"
						/>
					) : null}

					{editable ? (
						<Flex my={4}>
							{question.choiceType === "checkbox" ? (
								<Checkbox
									mx={4}
									my="auto"
									isDisabled={true}
								/>
							) : question.choiceType === "radio" ? (
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
								ml={question.choiceType === "dropdown" ? 0 : 2}
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
		</Card>
	)
}

export default ChoiceQuestionComponent
