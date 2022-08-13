import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useToast } from "@chakra-ui/react"

import AuthContext from "../contexts/AuthContext"
import useAppSelector from "../hooks/useAppSelector"

const ErrorHandler = () => {
	const { setToken } = useContext(AuthContext)
	const error = useAppSelector(state => state.error)
	const navigate = useNavigate()
	const toast = useToast()

	useEffect(() => {
		if (!error) return

		if (error.type === "Unauthorized") {
			setToken(null)
			navigate("/login")
		}

		if (!toast.isActive(error.type + error.message)) {
			toast({
				id: error.type + error.message,
				title: error.type,
				description: error.message,
				status: "error",
				isClosable: true
			})
		}
	}, [error])

	return <></>
}

export default ErrorHandler
