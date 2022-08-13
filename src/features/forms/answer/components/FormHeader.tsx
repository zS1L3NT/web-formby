import { useContext } from "react"

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { Avatar, Box, Button, Divider, Flex, Spinner, Tag, TagLabel, Text } from "@chakra-ui/react"

import { useGetUserQuery } from "../../../../api"
import Card from "../../../../components/Card"
import AuthContext from "../../../../contexts/AuthContext"
import useToastError from "../../../../hooks/useToastError"
import { iForm } from "../../../../models/Form"

const FormHeader = ({
	form,
	anonymous,
	setAnonymous
}: {
	form: iForm
	anonymous: boolean
	setAnonymous: ((anonymous: boolean) => void) | null
}) => {
	const { token, user } = useContext(AuthContext)

	const { data: owner, error: ownerError } = useGetUserQuery({ user_id: form.user_id })

	useToastError(ownerError)

	return (
		<Card
			my={{ base: 2, md: 4 }}
			_hover={{
				shadow: "lg"
			}}>
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
				mt={4}
				borderColor="var(--chakra-colors-chakra-border-color)"
			/>

			<Flex
				mt={4}
				alignItems="center">
				<Text>Submitting to:</Text>
				<Tag
					ml={2}
					size="lg"
					borderRadius="full">
					{owner ? (
						<>
							<Avatar
								src={owner?.photo ?? ""}
								size="xs"
								name={owner?.name}
								ml={-1}
								mr={2}
							/>
							<TagLabel>{owner?.name}</TagLabel>
						</>
					) : (
						<Spinner size="sm" />
					)}
				</Tag>
			</Flex>

			<Flex
				mt={2}
				alignItems="center">
				<Text>Submiting as:</Text>
				<Tag
					ml={2}
					size="lg"
					borderRadius="full">
					{(token && user) || (!token && !user) ? (
						<>
							<Avatar
								src={anonymous ? undefined : user?.photo ?? undefined}
								size="xs"
								ml={-1}
								mr={2}
							/>
							<TagLabel>{anonymous ? "Anonymous User" : user?.name}</TagLabel>
						</>
					) : (
						<Spinner size="sm" />
					)}
				</Tag>
				{setAnonymous !== null ? (
					<Button
						ml={1}
						h={8}
						w={8}
						minW={8}
						p={0}
						variant="ghost"
						borderRadius="full"
						onClick={() => setAnonymous(!anonymous)}>
						{anonymous ? <ViewOffIcon /> : <ViewIcon />}
					</Button>
				) : null}
			</Flex>

			<Box h={8} />
		</Card>
	)
}

export default FormHeader
