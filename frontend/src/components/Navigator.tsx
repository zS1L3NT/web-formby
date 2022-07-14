import { FC, PropsWithChildren } from "react"
import { useNavigate } from "react-router-dom"

import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons"
import { Button, Flex, HStack, IconButton, Image, Text, useDisclosure } from "@chakra-ui/react"

const _Navigation: FC<PropsWithChildren<{}>> = props => {
	const navigate = useNavigate()
	const { isOpen } = useDisclosure()

	return (
		<Flex
			h="60px"
			p={2}
			background="white"
			shadow="sm"
			align="center">
			<Flex
				flex={{ base: 1, md: "auto" }}
				display={{ base: "flex", md: "none" }}>
				<IconButton
					icon={
						isOpen ? (
							<CloseIcon
								w={3}
								h={3}
							/>
						) : (
							<HamburgerIcon
								w={5}
								h={5}
							/>
						)
					}
					variant="ghost"
					aria-label="Toggle Navigation"
				/>
			</Flex>

			<Flex
				flex={1}
				justify={{ base: "center", md: "start" }}>
				<Image
					src="/assets/logo.png"
					height="30px"
					ml={2}
					my="3px"
				/>
				<Text
					ml={2}
					fontFamily="heading"
					fontSize="2xl"
					fontWeight="extrabold"
					color="gray.700">
					Formby
				</Text>
			</Flex>

			<Flex
				flex={1}
				justifyContent="end"
				mr={2}>
				<HStack
					display={{ base: "none", md: "block" }}
					spacing={3}>
					<Button
						color="blue.500"
						onClick={() => navigate("/login")}>
						Login
					</Button>
					<Button
						bg="blue.500"
						color="white"
						_hover={{ bg: "blue.400" }}
						onClick={() => navigate("/register")}>
						Register
					</Button>
				</HStack>
			</Flex>
		</Flex>
	)
}

export default _Navigation
