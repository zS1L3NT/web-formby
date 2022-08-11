import { useParams } from "react-router-dom"

import {
	Box, Button, Center, Container, Divider, Flex, Modal, ModalBody, ModalCloseButton, ModalContent,
	ModalFooter, ModalHeader, ModalOverlay, Spinner, Switch, Text, useDisclosure
} from "@chakra-ui/react"

import { useGetFormQuery, useUpdateFormMutation } from "../../../../api"
import Card from "../../../../components/Card"
import useOnlyAuthenticated from "../../../../hooks/useOnlyAuthenticated"
import useOnlyFormOwner from "../../../../hooks/useOnlyFormOwner"
import useToastError from "../../../../hooks/useToastError"

const FormSettings = () => {
	const { token, user } = useOnlyAuthenticated()
	const form_id = useParams().form_id!

	const { isOpen, onClose, onOpen } = useDisclosure()
	const { data: form, error: formError } = useGetFormQuery({ form_id, token })
	const [updateFormMutation] = useUpdateFormMutation()

	useOnlyFormOwner(user, form)

	useToastError(formError)

	return (
		<Container
			mt={4}
			maxW="4xl">
			{form ? (
				<Card my={4}>
					<Text
						fontSize="4xl"
						noOfLines={2}
						textAlign="left"
						color="text"
						mb={form.description ? 0 : 8}>
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

					<Divider borderColor="gray.400" />

					<Flex
						mt={4}
						alignItems="center">
						<Box flex={1}>
							<Text
								fontSize="2xl"
								noOfLines={2}
								textAlign="left"
								color="text">
								Authentication
							</Text>
							<Text
								mt={1}
								fontSize="lg"
								textAlign="left"
								color="text">
								Form requires a user to be authenticated to submit a form
							</Text>
						</Box>

						<Switch
							mt={1}
							mx={4}
							size="lg"
							isChecked={form.auth}
							onChange={() => {
								updateFormMutation({
									form_id,
									token,
									auth: !form.auth,
									state: form.state
								})
							}}
						/>
					</Flex>

					{form.state !== "closed" ? (
						<Flex
							mt={4}
							alignItems="center">
							<Box flex={1}>
								<Text
									fontSize="2xl"
									noOfLines={2}
									textAlign="left"
									color="text">
									{form.state === "draft" ? "Make Form Live" : "Close Form"}
								</Text>
								<Text
									mt={1}
									fontSize="lg"
									textAlign="left"
									color="text">
									{form.state === "draft" ? (
										<>
											Making a form live allows others to submit responses.
											<br />
											This means that{" "}
											<b>the form cannot be modified anymore</b>
										</>
									) : (
										"Closing a form prevents any more responses to this form"
									)}
								</Text>
							</Box>

							<Button
								mx={4}
								colorScheme="red"
								onClick={onOpen}>
								{form.state === "draft" ? "Make Form Live" : "Close Form"}
							</Button>
						</Flex>
					) : null}
				</Card>
			) : (
				<Center mt={4}>
					<Spinner />
				</Center>
			)}

			{form && form.state !== "closed" ? (
				<Modal
					isOpen={isOpen}
					onClose={onClose}
					isCentered>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>
							Confirm {form.state === "draft" ? "Making Form Live" : "Closing Form"}
						</ModalHeader>
						<ModalCloseButton />

						<ModalBody>
							<Text>
								Are you sure you want to{" "}
								{form.state === "draft" ? "make this form live" : "close this form"}
								?
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
									onClose()
									updateFormMutation({
										form_id,
										token,
										auth: form.auth,
										state: form.state === "draft" ? "live" : "closed"
									})
								}}>
								Confirm
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			) : null}
		</Container>
	)
}

export default FormSettings