import { Route, Routes } from "react-router-dom"

import { Flex } from "@chakra-ui/react"

import Navigator from "./components/Navigator"
import Login from "./features/authentication/pages/Login"
import Logout from "./features/authentication/pages/Logout"
import Register from "./features/authentication/pages/Register"
import Dashboard from "./features/dashboard/pages/Dashboard"
import FormAnswer from "./features/forms/answer/pages/FormAnswer"
import FormEdit from "./features/forms/edit/pages/FormEdit"
import FormPreview from "./features/forms/preview/page/FormPreview"
import FormResponse from "./features/forms/response/FormResponse"
import FormResponses from "./features/forms/responses/pages/FormResponses"
import FormSettings from "./features/forms/settings/FormSettings"
import Landing from "./features/landing/pages/Landing"

const App = () => {
	return (
		<Flex
			w="max"
			h="max"
			direction="column">
			<Navigator />
			<Flex
				flex="1"
				overflowY="scroll"
				bg="background">
				<Routes>
					<Route
						path="/"
						element={<Landing />}
					/>
					<Route
						path="login"
						element={<Login />}
					/>
					<Route
						path="register"
						element={<Register />}
					/>
					<Route
						path="logout"
						element={<Logout />}
					/>
					<Route
						path="dashboard"
						element={<Dashboard />}
					/>
					<Route path="forms/:form_id">
						<Route
							index
							element={<FormAnswer />}
						/>
						<Route
							path="edit"
							element={<FormEdit />}
						/>
						<Route
							path="preview"
							element={<FormPreview />}
						/>
						<Route path="responses">
							<Route
								index
								element={<FormResponses />}
							/>
							<Route
								path=":response_id"
								element={<FormResponse />}
							/>
						</Route>
						<Route
							path="settings"
							element={<FormSettings />}
						/>
					</Route>
				</Routes>
			</Flex>
		</Flex>
	)
}

export default App
