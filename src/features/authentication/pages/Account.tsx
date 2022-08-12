import { Container } from "@chakra-ui/react"

import PasswordCard from "../components/PasswordCard"
import ProfileCard from "../components/ProfileCard"

const Account = ({}: {}) => {
	return (
		<Container maxW="4xl">
			<ProfileCard />
			<PasswordCard />
		</Container>
	)
}

export default Account
