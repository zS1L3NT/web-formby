import { FC, PropsWithChildren, useContext, useEffect, useState } from "react"

import { Box } from "@chakra-ui/react"

import Card from "../../../components/Card"
import AuthContext from "../../../contexts/AuthContext"
import FormContext from "../../../contexts/FormContext"
import useFetcher from "../../../hooks/useFetcher"
import EditableText from "./EditableText"

const FormHeader: FC<
	PropsWithChildren<{
		editable: boolean
	}>
> = props => {
	const { editable } = props

	const { token } = useContext(AuthContext)
	const { form, setForm } = useContext(FormContext)
	const fetcher = useFetcher()

	const [name, setName] = useState(form!.name)
	const [description, setDescription] = useState(form!.description)

	useEffect(() => {
		if (!token) return

		if (form!.name !== name || form!.description !== description) {
			fetcher({
				url: "/forms/{form_id}",
				method: "PUT",
				parameters: {
					form_id: form!.id
				},
				body: {
					name,
					description
				},
				token
			}).then(({ data }) => {
				if (data) {
					setForm(data.form)
				}
			})
		}
	}, [token, form, name, description])

	return (
		<Card
			my={4}
			_hover={{
				shadow: "lg"
			}}>
			<EditableText
				editable={editable}
				required={true}
				placeholder="Add a title"
				text={name}
				setText={setName}
				fontSize="4xl"
				noOfLines={2}
			/>
			<Box
				mt={2}
				mb={8}>
				<EditableText
					editable={editable}
					placeholder="Add a description"
					text={description}
					setText={setDescription}
					fontSize="lg"
					noOfLines={10}>
					{form!.description}
				</EditableText>
			</Box>
		</Card>
	)
}

export default FormHeader
