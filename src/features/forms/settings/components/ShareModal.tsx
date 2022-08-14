import {
	Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader,
	ModalOverlay, Text, useClipboard
} from "@chakra-ui/react"

import { iForm } from "../../../../models/Form"

const ShareModal = ({
	form,
	isOpen,
	onClose
}: {
	form: iForm | undefined
	isOpen: boolean
	onClose: () => void
}) => {
	const url = `${window.location.origin}/forms/${form?.id}`
	const { hasCopied, onCopy } = useClipboard(url)

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			isCentered>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Share Form</ModalHeader>
				<ModalCloseButton />

				<ModalBody>
					<Text>
						{form?.auth ? "Only authenticated users" : "Anyone"} can view this form
					</Text>
					<Flex my={4}>
						<Input
							value={url}
							isReadOnly
							placeholder="Welcome"
						/>
						<Button
							onClick={onCopy}
							isDisabled={hasCopied}
							ml={2}>
							{hasCopied ? "Copied" : "Copy"}
						</Button>
					</Flex>
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}

export default ShareModal
