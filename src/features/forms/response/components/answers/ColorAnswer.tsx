import { FocusEvent } from "react"

import { Box, Flex, Input } from "@chakra-ui/react"

import { iColorAnswer } from "../../../../../models/Answer"
import { iColorQuestion } from "../../../../../models/Question"
import { AnswerProps } from "../QuestionAnswer"

const ColorAnswer = ({ answer }: AnswerProps<iColorQuestion, iColorAnswer>) => {
	return (
		<Flex
			w={{ base: "max", sm: 80 }}
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
				w="max"
				h="max"
				ml={2}
				flex={1}
				defaultValue={answer?.color}
				onFocus={(e: FocusEvent<HTMLInputElement>) => e.target.blur()}
				cursor="not-allowed"
			/>
		</Flex>
	)
}

export default ColorAnswer
