import { useState } from "react"

import { Box } from "@chakra-ui/react"

import { useUpdateFormMutation } from "../../../../api/forms"
import Card from "../../../../components/Card"
import useAsyncEffect from "../../../../hooks/useAsyncEffect"
import useOnlyAuthenticated from "../../../../hooks/useOnlyAuthenticated"
import useToastError from "../../../../hooks/useToastError"
import { iForm } from "../../../../models/Form"
import EditableText from "./EditableText"

const FormHeader = ({ form }: { form: iForm }) => {
	const { token } = useOnlyAuthenticated()

	const [updateForm, { error }] = useUpdateFormMutation()

	const [name, setName] = useState(form.name)
	const [description, setDescription] = useState(form.description)

	useToastError(error)

	// Update the form on the server when the name or description changes
	useAsyncEffect(async () => {
		if (form.name !== name || form.description !== description) {
			await updateForm({
				token,
				form_id: form.id,
				name,
				description,
				auth: form.auth,
				state: form.state
			})
		}
	}, [token, form, name, description])

	return (
		<Card
			my={{ base: 2, md: 4 }}
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
					{form.description}
				</EditableText>
			</Box>
		</Card>
	)
}

export default FormHeader
