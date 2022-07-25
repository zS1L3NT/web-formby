import { FC } from "react"

import { Box, BoxProps } from "@chakra-ui/react"

const Card: FC<BoxProps> = props => {
	return (
		<Box
			p={4}
			bg="card"
			rounded="lg"
			shadow="sm"
			borderWidth="2px"
			borderColor="transparent"
			transition="box-shadow 0.3s, border-color 0.3s"
			_hover={{
				shadow: "lg",
				cursor: "pointer"
			}}
			{...props}>
			{props.children}
		</Box>
	)
}

export default Card
