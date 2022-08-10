import { Divider, Flex, Text } from "@chakra-ui/react"

import Card from "../../../../components/Card"
import { iForm } from "../../../../models/Form"
import { iUser } from "../../../../models/User"

const ResponseOverview = ({ form, user }: { form: iForm; user: iUser | null }) => {
	return (
		<Card my={4}>
			<Flex
				direction={{ base: "column", md: "row" }}
				justifyContent="space-evenly"
				alignItems={{ base: "center", md: "normal" }}
				gap={{ base: 4, md: 0 }}>
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
					justifyContent="flex-end">
					<Text
						color="primary"
						fontSize="5xl"
						fontWeight="bold"
						textAlign="center"
						lineHeight={1.2}>
						{user?.name ?? "Anonymous User"}
					</Text>
					<Text
						fontSize="sm"
						textAlign="center">
						Response By
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

			<Divider
				mt={8}
				mb={4}
				borderColor="gray.400"
			/>

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
					mb={8}
					fontSize="lg"
					noOfLines={10}
					textAlign="left"
					color="text">
					{form.description}
				</Text>
			) : null}
		</Card>
	)
}

export default ResponseOverview
