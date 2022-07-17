import { FC, PropsWithChildren, useContext, useEffect, useState } from "react"
import { MdBlock } from "react-icons/md"
import { useNavigate, useParams } from "react-router-dom"

import {
	Box, Button, Center, Container, Flex, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs, Text
} from "@chakra-ui/react"

import AuthContext from "../../../contexts/AuthContext"
import useFetcher from "../../../hooks/useFetcher"
import Form from "../../../models/Form"
import { Question } from "../../../models/Question"
import Questions from "./Questions"
import Respond from "./Respond"
import Responses from "./Responses"
import Settings from "./Settings"

const FormPage: FC<PropsWithChildren<{}>> = props => {
	const { token, user } = useContext(AuthContext)
	const fetcher = useFetcher()
	const navigate = useNavigate()
	const params = useParams()

	const [form, setForm] = useState<Form | null>()
	const [questions, setQuestions] = useState<Question[] | null>(null)

	useEffect(() => {
		const form_id = params["id"] ?? ""
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
			if (data) {
				setForm(Form.fromJson(data))
			}
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
				setQuestions(data.map(Question.fromJson))
			} else {
				setQuestions(null)
			}
		})
	}, [form])

	return (
		<Container
			mt={4}
			maxW="4xl">
			{form !== undefined ? (
				form !== null ? (
					!user || user.id !== form.userId ? (
						<Respond
							form={form}
							questions={questions}
						/>
					) : (
						<Tabs
							variant="soft-rounded"
							align="center"
							lazyBehavior="keepMounted"
							isLazy>
							<TabList>
								<Tab>Questions</Tab>
								<Tab>Responses</Tab>
								<Tab>Settings</Tab>
							</TabList>
							<TabPanels>
								<TabPanel>
									<Questions
										form={form}
										questions={questions}
										editable={true}
									/>
								</TabPanel>
								<TabPanel>
									<Responses />
								</TabPanel>
								<TabPanel>
									<Settings />
								</TabPanel>
							</TabPanels>
						</Tabs>
					)
				) : (
					<Box
						w="max"
						bg="white"
						shadow="sm"
						rounded="lg"
						p={4}>
						<Flex alignItems="center">
							<MdBlock size={36} />
							<Box ml={4}>
								<Text
									fontWeight="bold"
									color="black">
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
