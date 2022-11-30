import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import {
	Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader,
	ModalOverlay, Text, useDisclosure
} from "@chakra-ui/react"

import { useDeleteUserMutation } from "../../../api/auth"
import Card from "../../../components/Card"
import AuthContext from "../../../contexts/AuthContext"
import useOnlyAuthenticated from "../../../hooks/useOnlyAuthenticated"

const DeleteAccountCard = () => {
	const { setToken } = useContext(AuthContext)
	const { token } = useOnlyAuthenticated()
	const navigate = useNavigate()

	const [deleteUser] = useDeleteUserMutation()

	const { isOpen, onClose, onOpen } = useDisclosure()

	return (
		<Card mt={4}>
			<Flex
				direction={{ base: "column", md: "row" }}
				alignItems={{ base: "normal", md: "center" }}>
				<Box flex={1}>
					<Text
						fontSize="2xl"
						noOfLines={2}
						textAlign="left"
						color="text">
						Delete Account
					</Text>
					<Text
						mt={1}
						fontSize="lg"
						textAlign="left"
						color="text">
						Deleting your account also deletes the forms you've created and responses to
						other forms you made under your account
					</Text>
				</Box>

				<Button
					mt={{ base: 4, md: 0 }}
					mx={{ md: 4 }}
					colorScheme="red"
					onClick={onOpen}>
					Delete Account
				</Button>
			</Flex>

			<Modal
				isOpen={isOpen}
				onClose={onClose}
				isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Confirm Deleting Account</ModalHeader>
					<ModalCloseButton />

					<ModalBody>
						<Text>
							Are you sure you want to delete your account, forms and responses to all
							forms you've responded to?
						</Text>
					</ModalBody>

					<ModalFooter>
						<Button
							mr={3}
							variant="ghost"
							onClick={onClose}>
							Close
						</Button>
						<Button
							colorScheme="red"
							onClick={() => {
								navigate("..")
								setToken(null)
								deleteUser({
									token
								})
							}}>
							Confirm
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Card>
	)
}

export default DeleteAccountCard
