import { Center, Container, Grid, Heading, Spinner } from "@chakra-ui/react"

import { useGetFormsQuery } from "../../../../api"
import useOnlyAuthenticated from "../../../../hooks/useOnlyAuthenticated"
import useToastError from "../../../../hooks/useToastError"
import FormItem from "../components/FormItem"

const FormsView = () => {
	const { token } = useOnlyAuthenticated()

	const { data: forms, error: formsError } = useGetFormsQuery({ token })

	useToastError(formsError, true)

	return (
		<Container
			maxW={{
				base: "full",
				md: "41rem",
				lg: "62rem",
				"2xl": "83rem"
			}}>
			<Heading my={{ base: 4, md: 8 }}>Your Forms</Heading>
			{forms ? (
				<Grid
					w="full"
					templateColumns={{
						md: "repeat(2, 20rem)",
						lg: "repeat(3, 20rem)",
						"2xl": "repeat(4, 20rem)"
					}}
					templateRows="repeat(auto-fit, 12rem)"
					gap={4}>
					{[null, ...forms].map(form => (
						<FormItem
							key={form?.id ?? "null"}
							form={form}
						/>
					))}
				</Grid>
			) : (
				<Center>
					<Spinner mt={4} />
				</Center>
			)}
		</Container>
	)
}

export default FormsView
