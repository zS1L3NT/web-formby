import { HexColorPicker } from "react-colorful"

import { Box, Flex, Input } from "@chakra-ui/react"

import { InputProps } from "../QuestionInput"

const ColorInput = ({ answer, setAnswer }: InputProps<"color">) => {
	return (
		<Flex
			pos="relative"
			direction="column"
			justifyContent="center"
			alignItems="center"
			zIndex={1}>
			<Box
				w={{ base: "full", sm: 80 }}
				h={48}>
				<HexColorPicker
					style={{
						width: "100%",
						height: "100%",
						cursor: "pointer"
					}}
					color={answer.color}
					onChange={color => setAnswer({ ...answer, color })}
				/>
			</Box>

			<Flex
				w={{ base: "full", sm: 80 }}
				h={12}
				mt={2}>
				<Box
					w={10}
					h={10}
					my="auto"
					bg={answer.color}
					borderRadius="50%"
				/>
				<Input
					w="full"
					h="full"
					ml={2}
					flex={1}
					value={answer.color}
					onChange={e => setAnswer({ ...answer, color: e.target.value })}
				/>
			</Flex>
		</Flex>
	)
}

export default ColorInput
