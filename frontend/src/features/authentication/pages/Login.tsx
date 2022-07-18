import { FC, KeyboardEvent, PropsWithChildren, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import {
	Button, Container, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, Link,
	Stack, Text, useBoolean, useToast
} from "@chakra-ui/react"

import AuthContext from "../../../contexts/AuthContext"
import useFetcher from "../../../hooks/useFetcher"
import useOnlyUnauthenticated from "../../../hooks/useOnlyUnautheticated"
import User from "../../../models/User"

const Login: FC<PropsWithChildren<{}>> = props => {
	const { setToken, setUser } = useContext(AuthContext)
	const fetcher = useFetcher()
	const navigate = useNavigate()
	const toast = useToast()

	const [loading, setLoading] = useBoolean()
	const [email, setEmail] = useState("")
	const [emailError, setEmailError] = useState<string | null>(null)
	const [password, setPassword] = useState("")
	const [passwordError, setPasswordError] = useState<string | null>(null)
	const [showPassword, setShowPassword] = useState(false)

	useOnlyUnauthenticated()

	useEffect(() => {
		setEmailError(null)
		setPasswordError(null)
	}, [email, password])

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.target.blur()
			handleLogin()
		}
	}

	const handleLogin = async () => {
		setLoading.on()

		const { data, error } = await fetcher({
			url: "/login",
			method: "POST",
			body: {
				email,
				password
			}
		})

		if (error && "fields" in error) {
			const fields = error.fields!
			if ("email" in fields) {
				setEmailError(fields.email!.join("\n"))
			}
			if ("password" in fields) {
				setPasswordError(fields.password!.join("\n"))
			}
		}

		if (data) {
			setToken(data.token)
			setUser(User.fromJson(data.user))
			toast({
				title: data.message,
				status: "success",
				isClosable: true
			})
		}

		setLoading.off()
	}

	return (
		<Container m="auto">
			<Heading textAlign="center">Login</Heading>
			<Text align="center">to gain full access to Formby</Text>
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
						<InputRightElement h="max">
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
						isLoading={loading}
						loadingText="Logging in..."
						onClick={handleLogin}>
						Login
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
						Don't have an account yet?{" "}
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

export default Login
