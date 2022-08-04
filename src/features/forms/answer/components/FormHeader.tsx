import { Text } from "@chakra-ui/react"

import Card from "../../../../components/Card"
import { iForm } from "../../../../models/Form"

const FormHeader = ({ form }: { form: iForm }) => {
	return (
		<Card
			my={{ base: 2, md: 4 }}
			_hover={{
				shadow: "lg"
			}}>
			<Text
				fontSize="4xl"
				noOfLines={2}
				textAlign="left"
				color="text">
				{form.name}
			</Text>

			{form.description ? (
				<Text
					mt={2}
					mb={8}
					fontSize="lg"
					noOfLines={10}
					textAlign="left"
					color="text">
					{form.description}
				</Text>
			) : null}
		</Card>
	)
}

export default FormHeader
