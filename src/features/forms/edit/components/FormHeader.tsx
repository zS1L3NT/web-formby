import { useContext, useState } from "react"

import { Box } from "@chakra-ui/react"

import { useUpdateFormMutation } from "../../../../api"
import Card from "../../../../components/Card"
import AuthContext from "../../../../contexts/AuthContext"
import useAsyncEffect from "../../../../hooks/useAsyncEffect"
import { iForm } from "../../../../models/Form"
import EditableText from "./EditableText"

const FormHeader = ({ form }: { form: iForm }) => {
	const { token } = useContext(AuthContext)

	const [updateFormMutation] = useUpdateFormMutation()

	const [name, setName] = useState(form!.name)
	const [description, setDescription] = useState(form!.description)

	// Update the form on the server when the name or description changes
	useAsyncEffect(async () => {
		if (!token) return

		if (form!.name !== name || form!.description !== description) {
			await updateFormMutation({
				token,
				form_id: form!.id,
				name,
				description,
				auth: form.auth,
				state: form.state
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
