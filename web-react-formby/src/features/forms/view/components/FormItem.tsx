import { DateTime } from "luxon"
import { HiStatusOnline } from "react-icons/hi"
import { MdOutlineClose, MdPublic } from "react-icons/md"
import { useNavigate } from "react-router-dom"

import { AddIcon, EditIcon, LockIcon } from "@chakra-ui/icons"
import { Box, Center, chakra, Flex, HStack, Spinner, Text } from "@chakra-ui/react"

import { useCreateFormMutation } from "../../../../api/forms"
import useOnlyAuthenticated from "../../../../hooks/useOnlyAuthenticated"
import useToastError from "../../../../hooks/useToastError"
import { WithTimestamps } from "../../../../models"
import { iForm } from "../../../../models/Form"

const FormItem = ({ form }: { form: WithTimestamps<iForm> | null }) => {
	const { token } = useOnlyAuthenticated()
	const navigate = useNavigate()

	const [createForm, { isLoading, error }] = useCreateFormMutation()

	useToastError(error)

	return form ? (
		<Flex
			w={{ base: "full", md: "20rem" }}
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
			onClick={() => {
				if (form.state === "draft") {
					navigate(`${form.id}/edit`)
				} else {
					navigate(`${form.id}/responses`)
				}
			}}>
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
					{form.state === "draft" ? (
						<EditIcon
							w={4}
							h={4}
							color="primary"
						/>
					) : form.state === "live" ? (
						<HiStatusOnline
							size={20}
							color="var(--chakra-colors-primary)"
						/>
					) : (
						<MdOutlineClose
							size={20}
							color="var(--chakra-colors-primary)"
						/>
					)}
					{form.auth ? (
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
			w={{ base: "full", md: "20rem" }}
			h="12rem"
			bg="card"
			rounded="lg"
			shadow="sm"
			borderWidth="2px"
			borderColor="transparent"
			transition="box-shadow 0.3s, border-color 0.3s"
			opacity={isLoading ? 0.5 : 1}
			_hover={
				isLoading
					? {}
					: {
							shadow: "lg",
							borderColor: "primary",
							cursor: "pointer"
					  }
			}
			onClick={async () => {
				if (isLoading) return

				const result = await createForm({
					token,
					name: "New Form",
					description: `Created on ${DateTime.now().toFormat("dd LLL yyyy, HH:mm:ss")}`,
					auth: false,
					state: "draft"
				})

				if ("data" in result) {
					navigate(`${result.data.form.id}/edit`)
				}
			}}>
			{isLoading ? <Spinner /> : <AddIcon />}
		</Center>
	)
}

export default FormItem
