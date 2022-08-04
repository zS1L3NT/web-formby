import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { Box, RenderProps, Toast } from "@chakra-ui/react"

const UnauthorizedToast = (props: RenderProps) => {
	const navigate = useNavigate()

	const [width, setWidth] = useState(100)

	useEffect(() => {
		const interval = setInterval(() => {
			setWidth(width => {
				switch (width) {
					case 0:
						props.onClose()
						navigate("/login")
						clearInterval(interval)
						return 0
					default:
						return width - 0.2
				}
			})
		}, 10)

		return () => {
			props.onClose()
			navigate("/login")
		}
	}, [])

	return (
		<Box pos="relative">
			<Toast
				{...props}
				id="unauthorized"
				title="Unauthorized"
				description="Redirecting you to the login page"
				status="error"
				duration={null}
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

export default UnauthorizedToast
