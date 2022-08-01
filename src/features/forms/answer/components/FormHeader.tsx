import { useContext, useState } from "react"

import { Box } from "@chakra-ui/react"

import Card from "../../../../components/Card"
import FormContext from "../../../../contexts/FormContext"
import EditableText from "../../edit/components/EditableText"

const FormHeader = ({ editable }: { editable: boolean }) => {
	const { form, setForm } = useContext(FormContext)

	const [name, setName] = useState(form!.name)
	const [description, setDescription] = useState(form!.description)

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
