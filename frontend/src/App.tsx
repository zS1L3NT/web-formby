import { FC, PropsWithChildren } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { ChakraProvider, Flex } from "@chakra-ui/react"

import Navigator from "./components/Navigator"
import { _AuthProvider as AuthProvider } from "./contexts/AuthContext"
import { Login, Register } from "./features/authentication"
import { Landing } from "./features/landing"
import theme from "./theme"

const _App: FC<PropsWithChildren<{}>> = props => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<ChakraProvider theme={theme}>
					<Flex
						w="max"
						h="max"
						bg="gray.50"
						direction="column">
						<Navigator />
						<Flex flex="1">
							<Routes>
								<Route
									path="/"
									element={<Landing />}
								/>
								<Route
									path="/login"
									element={<Login />}
								/>
								<Route
									path="/register"
									element={<Register />}
								/>
							</Routes>
						</Flex>
					</Flex>
				</ChakraProvider>
			</AuthProvider>
		</BrowserRouter>
	)
}

export default _App
