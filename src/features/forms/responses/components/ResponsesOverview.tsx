import { Divider, Flex, Text } from "@chakra-ui/react"

import Card from "../../../../components/Card"
import { iForm } from "../../../../models/Form"
import { iResponse } from "../../../../models/Response"

const ResponsesOverview = ({ form, responses }: { form: iForm; responses: iResponse[] }) => {
	return (
		<Card my={{ base: 2, md: 4 }}>
			<Text
				fontSize="4xl"
				noOfLines={2}
				textAlign="left"
				color="text">
				{form.name}
			</Text>

			{form.description ? (
				<Text
					mt={2}
					fontSize="lg"
					noOfLines={10}
					textAlign="left"
					color="text">
					{form.description}
				</Text>
			) : null}

			<Divider
				my={4}
				borderColor="gray.400"
			/>

			<Flex justifyContent="space-evenly">
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
						textAlign="center">
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
						Authentication
					</Text>
				</Flex>
			</Flex>
		</Card>
	)
}

export default ResponsesOverview
