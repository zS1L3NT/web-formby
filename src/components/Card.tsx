import { Box, BoxProps } from "@chakra-ui/react"

const Card = (props: BoxProps) => {
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
				shadow: "lg"
			}}
			{...props}>
			{props.children}
		</Box>
	)
}

export default Card
