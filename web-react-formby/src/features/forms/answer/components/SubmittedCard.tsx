import { useNavigate } from "react-router-dom"

import { CheckCircleIcon } from "@chakra-ui/icons"
import { Button, Flex, Text } from "@chakra-ui/react"

import Card from "../../../../components/Card"

const SubmittedCard = () => {
	const navigate = useNavigate()

	return (
		<Card mt={{ base: 2, md: 4 }}>
			<Flex alignItems="center">
				<CheckCircleIcon
					w={7}
					h={7}
				/>
				<Text
					ml={4}
					fontSize="4xl">
					Thanks
				</Text>
			</Flex>
			<Text>Your response has been saved</Text>

			<Button
				mt={4}
				colorScheme="blue"
				onClick={() => navigate("/forms")}>
				View my forms
			</Button>
		</Card>
	)
}

export default SubmittedCard
