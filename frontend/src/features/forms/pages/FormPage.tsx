import { FC, PropsWithChildren, useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { Center, Spinner, useToast } from "@chakra-ui/react"

import AuthContext from "../../../contexts/AuthContext"
import useOnlyAuthenticated from "../../../hooks/useOnlyAuthenticated"
import Form from "../../../models/Form"
import fetcher from "../../../utils/fetcher"

const FormPage: FC<PropsWithChildren<{}>> = props => {
	const { token } = useContext(AuthContext)
	const params = useParams()
	const toast = useToast()

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
		}).then(([error, data]) => {
			if (error) {
				console.error(error)
				toast({
					title: error.type,
					description: error.message,
					status: "error",
					isClosable: true
				})
			} else {
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
