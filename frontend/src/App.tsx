import { FC, PropsWithChildren } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { ChakraProvider, Flex } from "@chakra-ui/react"

import Navigation from "./components/Navigator"
import { Landing } from "./features/landing"
import theme from "./theme"

const _App: FC<PropsWithChildren<{}>> = props => {
	return (
		<BrowserRouter>
			<ChakraProvider theme={theme}>
				<Flex
					w="max"
					h="max"
					direction="column">
					<Navigation />
					<Flex flex="1">
						<Routes>
							<Route
								path="/"
								element={<Landing />}
							/>
						</Routes>
					</Flex>
				</Flex>
			</ChakraProvider>
		</BrowserRouter>
	)
}

export default _App
