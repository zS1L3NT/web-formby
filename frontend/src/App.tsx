import "react-datepicker/dist/react-datepicker.css"

import { FC, PropsWithChildren } from "react"
import { Route, Routes } from "react-router-dom"

import { Flex } from "@chakra-ui/react"

import Navigator from "./components/Navigator"
import Login from "./features/authentication/pages/Login"
import Logout from "./features/authentication/pages/Logout"
import Register from "./features/authentication/pages/Register"
import Dashboard from "./features/dashboard/pages/Dashboard"
import FormPage from "./features/forms/pages/FormPage"
import Landing from "./features/landing/pages/Landing"

const App: FC<PropsWithChildren<{}>> = props => {
	return (
		<Flex
			w="max"
			h="max"
			direction="column">
			<Navigator />
			<Flex
				flex="1"
				bg="background">
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
					<Route
						path="/forms/:id"
						element={<FormPage />}
					/>
				</Routes>
			</Flex>
		</Flex>
	)
}

export default App
