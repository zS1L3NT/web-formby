import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import { ChakraProvider } from "@chakra-ui/react"

import App from "./App"
import { _AuthProvider as AuthProvider } from "./contexts/AuthContext"
import theme from "./theme"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<ChakraProvider theme={theme}>
					<App />
				</ChakraProvider>
			</AuthProvider>
		</BrowserRouter>
	</StrictMode>
)
