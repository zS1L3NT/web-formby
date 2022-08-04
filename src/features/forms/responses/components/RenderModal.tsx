import { useNavigate } from "react-router-dom"

import { Modal, ModalOverlay } from "@chakra-ui/react"

import { iQuestion } from "../../../../models/Question"

const RenderModal = ({
	question,
	isFetching
}: {
	question: iQuestion | null
	isFetching: boolean
}) => {
	const navigate = useNavigate()

	return (
		<Modal
			isOpen={!!question}
			onClose={() => navigate("../..")}>
			<ModalOverlay />
		</Modal>
	)
}

export default RenderModal
