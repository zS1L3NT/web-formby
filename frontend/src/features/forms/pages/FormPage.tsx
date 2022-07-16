import { FC, PropsWithChildren, useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { Center, Spinner } from "@chakra-ui/react"

import AuthContext from "../../../contexts/AuthContext"
import useFetcher from "../../../hooks/useFetcher"
import useOnlyAuthenticated from "../../../hooks/useOnlyAuthenticated"
import Form from "../../../models/Form"

const FormPage: FC<PropsWithChildren<{}>> = props => {
	const { token } = useContext(AuthContext)
	const fetcher = useFetcher()
	const params = useParams()

	const [form, setForm] = useState<Form | null>(null)

	useOnlyAuthenticated()

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

	return form ? (
		<></>
	) : (
		<Center>
			<Spinner mt={4} />
		</Center>
	)
}

export default FormPage
