import { FC, PropsWithChildren, useContext, useEffect, useState } from "react"

import { Center, Container, Grid, Heading, Spinner } from "@chakra-ui/react"

import AuthContext from "../../../contexts/AuthContext"
import useFetcher from "../../../hooks/useFetcher"
import useOnlyAuthenticated from "../../../hooks/useOnlyAuthenticated"
import { WithTimestamps } from "../../../models"
import { iForm } from "../../../models/Form"
import FormItem from "../components/FormItem"

const Dashboard: FC<PropsWithChildren<{}>> = props => {
	const { token } = useContext(AuthContext)
	const fetcher = useFetcher()

	const [forms, setForms] = useState<WithTimestamps<iForm>[] | null>(null)

	useOnlyAuthenticated()

	useEffect(() => {
		if (!token) return

		fetcher({
			url: "/forms",
			method: "GET",
			query: {
				page: "1"
			},
			token
		}).then(({ data }) => {
			if (data) {
				setForms(data)
			}
		})
	}, [token])

	return (
		<Container
			maxW={{
				base: "max",
				md: "41rem",
				lg: "62rem",
				"2xl": "83rem"
			}}>
			<Heading my={{ base: 4, md: 8 }}>Your Forms</Heading>
			{forms ? (
				<Grid
					w="max"
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

export default Dashboard
