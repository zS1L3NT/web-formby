import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons"
import {
	Avatar, Box, Button, Collapse, Flex, HStack, IconButton, Image, Link, Menu, MenuButton,
	MenuDivider, MenuItem, MenuList, Stack, Text, useColorMode, useColorModeValue, useDisclosure,
	VStack
} from "@chakra-ui/react"

import AuthContext from "../contexts/AuthContext"

const Navigator = () => {
	const { token, user } = useContext(AuthContext)
	const { toggleColorMode } = useColorMode()
	const navigate = useNavigate()

	const { isOpen, onToggle } = useDisclosure()

	const sideMargins = { base: 2, md: 16, lg: 32 }

	return (
		<>
			<Flex
				h="60px"
				p={2}
				bg="card"
				shadow="sm"
				align="center">
				<Flex
					flex={{ base: 1, md: "auto" }}
					display={{ base: "flex", md: "none" }}>
					<IconButton
						aria-label="Toggle Navigation"
						variant="ghost"
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
							color={useColorModeValue("gray.700", "gray.200")}
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
						display={{ base: "none", md: "flex" }}
						spacing={3}>
						<Button
							hidden={!!token}
							color="primary"
							onClick={() => navigate("/login")}>
							Login
						</Button>
						<Button
							hidden={!!token}
							variant="primary"
							onClick={() => navigate("/register")}>
							Register
						</Button>
						<Button
							hidden={!token}
							variant="primary"
							onClick={() => navigate("/create")}>
							Create Form
						</Button>
						{user ? (
							<Menu>
								<MenuButton
									as={Button}
									rounded="full"
									variant="link"
									cursor="pointer"
									ml={4}>
									<Avatar
										w="40px"
										h="40px"
										src={user.photo}
									/>
								</MenuButton>
								<MenuList
									zIndex={101}
									alignItems="center">
									<VStack
										w="2xs"
										px={4}>
										<Avatar
											size="xl"
											src={user.photo}
										/>
										<Text
											wordBreak="break-all"
											textAlign="center">
											{user.name}
										</Text>
										<Text
											fontSize="sm"
											wordBreak="break-all"
											textAlign="center">
											{user.email}
										</Text>
									</VStack>
									<MenuDivider />
									<MenuItem
										onClick={() => navigate("/account")}
										justifyContent="center">
										Account Settings
									</MenuItem>
									<MenuItem
										onClick={() => navigate("/logout")}
										justifyContent="center">
										Logout
									</MenuItem>
								</MenuList>
							</Menu>
						) : null}
					</HStack>
					<IconButton
						ml={4}
						aria-label="color-mode-button"
						icon={useColorModeValue(<SunIcon />, <MoonIcon />)}
						color={useColorModeValue("gray.700", "gray.200")}
						bg={useColorModeValue("gray.300", "gray.600")}
						onClick={toggleColorMode}
					/>
				</Flex>
			</Flex>

			<Box
				display={{ md: "none" }}
				pos="absolute"
				top="56px"
				w="max"
				zIndex={100}>
				<Collapse
					in={isOpen}
					animateOpacity>
					<Stack
						bg="card"
						p={4}
						display={{ md: "none" }}>
						{(
							(token
								? [
										["Create Form", "/create"],
										["Account Settings", "/account"],
										["Logout", "/logout"]
								  ]
								: [
										["Login", "/login"],
										["Register", "/register"]
								  ]) as [string, string][]
						).map(([text, href], i) => (
							<Flex
								key={i}
								py={2}
								as={Link}
								_hover={{
									textDecoration: "none"
								}}
								onClick={() => {
									navigate(href)
									onToggle()
								}}>
								<Text
									fontWeight={600}
									color="text">
									{text}
								</Text>
							</Flex>
						))}
					</Stack>
				</Collapse>
			</Box>
		</>
	)
}

export default Navigator
