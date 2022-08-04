import { HexColorPicker } from "react-colorful"

import { Box, Flex, Input } from "@chakra-ui/react"

import { iColorAnswer } from "../../../../../models/Answer"
import { iColorQuestion } from "../../../../../models/Question"
import { InputProps } from "../QuestionInput"

const ColorInput = ({ answer, setAnswer }: InputProps<iColorQuestion, iColorAnswer>) => {
	return (
		<Flex
			pos="relative"
			direction="column"
			justifyContent="center"
			alignItems="center"
			zIndex={1}>
			<Box
				w={{ base: "max", sm: 80 }}
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
				w={{ base: "max", sm: 80 }}
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
					w="max"
					h="max"
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
