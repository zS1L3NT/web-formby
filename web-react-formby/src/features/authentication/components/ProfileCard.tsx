import { useEffect, useRef, useState } from "react"

import { CloseIcon } from "@chakra-ui/icons"
import {
	Box, Button, Center, Flex, FormControl, FormLabel, Image, Input, InputGroup, Text, useToast
} from "@chakra-ui/react"

import { useUpdateUserMutation } from "../../../api/auth"
import Card from "../../../components/Card"
import useAppDispatch from "../../../hooks/useAppDispatch"
import useOnlyAuthenticated from "../../../hooks/useOnlyAuthenticated"
import { setError } from "../../../slices/ErrorSlice"

const ProfileCard = () => {
	const { token, user } = useOnlyAuthenticated()
	const dispatch = useAppDispatch()
	const photoInputRef = useRef<HTMLInputElement>(null)
	const toast = useToast()

	const [updateUser, { isLoading }] = useUpdateUserMutation()

	const [photo, setPhoto] = useState<string | null>(null)
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [photoError, setPhotoError] = useState<string | null>(null)
	const [nameError, setNameError] = useState<string | null>(null)
	const [emailError, setEmailError] = useState<string | null>(null)

	useEffect(() => {
		if (user) {
			setPhoto(user.photo)
			setName(user.name)
			setEmail(user.email)
		}
	}, [user])

	useEffect(() => {
		setPhotoError(null)
		setNameError(null)
		setEmailError(null)
	}, [photo, name, email])

	const handleFileChange = (file: File | null) => {
		if (!file) {
			setPhoto("")
			return
		}

		if (!file.type.startsWith("image/")) {
			toast({
				title: "File is not an image",
				status: "error",
				isClosable: true
			})
			photoInputRef.current!.value = ""
			return
		}

		if (file.size > 500000) {
			toast({
				title: "File size cannot be more than 500kB",
				status: "error",
				isClosable: true
			})
			photoInputRef.current!.value = ""
			return
		}

		const reader = new FileReader()
		reader.onload = () => {
			setPhoto(reader.result as string)
		}
		reader.readAsDataURL(file)
	}

	const handleSave = async () => {
		const result = await updateUser({
			token,
			email: user!.email !== email ? email : undefined,
			name,
			photo
		})

		if ("data" in result) {
			toast({
				title: result.data.message,
				status: "success",
				isClosable: true
			})
		} else {
			dispatch(setError(result.error))

			if ("fields" in result.error) {
				const fields = result.error.fields!

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
	}

	return (
		<Card mt={4}>
			<Flex
				h={32}
				alignItems="center">
				<Box
					h={32}
					w={32}
					bg="var(--chakra-colors-chakra-border-color)"
					borderRadius="lg"
					borderWidth={2}
					borderColor="var(--chakra-colors-chakra-border-color)">
					<Image
						h="calc(var(--chakra-sizes-32) - 4px)"
						w="calc(var(--chakra-sizes-32) - 4px)"
						borderRadius="lg"
						objectFit="contain"
						src={photo ?? undefined}
						alt="Profile Picture"
						fallback={
							<Center
								h="calc(var(--chakra-sizes-32) - 4px)"
								w="calc(var(--chakra-sizes-32) - 4px)">
								<CloseIcon />
							</Center>
						}
					/>
				</Box>

				<Flex
					ml={4}
					h={36}
					flex={1}
					direction="column"
					justifyContent="space-evenly"
					alignItems="start">
					<Input
						hidden={true}
						ref={photoInputRef}
						type="file"
						accept="image/*"
						onChange={e => handleFileChange(e.target.files?.[0] ?? null)}
					/>
					<Button
						colorScheme="blue"
						onClick={() => photoInputRef.current?.click()}>
						Select Photo
					</Button>
					<Button
						colorScheme="red"
						onClick={() => {
							photoInputRef.current!.value = ""
							setPhoto(user?.photo ?? null)
						}}>
						Reset Photo
					</Button>
					<Button
						colorScheme="red"
						onClick={() => {
							photoInputRef.current!.value = ""
							setPhoto(null)
						}}>
						Remove Photo
					</Button>
				</Flex>
				{photoError ? (
					<Text
						variant="inputError"
						mt={1}>
						{photoError}
					</Text>
				) : null}
			</Flex>

			<FormControl
				mt={4}
				isRequired>
				<FormLabel>Name</FormLabel>
				<InputGroup>
					<Input
						value={name}
						isInvalid={!!nameError}
						onChange={e => setName(e.target.value)}
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
						onChange={e => setEmail(e.target.value)}
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
				onClick={handleSave}>
				Save
			</Button>
		</Card>
	)
}

export default ProfileCard
