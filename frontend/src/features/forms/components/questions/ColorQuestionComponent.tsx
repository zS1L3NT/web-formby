import { FC, PropsWithChildren, useState } from "react"
import { HexColorPicker } from "react-colorful"

import { Box, Flex, Input } from "@chakra-ui/react"

import { ColorQuestion } from "../../../../models/Question"
import QuestionComponent from "../QuestionComponent"

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
		<QuestionComponent
			editable={editable}
			question={question}>
			<Flex
				pos="relative"
				direction="column"
				justifyContent="center"
				alignItems="center">
				<Box
					w={{ base: "max", sm: 80 }}
					h={48}>
					<HexColorPicker
						style={{
							width: "100%",
							height: "100%",
							cursor: "pointer"
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
					left={-4}
					w="calc(var(--chakra-sizes-max) + var(--chakra-space-8))"
					h="calc(var(--chakra-sizes-max) + var(--chakra-space-8))"
					bg="card"
					zIndex={editable ? 5 : -1}
					opacity={editable ? 0.5 : 0}
					_hover={{
						cursor: editable ? "not-allowed" : "default"
					}}
				/>
			</Flex>
		</QuestionComponent>
	)
}

export default ColorQuestionComponent
