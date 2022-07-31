import { useContext, useEffect } from "react"
import { MdBlock } from "react-icons/md"
import { Outlet, useLocation, useMatch, useNavigate, useParams } from "react-router-dom"

import {
	Box, Button, Center, Container, Flex, Spinner, Tab, TabList, Tabs, Text
} from "@chakra-ui/react"

import AuthContext from "../../../contexts/AuthContext"
import FormContext from "../../../contexts/FormContext"
import useFetcher from "../../../hooks/useFetcher"

const FormPage = () => {
	const { token, user } = useContext(AuthContext)
	const { form, setForm, setQuestions } = useContext(FormContext)
	const fetcher = useFetcher()
	const location = useLocation()
	const match = useMatch("/forms/:id")
	const navigate = useNavigate()
	const params = useParams()

	useEffect(() => {
		const form_id = params.id ?? ""
		if (!form_id) return

		fetcher(
			{
				url: "/forms/{form_id}",
				method: "GET",
				parameters: {
					form_id
				},
				token
			},
			{ toast: false, redirect: false }
		).then(({ data }) => {
			setForm(data)
		})
	}, [params])

	useEffect(() => {
		if (!form) return

		fetcher({
			url: "/forms/{form_id}/questions",
			method: "GET",
			parameters: {
				form_id: form.id
			},
			token
		}).then(({ data }) => {
			if (data) {
				setQuestions(data)
			}
		})
	}, [form])

	useEffect(() => {
		if (!user || !form) return

		if (!match && form.user_id !== user.id) {
			navigate(`/forms/${form.id}`)
		}
	}, [user, form, match])

	return (
		<Container
			mt={4}
			maxW="4xl">
			{form !== undefined ? (
				form !== null ? (
					!user || user.id !== form.user_id || match ? (
						<Outlet />
					) : (
						<Tabs
							variant="soft-rounded"
							align="center"
							lazyBehavior="keepMounted"
							defaultIndex={["edit", "responses", "settings"].indexOf(
								location.pathname.split("/").at(-1)!
							)}
							isLazy>
							<TabList>
								<Tab onClick={() => navigate("edit")}>Questions</Tab>
								<Tab onClick={() => navigate("responses")}>Responses</Tab>
								<Tab onClick={() => navigate("settings")}>Settings</Tab>
							</TabList>
							<Outlet />
						</Tabs>
					)
				) : (
					<Box
						w="max"
						bg="card"
						shadow="sm"
						rounded="lg"
						p={4}>
						<Flex alignItems="center">
							<MdBlock size={36} />
							<Box ml={4}>
								<Text
									fontWeight="bold"
									color="bw">
									Login to view this form
								</Text>
								<Text fontWeight="normal">
									The owner of this form has indicated that form respondents need
									to be logged in
								</Text>
							</Box>
						</Flex>

						<Center mt={4}>
							<Button
								variant="primary"
								onClick={() => navigate("/login")}>
								Login
							</Button>
						</Center>
					</Box>
				)
			) : (
				<Center>
					<Spinner mt={4} />
				</Center>
			)}
		</Container>
	)
}

export default FormPage
