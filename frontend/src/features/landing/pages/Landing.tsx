import { FC, PropsWithChildren } from "react"

import { ArrowForwardIcon } from "@chakra-ui/icons"
import { Box, Button, chakra, Container, HStack, Text } from "@chakra-ui/react"
import { AiOutlineGithub } from "react-icons/ai"

const _Landing: FC<PropsWithChildren<{}>> = props => {
	return (
		<Container
			m="auto"
			maxW="3xl">
			<Text
				fontWeight="extrabold"
				fontSize={{ base: "4xl", sm: "5xl", md: "7xl" }}
				lineHeight="1.25"
				align="center">
				Create
				<chakra.span color="blue.500"> professional </chakra.span>
				forms on the web
			</Text>
			<Box
				w="75%"
				mx="auto">
				<Text
					mt={4}
					fontWeight="semibold"
					fontSize={{ base: "md", sm: "lg", md: "xl" }}
					opacity={0.6}
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
				<Button size="lg" leftIcon={<AiOutlineGithub size={20} />}>
					GitHub
				</Button>
			</HStack>
		</Container>
	)
}

export default _Landing
