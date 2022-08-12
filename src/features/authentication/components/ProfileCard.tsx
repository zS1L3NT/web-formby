import { ChangeEvent, useEffect, useState } from "react"

import {
	Box, Button, Flex, FormControl, FormLabel, Image, Input, InputGroup, Text, Textarea, useToast
} from "@chakra-ui/react"

import { useUpdateUserMutation } from "../../../api"
import Card from "../../../components/Card"
import useAppDispatch from "../../../hooks/useAppDispatch"
import useOnlyAuthenticated from "../../../hooks/useOnlyAuthenticated"
import { setError } from "../../../slices/ErrorSlice"

const ProfileCard = () => {
	const { token, user } = useOnlyAuthenticated()
	const dispatch = useAppDispatch()
	const toast = useToast()

	const [updateUserMutation, { isLoading, error, data }] = useUpdateUserMutation()

	const [photo, setPhoto] = useState("")
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [photoError, setPhotoError] = useState("")
	const [nameError, setNameError] = useState("")
	const [emailError, setEmailError] = useState("")

	useEffect(() => {
		if (user) {
			setPhoto(user.photo)
			setName(user.name)
			setEmail(user.email)
		}
	}, [user])

	useEffect(() => {
		if (data) {
			toast({
				title: data.message,
				status: "success",
				isClosable: true
			})
		}
	}, [data])

	useEffect(() => {
		if (error) {
			dispatch(setError(error))

			if ("fields" in error) {
				const fields = error.fields!

				if ("photo" in fields) {
					setPhotoError(fields.photo!.join("\n"))
				}
				if ("name" in fields) {
					setNameError(fields.name!.join("\n"))
				}
				if ("email" in fields) {
					setEmailError(fields.email!.join("\n"))
				}
			}
		}
	}, [error])

	return (
		<Card mt={4}>
			<Flex
				direction={{ base: "column", md: "row" }}
				h={{ base: 72, md: 32 }}
				alignItems="center">
				<Box
					h={32}
					w={32}
					bg="whiteAlpha.400"
					borderRadius="lg"
					borderWidth={2}
					borderColor="whiteAlpha.400">
					<Image
						h="calc(var(--chakra-sizes-32) - 4px)"
						w="calc(var(--chakra-sizes-32) - 4px)"
						objectFit="contain"
						src={photo}
						alt="Profile Picture"
					/>
				</Box>

				<Flex
					mt={{ base: 2, md: 0 }}
					ml={{ base: 0, md: 4 }}
					direction="column"
					h={{ base: 20, md: 32 }}
					w={{ base: "full", md: "auto" }}
					flex={1}>
					<Text
						mb={2}
						fontSize="md">
						Photo URL
					</Text>
					<Textarea
						flex={1}
						value={photo}
						isInvalid={!!photoError}
						isDisabled={isLoading}
						placeholder="Profile "
						onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
							setPhoto(e.target.value)
							setPhotoError("")
						}}
					/>
					{photoError ? (
						<Text
							variant="inputError"
							mt={1}>
							{photoError}
						</Text>
					) : null}
				</Flex>
			</Flex>

			<FormControl
				mt={4}
				isRequired>
				<FormLabel>Name</FormLabel>
				<InputGroup>
					<Input
						value={name}
						isInvalid={!!nameError}
						onChange={(e: ChangeEvent<HTMLInputElement>) => {
							setName(e.target.value)
							setNameError("")
						}}
						isDisabled={isLoading}
					/>
				</InputGroup>
				{nameError ? (
					<Text
						variant="inputError"
						mt={1}>
						{nameError}
					</Text>
				) : null}
			</FormControl>

			<FormControl
				mt={4}
				isRequired>
				<FormLabel>Email</FormLabel>
				<InputGroup>
					<Input
						type="email"
						value={email}
						isInvalid={!!emailError}
						onChange={(e: ChangeEvent<HTMLInputElement>) => {
							setEmail(e.target.value)
							setEmailError("")
						}}
						isDisabled={isLoading}
					/>
				</InputGroup>
				{emailError ? (
					<Text
						variant="inputError"
						mt={1}>
						{emailError}
					</Text>
				) : null}
			</FormControl>

			<Button
				mt={4}
				colorScheme="blue"
				isDisabled={user?.photo === photo && user?.name === name && user?.email === email}
				loadingText="Saving..."
				isLoading={isLoading}
				onClick={() => {
					updateUserMutation({
						token,
						email: user!.email !== email ? email : undefined,
						name,
						photo
					})
				}}>
				Save
			</Button>
		</Card>
	)
}

export default ProfileCard
