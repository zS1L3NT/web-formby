import { extendTheme } from "@chakra-ui/react"

export default extendTheme({
	initialColorMode: "light",
	useSystemColorMode: false,
	fonts: {
		heading: "Raleway, sans-serif",
		body: "Raleway, sans-serif"
	},
	sizes: {
		min: "0%",
		max: "100%"
	},
	semanticTokens: {
		colors: {
			primary: "blue.500",
			primaryDark: "blue.400",
			error: "red.500",
			text: "gray.600",
			highlight: "gray.100"
		}
	},
	components: {
		Text: {
			baseStyle: {
				color: "gray.500",
				fontWeight: "medium",
				fontSize: {
					base: "md",
					sm: "lg",
					md: "xl"
				}
			},
			variants: {
				inputError: {
					color: "error",
					fontSize: "sm"
				}
			}
		},
		Button: {
			variants: {
				primary: {
					bg: "primaryDark",
					color: "white",
					_hover: {
						bg: "primary !important"
					}
				}
			}
		}
	}
})
