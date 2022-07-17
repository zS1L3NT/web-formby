import { FC, PropsWithChildren, useState } from "react"
import { HexColorPicker } from "react-colorful"

import { Box, Flex, Input } from "@chakra-ui/react"

import Card from "../../../components/Card"
import EditableText from "../../../components/EditableText"
import { ColorQuestion } from "../../../models/Question"

const ColorQuestionComponent: FC<
	PropsWithChildren<{
		question: ColorQuestion
		editable: boolean
	}>
> = props => {
	const { question, editable } = props

	const [title, setTitle] = useState(question.title)
	const [description, setDescription] = useState(question.description)
	const [color, setColor] = useState("#000000")

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
			<Flex
				pos="relative"
				direction="column"
				justifyContent="center"
				alignItems="center">
				<Box
					w={{ base: "max", sm: 80 }}
					h={48}
					mt={4}>
					<HexColorPicker
						style={{
							width: "100%",
							height: "100%"
						}}
						color={color}
						onChange={setColor}
					/>
				</Box>

				<Flex
					w={{ base: "max", sm: 80 }}
					h={12}
					mt={2}>
					<Box
						w={10}
						h={10}
						my="auto"
						bg={color}
						borderRadius="50%"
					/>
					<Input
						w="max"
						h="max"
						ml={2}
						flex={1}
						value={color}
						onChange={e => setColor(e.target.value)}
					/>
				</Flex>

				<Box
					pos="absolute"
					w="max"
					h="max"
					bg="white"
					zIndex={editable ? 5 : -1}
					opacity={editable ? 0.5 : 0}
					_hover={{
						cursor: editable ? "not-allowed" : "default"
					}}
				/>
			</Flex>
		</Card>
	)
}

export default ColorQuestionComponent
