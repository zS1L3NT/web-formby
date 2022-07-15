import { FC, PropsWithChildren } from "react"
import { Route, Routes } from "react-router-dom"

import { Flex } from "@chakra-ui/react"

import Navigator from "./components/Navigator"
import { Login, Register } from "./features/authentication"
import { Landing } from "./features/landing"

const _App: FC<PropsWithChildren<{}>> = props => {
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
				</Routes>
			</Flex>
		</Flex>
	)
}

export default _App
