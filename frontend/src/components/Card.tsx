import { FC } from "react"
import { DraggableProvided } from "react-beautiful-dnd"

import { Box, BoxProps } from "@chakra-ui/react"

const Card: FC<BoxProps & { provided?: DraggableProvided }> = props => {
	const { provided } = props

	return (
		<Box
			ref={provided?.innerRef}
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
			{...props}
			{...provided?.draggableProps}
			{...provided?.dragHandleProps}>
			{props.children}
		</Box>
	)
}

export default Card
