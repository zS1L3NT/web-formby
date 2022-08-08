

import { Flex, Text } from "@chakra-ui/react"

import Card from "../../../../components/Card"
import { iForm } from "../../../../models/Form"
import { iResponse } from "../../../../models/Response"

const ResponsesOverview = ({ form, responses }: { form: iForm; responses: iResponse[] }) => {
	return (
		<Card mb={4}>
			<Flex
				direction={{ base: "column", md: "row" }}
				justifyContent="space-evenly"
				alignItems={{ base: "center", md: "normal" }}>
				<Flex
					direction="column"
					justifyContent="flex-end"
					w={40}>
					<Text
						color="primary"
						fontSize="4xl"
						fontWeight="bold"
						textAlign="center">
						{form.state[0]!.toUpperCase() + form.state.slice(1)!}
					</Text>
					<Text
						fontSize="sm"
						textAlign="center">
						State
					</Text>
				</Flex>
				<Flex
					direction="column"
					justifyContent="flex-end"
					w={40}>
					<Text
						color="primary"
						fontSize="5xl"
						fontWeight="bold"
						textAlign="center"
						lineHeight={1.2}>
						{responses.length}
					</Text>
					<Text
						fontSize="sm"
						textAlign="center">
						Responses
					</Text>
				</Flex>
				<Flex
					direction="column"
					justifyContent="flex-end"
					w={40}>
					<Text
						color="primary"
						fontSize="4xl"
						fontWeight="bold"
						textAlign="center">
						{form.auth ? "Yes" : "No"}
					</Text>
					<Text
						fontSize="sm"
						textAlign="center">
						Requires Authentication
					</Text>
				</Flex>
			</Flex>
		</Card>
	)
}

export default ResponsesOverview
