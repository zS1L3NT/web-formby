import { FC, PropsWithChildren, useState } from "react"

import { Box } from "@chakra-ui/react"

import Card from "../../../components/Card"
import EditableText from "../../../components/EditableText"
import Form from "../../../models/Form"

const FormHeader: FC<
	PropsWithChildren<{
		form: Form
		editable: boolean
	}>
> = props => {
	const { form, editable } = props

	const [name, setName] = useState(form.name)
	const [description, setDescription] = useState(form.description)

	return (
		<Card
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
					{form.description}
				</EditableText>
			</Box>
		</Card>
	)
}

export default FormHeader
