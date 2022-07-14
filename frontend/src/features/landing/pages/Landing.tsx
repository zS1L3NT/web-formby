import { FC, PropsWithChildren } from "react"
import { AiOutlineGithub } from "react-icons/ai"

import { ArrowForwardIcon } from "@chakra-ui/icons"
import { Box, Button, chakra, Container, Heading, HStack, Text } from "@chakra-ui/react"

const _Landing: FC<PropsWithChildren<{}>> = props => {
	return (
		<Container
			m="auto"
			maxW="3xl">
			<Heading
				fontWeight="extrabold"
				fontSize={{ base: "4xl", sm: "5xl", md: "7xl" }}
				lineHeight="1.25"
				textAlign="center">
				Create
				<chakra.span color="blue.500"> professional </chakra.span>
				forms on the web
			</Heading>
			<Box
				w="75%"
				mx="auto">
				<Text
					mt={4}
					align="center">
					Formby is a free form creation website that you can use to build professional
					and dynamic forms without much effort.
				</Text>
			</Box>
			<HStack
				mt={8}
				justifyContent="center">
				<Button
					size="lg"
					colorScheme="blue"
					rightIcon={<ArrowForwardIcon />}>
					Get Started
				</Button>
				<Button
					size="lg"
					leftIcon={<AiOutlineGithub size={20} />}>
					GitHub
				</Button>
			</HStack>
		</Container>
	)
}

export default _Landing
