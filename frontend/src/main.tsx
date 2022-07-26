import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import { ChakraProvider } from "@chakra-ui/react"

import App from "./App"
import { AuthProvider } from "./contexts/AuthContext"
import { FormProvider } from "./contexts/FormContext"
import theme from "./theme"

createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<AuthProvider>
			<FormProvider>
				<ChakraProvider theme={theme}>
					<App />
				</ChakraProvider>
			</FormProvider>
		</AuthProvider>
	</BrowserRouter>
)
