import { FC, PropsWithChildren, useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import {
	Center, Container, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs
} from "@chakra-ui/react"

import AuthContext from "../../../contexts/AuthContext"
import useFetcher from "../../../hooks/useFetcher"
import Form from "../../../models/Form"
import Questions from "./Questions"
import Respond from "./Respond"
import Responses from "./Responses"
import Settings from "./Settings"

const FormPage: FC<PropsWithChildren<{}>> = props => {
	const { token, user } = useContext(AuthContext)
	const fetcher = useFetcher()
	const params = useParams()

	const [form, setForm] = useState<Form | null>(null)

	useEffect(() => {
		const form_id = params["id"] ?? ""
		if (!form_id) return

		fetcher({
			url: "/forms/{form_id}",
			method: "GET",
			parameters: {
				form_id
			},
			token
		}).then(({ data }) => {
			if (data) {
				setForm(Form.fromJson(data))
			}
		})
	}, [params])

	return (
		<Container mt={4} maxW="4xl">
			{form ? (
				!user || user.id !== form.userId ? (
					<Respond />
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
								<Questions />
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
				<Center>
					<Spinner mt={4} />
				</Center>
			)}
		</Container>
	)
}

export default FormPage
