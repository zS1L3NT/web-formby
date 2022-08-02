import { createRoot } from "react-dom/client"
import { Provider as ReduxProvider } from "react-redux"
import { BrowserRouter } from "react-router-dom"

import { ChakraProvider } from "@chakra-ui/react"

import App from "./App"
import { AuthProvider } from "./contexts/AuthContext"
import store from "./store"
import theme from "./theme"

createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<ReduxProvider store={store}>
			<AuthProvider>
				<ChakraProvider theme={theme}>
					<App />
				</ChakraProvider>
			</AuthProvider>
		</ReduxProvider>
	</BrowserRouter>
)
