import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider as ReduxProvider } from "react-redux"
import { BrowserRouter } from "react-router-dom"

import { ChakraProvider } from "@chakra-ui/react"

import App from "./App"
import store from "./store"
import theme from "./theme"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<ReduxProvider store={store}>
				<ChakraProvider theme={theme}>
					<App />
				</ChakraProvider>
			</ReduxProvider>
		</BrowserRouter>
	</StrictMode>
)
