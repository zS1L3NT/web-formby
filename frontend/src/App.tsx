import { FC, PropsWithChildren } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { ChakraProvider } from "@chakra-ui/react"

import Navigation from "./components/Navigator"
import theme from "./theme"

const _App: FC<PropsWithChildren<{}>> = props => {
	return (
		<BrowserRouter>
			<ChakraProvider theme={theme}>
				<Navigation />
				<Routes>
					<Route path="/" element={<p>A</p>} />
				</Routes>
			</ChakraProvider>
		</BrowserRouter>
	)
}

export default _App
