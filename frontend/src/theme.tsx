import { extendTheme } from "@chakra-ui/react"

export type Theme = typeof theme

const theme = extendTheme({
	initialColorMode: "light",
	useSystemColorMode: false,
	colors: {
		primary: "#6E85B7",
		secondary: "#B2C8DF",
		accent: "#C4D7E0",
		highlight: "#F8F9D7"
	},
	fonts: {
		heading: "Raleway, sans-serif",
		body: "Raleway, sans-serif"
	}
}) as {
	colors: {
		primary: "#6E85B7"
		secondary: "#B2C8DF"
		accent: "#C4D7E0"
		highlight: "#F8F9D7"
	}
}

export default theme
