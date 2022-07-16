import { FC, PropsWithChildren } from "react"
import { Route, Routes } from "react-router-dom"

import { Flex } from "@chakra-ui/react"

import Navigator from "./components/Navigator"
import { Login, Logout, Register } from "./features/authentication"
import Dashboard from "./features/dashboard/pages/Dashboard"
import { Landing } from "./features/landing"

const App: FC<PropsWithChildren<{}>> = props => {
	return (
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
					<Route
						path="/logout"
						element={<Logout />}
					/>
					<Route
						path="/dashboard"
						element={<Dashboard />}
					/>
				</Routes>
			</Flex>
		</Flex>
	)
}

export default App
