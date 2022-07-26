import { FC, PropsWithChildren } from "react"
import { HiStatusOnline } from "react-icons/hi"
import { MdPublic } from "react-icons/md"
import { useNavigate } from "react-router-dom"

import { AddIcon, EditIcon, LockIcon } from "@chakra-ui/icons"
import { Box, Center, chakra, Flex, HStack, Text } from "@chakra-ui/react"

import { WithTimestamps } from "../../../models"
import { iForm } from "../../../models/Form"

const FormItem: FC<
	PropsWithChildren<{
		form: WithTimestamps<iForm> | null
	}>
> = props => {
	const { form } = props

	const navigate = useNavigate()

	return form ? (
		<Flex
			w={{ base: "max", md: "20rem" }}
			h="12rem"
			p={4}
			bg="card"
			rounded="lg"
			direction="column"
			shadow="sm"
			userSelect="none"
			borderWidth="2px"
			borderColor="transparent"
			justifyContent="space-between"
			transition="box-shadow 0.3s, border-color 0.3s"
			_hover={{
				shadow: "lg",
				borderColor: "primary",
				cursor: "pointer"
			}}
			onClick={() => navigate("/forms/" + form.id)}>
			<Box>
				<Text
					fontSize="18"
					fontWeight="bold"
					color="bw"
					noOfLines={2}>
					{form.name}
				</Text>
				<Text
					fontSize="14"
					noOfLines={2}>
					{form.description}
				</Text>
			</Box>
			<Box>
				<Text
					fontSize="12"
					noOfLines={2}
					opacity="0.75">
					<chakra.span fontWeight="bold">Created At: </chakra.span>
					{new Date(form.created_at).toLocaleString()}
				</Text>
				<Text
					fontSize="12"
					noOfLines={2}
					opacity="0.75">
					<chakra.span fontWeight="bold">Last Updated: </chakra.span>
					{new Date(form.updated_at).toLocaleString()}
				</Text>
				<HStack
					mt={1}
					spacing={2}>
					{form.live ? (
						<HiStatusOnline
							size={20}
							color="var(--chakra-colors-primary)"
						/>
					) : (
						<EditIcon
							w={4}
							h={4}
							color="primary"
						/>
					)}
					{form.requires_auth ? (
						<LockIcon
							w={4}
							h={4}
							color="error"
						/>
					) : (
						<MdPublic
							size={20}
							color="var(--chakra-colors-error)"
						/>
					)}
				</HStack>
			</Box>
		</Flex>
	) : (
		<Center
			w={{ base: "max", md: "20rem" }}
			h="12rem"
			bg="card"
			rounded="lg"
			shadow="sm"
			borderWidth="2px"
			borderColor="transparent"
			transition="box-shadow 0.3s, border-color 0.3s"
			_hover={{
				shadow: "lg",
				borderColor: "primary",
				cursor: "pointer"
			}}>
			<AddIcon />
		</Center>
	)
}

export default FormItem
