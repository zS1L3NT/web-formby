import { Box, Container } from "@chakra-ui/react"

import DeleteAccountCard from "../components/DeleteAccountCard"
import PasswordCard from "../components/PasswordCard"
import ProfileCard from "../components/ProfileCard"

const Account = ({}: {}) => {
	return (
		<Container maxW="4xl">
			<ProfileCard />
			<PasswordCard />
			<DeleteAccountCard />
			<Box h={16} />
		</Container>
	)
}

export default Account
