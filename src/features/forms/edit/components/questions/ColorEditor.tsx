import { HexColorPicker } from "react-colorful"

import { Box, Flex, Input } from "@chakra-ui/react"

import { iColorQuestion } from "../../../../../models/Question"
import { EditorProps } from "../QuestionEditor"

const ColorEditor = ({}: EditorProps<iColorQuestion>) => {
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
					color="#FFFFFF"
					style={{
						width: "100%",
						height: "100%",
						cursor: "pointer"
					}}
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
					bg="#FFFFFFF"
					borderRadius="50%"
				/>
				<Input
					w="max"
					h="max"
					ml={2}
					flex={1}
				/>
			</Flex>

			<Box
				pos="absolute"
				left={-4}
				w="calc(var(--chakra-sizes-max) + var(--chakra-space-8))"
				h="calc(var(--chakra-sizes-max) + var(--chakra-space-8))"
				bg="card"
				zIndex={5}
				opacity={0.5}
				_hover={{
					cursor: "not-allowed"
				}}
			/>
		</Flex>
	)
}

export default ColorEditor
