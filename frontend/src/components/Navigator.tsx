import { FC, PropsWithChildren } from "react"
import { useNavigate } from "react-router-dom"

import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons"
import {
	Avatar, Box, Button, Collapse, Flex, HStack, IconButton, Image, Link, Menu, MenuButton,
	MenuDivider, MenuItem, MenuList, Stack, Text, useDisclosure, VStack
} from "@chakra-ui/react"

const _Navigation: FC<PropsWithChildren<{}>> = props => {
	const navigate = useNavigate()
	const { isOpen, onToggle } = useDisclosure()

	const authenticated = true

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
						display={{ base: "none", md: "flex" }}
						spacing={3}>
						<Button
							hidden={authenticated}
							color="blue.500"
							onClick={() => navigate("/login")}>
							Login
						</Button>
						<Button
							hidden={authenticated}
							variant="primary"
							onClick={() => navigate("/register")}>
							Register
						</Button>
						<Button
							hidden={!authenticated}
							variant="primary"
							onClick={() => navigate("/create")}>
							Create Form
						</Button>
					</HStack>
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
								src="https://avatars.dicebear.com/api/male/username.svg"
							/>
						</MenuButton>
						<MenuList alignItems="center">
							<VStack
								w="2xs"
								px={4}>
								<Avatar
									size="xl"
									src="https://avatars.dicebear.com/api/male/username.svg"
								/>
								<Text
									wordBreak="break-all"
									textAlign="center">
									Zechariah Tan
								</Text>
								<Text
									fontSize="sm"
									wordBreak="break-all"
									textAlign="center">
									zechariahtan144@gmail.com
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
						{(
							(authenticated
								? [["Create Form", "/create"]]
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
									color="gray.600">
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

export default _Navigation
