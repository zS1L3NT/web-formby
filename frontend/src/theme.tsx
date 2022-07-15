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
					color: "red.500",
					fontSize: "sm"
				}
			}
		},
		Button: {
			variants: {
				primary: {
					bg: "blue.400",
					color: "white",
					_hover: {
						bg: "blue.500 !important"
					}
				}
			}
		}
	}
})
