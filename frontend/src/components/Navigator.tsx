import { FC, PropsWithChildren } from "react"
import { useNavigate } from "react-router-dom"

import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons"
import {
	Box, Button, Collapse, Flex, HStack, IconButton, Image, Link, Stack, Text, useDisclosure
} from "@chakra-ui/react"

const _Navigation: FC<PropsWithChildren<{}>> = props => {
	const navigate = useNavigate()
	const { isOpen, onToggle } = useDisclosure()

	const sideMargins = { base: 2, md: 16, lg: 32 }

	return (
		<>
			<Flex
				h="60px"
				p={2}
				bg="white"
				shadow="sm"
				align="center">
				<Flex
					flex={{ base: 1, md: "auto" }}
					display={{ base: "flex", md: "none" }}>
					<IconButton
						onClick={onToggle}
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
					<HStack
						ml={sideMargins}
						spacing={{
							base: 1,
							md: 2
						}}
						_hover={{
							cursor: "pointer"
						}}
						onClick={() => navigate("/")}>
						<Image
							src="/assets/logo.png"
							height="30px"
							my="3px"
						/>
						<Text
							fontFamily="heading"
							fontWeight="extrabold"
							fontSize={{
								base: "lg",
								sm: "xl",
								md: "2xl"
							}}
							color="gray.700"
							userSelect="none">
							Formby
						</Text>
					</HStack>
				</Flex>

				<Flex
					flex={1}
					justifyContent="end"
					mr={sideMargins}>
					<HStack
						display={{ base: "none", md: "block" }}
						spacing={3}>
						<Button
							color="blue.500"
							onClick={() => navigate("/login")}>
							Login
						</Button>
						<Button
							variant="primary"
							onClick={() => navigate("/register")}>
							Register
						</Button>
					</HStack>
				</Flex>
			</Flex>

			<Box
				display={{ md: "none" }}
				pos="absolute"
				top="60px"
				w="max">
				<Collapse
					in={isOpen}
					animateOpacity>
					<Stack
						bg="white"
						p={4}
						display={{ md: "none" }}>
						<Flex
							py={2}
							as={Link}
							_hover={{
								textDecoration: "none"
							}}
							onClick={() => {
								navigate("/login")
								onToggle()
							}}>
							<Text
								fontWeight={600}
								color="gray.600">
								Login
							</Text>
						</Flex>
						<Flex
							py={2}
							as={Link}
							_hover={{
								textDecoration: "none"
							}}
							onClick={() => {
								navigate("/register")
								onToggle()
							}}>
							<Text
								fontWeight={600}
								color="gray.600">
								Register
							</Text>
						</Flex>
					</Stack>
				</Collapse>
			</Box>
		</>
	)
}

export default _Navigation
