import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { Box, RenderProps, Toast } from "@chakra-ui/react"

const UnauthenticatedToast = (props: RenderProps) => {
	const navigate = useNavigate()

	const [width, setWidth] = useState(100)

	useEffect(() => {
		const interval = setInterval(() => {
			setWidth(width => {
				switch (width) {
					case 0:
						return 0
					case 0.2:
						clearInterval(interval)
						return 0
					default:
						return width - 0.2
				}
			})
		}, 10)
	}, [])

	return (
		<Box pos="relative">
			<Toast
				{...props}
				title="Unauthenticated"
				description="Redirecting you to the login page"
				status="error"
				onClose={() => navigate("/login")}
				isClosable={true}
			/>
			<Box
				h={1}
				w={width + "%"}
				left={0}
				bottom={0}
				borderBottomLeftRadius="md"
				borderBottomRightRadius="md"
				bg="red.500"
				pos="absolute"
			/>
		</Box>
	)
}

export default UnauthenticatedToast
