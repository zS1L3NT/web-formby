import { Box, Flex, Input } from "@chakra-ui/react"

import { AnswerProps } from "../QuestionAnswer"

const ColorAnswer = ({ answer }: AnswerProps<"color">) => {
	return (
		<Flex
			w={{ base: "full", sm: 80 }}
			h={12}
			mt={2}
			mx="auto">
			<Box
				w={10}
				h={10}
				my="auto"
				bg={answer?.color}
				borderRadius="50%"
			/>
			<Input
				w="full"
				h="full"
				ml={2}
				flex={1}
				defaultValue={answer?.color}
				onFocus={e => e.target.blur()}
				cursor="not-allowed"
			/>
		</Flex>
	)
}

export default ColorAnswer
