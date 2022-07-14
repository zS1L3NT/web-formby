import { FC, PropsWithChildren, useState } from "react"
import { useNavigate } from "react-router-dom"

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import {
	Button, Container, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, Link,
	Stack, Text
} from "@chakra-ui/react"

const _Login: FC<PropsWithChildren<{}>> = props => {
	const navigate = useNavigate()

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [showPassword, setShowPassword] = useState(false)

	return (
		<Container m="auto">
			<Heading textAlign="center">Login</Heading>
			<Text align="center">to gain full access to Formby</Text>
			<Stack
				maxW="md"
				bg="white"
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
						onChange={e => setEmail(e.target.value)}
					/>
				</FormControl>
				<FormControl isRequired>
					<FormLabel>Password</FormLabel>
					<InputGroup>
						<Input
							type={showPassword ? "text" : "password"}
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
						<InputRightElement h="max">
							<Button
								variant="ghost"
								onClick={() => setShowPassword(showPassword => !showPassword)}>
								{showPassword ? <ViewIcon /> : <ViewOffIcon />}
							</Button>
						</InputRightElement>
					</InputGroup>
				</FormControl>
				<Stack
					pt={{
						base: 4,
						md: 6
					}}>
					<Button
						size="lg"
						loadingText="Submitting"
						variant="primary">
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
							color="blue.400"
							onClick={() => navigate("/login")}>
							Login
						</Link>
					</Text>
				</Stack>
			</Stack>
		</Container>
	)
}

export default _Login
