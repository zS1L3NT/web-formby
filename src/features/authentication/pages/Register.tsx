import { KeyboardEvent, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import {
	Button, Container, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, Link,
	Stack, Text, useToast
} from "@chakra-ui/react"

import { useRegisterMutation } from "../../../api"
import AuthContext from "../../../contexts/AuthContext"
import useAppDispatch from "../../../hooks/useAppDispatch"
import useOnlyUnauthenticated from "../../../hooks/useOnlyUnautheticated"
import { setError } from "../../../slices/ErrorSlice"

const Register = () => {
	const { setToken } = useContext(AuthContext)
	const dispatch = useAppDispatch()
	const toast = useToast()
	const navigate = useNavigate()

	const [register, { isLoading }] = useRegisterMutation()

	const [showPassword, setShowPassword] = useState(false)
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [nameError, setNameError] = useState<string | null>(null)
	const [emailError, setEmailError] = useState<string | null>(null)
	const [passwordError, setPasswordError] = useState<string | null>(null)

	useOnlyUnauthenticated()

	useEffect(() => {
		setNameError(null)
		setEmailError(null)
		setPasswordError(null)
	}, [name, email, password])

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.currentTarget.blur()
			handleRegister()
		}
	}

	const handleRegister = async () => {
		const result = await register({
			name,
			email,
			password
		})

		if ("data" in result) {
			setToken(result.data.token)
			toast({
				title: result.data.message,
				status: "success",
				isClosable: true
			})
		} else {
			dispatch(setError(result.error))

			if ("fields" in result.error && result.error.fields) {
				const fields = result.error.fields
				if ("name" in fields) {
					setNameError(fields.name!.join("\n"))
				}
				if ("email" in fields) {
					setEmailError(fields.email!.join("\n"))
				}
				if ("password" in fields) {
					setPasswordError(fields.password!.join("\n"))
				}
			}
		}
	}

	return (
		<Container m="auto">
			<Heading textAlign="center">Register</Heading>
			<Text align="center">to start using Formby</Text>
			<Stack
				maxW="md"
				bg="card"
				rounded="lg"
				boxShadow="lg"
				mt={{
					base: 6,
					md: 8
				}}
				mx="auto"
				p={{
					base: 6,
					md: 8
				}}
				spacing={{
					base: 3,
					md: 4
				}}>
				<FormControl isRequired>
					<FormLabel>Name</FormLabel>
					<Input
						type="name"
						value={name}
						isInvalid={!!nameError}
						onChange={e => setName(e.target.value)}
						onKeyDown={handleKeyDown}
					/>
					{nameError ? (
						<Text
							variant="inputError"
							mt={1}>
							{nameError}
						</Text>
					) : null}
				</FormControl>
				<FormControl isRequired>
					<FormLabel>Email address</FormLabel>
					<Input
						type="email"
						value={email}
						isInvalid={!!emailError}
						onChange={e => setEmail(e.target.value)}
						onKeyDown={handleKeyDown}
					/>
					{emailError ? (
						<Text
							variant="inputError"
							mt={1}>
							{emailError}
						</Text>
					) : null}
				</FormControl>
				<FormControl isRequired>
					<FormLabel>Password</FormLabel>
					<InputGroup>
						<Input
							type={showPassword ? "text" : "password"}
							value={password}
							isInvalid={!!passwordError}
							onChange={e => setPassword(e.target.value)}
							onKeyDown={handleKeyDown}
						/>
						<InputRightElement h="full">
							<Button
								variant="ghost"
								onClick={() => setShowPassword(showPassword => !showPassword)}>
								{showPassword ? <ViewIcon /> : <ViewOffIcon />}
							</Button>
						</InputRightElement>
					</InputGroup>
					{passwordError ? (
						<Text
							variant="inputError"
							mt={1}>
							{passwordError}
						</Text>
					) : null}
				</FormControl>
				<Stack
					pt={{
						base: 4,
						md: 6
					}}>
					<Button
						size="lg"
						variant="primary"
						isLoading={isLoading}
						loadingText="Registering..."
						onClick={handleRegister}>
						Register
					</Button>
				</Stack>
				<Stack
					pt={{
						base: 4,
						md: 6
					}}>
					<Text
						fontSize="md"
						align="center">
						Already have an account?{" "}
						<Link
							color="primary"
							onClick={() => navigate("/login")}>
							Login
						</Link>
					</Text>
				</Stack>
			</Stack>
		</Container>
	)
}

export default Register
