import { Fragment, useContext } from "react"
import { FaShareAlt, FaUser } from "react-icons/fa"
import { MdQuestionAnswer } from "react-icons/md"
import { useLocation, useNavigate } from "react-router-dom"

import {
	CloseIcon, EditIcon, HamburgerIcon, MoonIcon, SettingsIcon, SunIcon, ViewIcon
} from "@chakra-ui/icons"
import {
	Avatar, Box, Button, Collapse, Flex, HStack, IconButton, Image, Link, Menu, MenuButton,
	MenuDivider, MenuItem, MenuList, Spinner, Stack, Text, Tooltip, useColorMode, useColorModeValue,
	useDisclosure, useMediaQuery, VStack
} from "@chakra-ui/react"

import AuthContext from "../contexts/AuthContext"
import ShareModal from "../features/forms/settings/components/ShareModal"
import useAppSelector from "../hooks/useAppSelector"
import { iForm } from "../models/Form"

interface iNavItem {
	title: string
	icon?: JSX.Element
	navigate?: string
	onClick?: () => void
	element?: JSX.Element
	render: boolean
}

const Navigator = () => {
	const { token, user } = useContext(AuthContext)
	const { toggleColorMode } = useColorMode()
	const location = useLocation()
	const navigate = useNavigate()
	// prettier-ignore
	const form = useAppSelector(state => state.api.queries)[`getForm({"form_id":"${location.pathname.match(/\/forms\/([a-zA-Z0-9-]+)\/?/)?.[1]}","token":"${token}"})`]?.data as iForm | undefined

	const {
		isOpen: shareModalIsOpen,
		onOpen: onOpenShareModal,
		onClose: onCloseShareModal
	} = useDisclosure()
	const { isOpen, onToggle, onClose } = useDisclosure()

	const sideMargins = { base: 2, md: 16, lg: 32 }

	const items: iNavItem[] = [
		{
			title: "Login",
			element: (
				<Button
					color="primary"
					onClick={() => navigate("/login")}>
					Login
				</Button>
			),
			render: !token
		},
		{
			title: "Register",
			element: (
				<Button
					variant="primary"
					onClick={() => navigate("/register")}>
					Register
				</Button>
			),
			render: !token
		},
		{
			title: "Form Preview",
			icon: <ViewIcon />,
			navigate: `/forms/${location.pathname.slice(7, 43)}/preview`,
			render:
				!!token &&
				!!location.pathname.match("^/forms/[a-zA-Z0-9-]+/edit") &&
				form?.state === "draft"
		},
		{
			title: "Edit Form",
			icon: <EditIcon />,
			navigate: `/forms/${location.pathname.slice(7, 43)}/edit`,
			render:
				!!token &&
				!!location.pathname.match("^/forms/[a-zA-Z0-9-]+/(?!edit)\\w+") &&
				form?.state === "draft"
		},
		{
			title: "Share",
			icon: <FaShareAlt />,
			onClick: () => onOpenShareModal(),
			render:
				!!token &&
				!!location.pathname.match("^/forms/[a-zA-Z0-9-]+/\\w+") &&
				form?.state === "live"
		},
		{
			title: "Responses",
			icon: <MdQuestionAnswer />,
			navigate: `/forms/${location.pathname.slice(7, 43)}/responses`,
			render: !!token && !!location.pathname.match("^/forms/[a-zA-Z0-9-]+/\\w+")
		},
		{
			title: "Settings",
			icon: <SettingsIcon />,
			navigate: `/forms/${location.pathname.slice(7, 43)}/settings`,
			render: !!token && !!location.pathname.match("^/forms/[a-zA-Z0-9-]+/\\w+")
		},
		{
			title: "Account",
			icon: <FaUser />,
			navigate: "/account",
			render: !!useMediaQuery("(max-width: 48em)")[0]
		},
		{
			title: "Toggle Color Scheme",
			icon: useColorModeValue(<SunIcon />, <MoonIcon />),
			onClick: toggleColorMode,
			render: !!useMediaQuery("(min-width: 48em)")[0]
		}
	]

	return (
		<>
			<Flex
				h="60px"
				p={2}
				bg="card"
				shadow="lg"
				zIndex={10}
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
						onClick={() => navigate(token ? "/forms" : "/")}>
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
						spacing={2}>
						{items
							.filter(item => item.render)
							.map((item, i) => (
								<Fragment key={i}>
									{item.element ?? (
										<Tooltip label={item.title!}>
											<IconButton
												aria-label={item.title!}
												icon={item.icon!}
												onClick={() => {
													item?.onClick?.()
													if (item.navigate) {
														navigate(item.navigate)
													}
												}}
											/>
										</Tooltip>
									)}
								</Fragment>
							))}
						{token ? (
							<Menu>
								<Tooltip label="Account">
									<MenuButton
										as={IconButton}
										icon={user ? <FaUser /> : <Spinner />}
									/>
								</Tooltip>
								<MenuList
									zIndex={101}
									alignItems="center"
									border="none"
									bg="card">
									<VStack
										w="2xs"
										px={4}>
										<Avatar
											size="xl"
											src={user?.photo ?? undefined}
										/>
										<Text
											wordBreak="break-all"
											textAlign="center">
											{user?.name}
										</Text>
										<Text
											fontSize="sm"
											wordBreak="break-all"
											textAlign="center">
											{user?.email}
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
					<Tooltip label="Toggle Color Scheme">
						<IconButton
							display={{ base: "block", md: "none" }}
							ml={4}
							aria-label="Toggle Color Scheme"
							icon={useColorModeValue(<SunIcon />, <MoonIcon />)}
							onClick={toggleColorMode}
						/>
					</Tooltip>
				</Flex>
			</Flex>

			<Box
				display={{ md: "none" }}
				pos="absolute"
				top="56px"
				w="full"
				zIndex={100}>
				<Collapse
					in={isOpen}
					animateOpacity>
					<Stack
						bg="card"
						p={4}
						display={{ md: "none" }}>
						{items
							.filter(item => item.render)
							.map((item, i) => (
								<Flex
									key={i}
									py={2}
									as={Link}
									_hover={{
										textDecoration: "none"
									}}
									onClick={() => {
										onClose()
										item?.onClick?.()
										if (item.navigate) {
											navigate(item.navigate)
										}
									}}>
									<Text
										fontWeight={600}
										color="text">
										{item.title}
									</Text>
								</Flex>
							))}
					</Stack>
				</Collapse>
			</Box>

			<ShareModal
				form={form}
				isOpen={shareModalIsOpen}
				onClose={onCloseShareModal}
			/>
		</>
	)
}

export default Navigator
