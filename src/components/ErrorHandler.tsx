import { useContext, useEffect } from "react"

import { useToast } from "@chakra-ui/react"

import AuthContext from "../contexts/AuthContext"
import useAppSelector from "../hooks/useAppSelector"
import UnauthorizedToast from "./UnauthorizedToast"

const ErrorHandler = () => {
	const error = useAppSelector(state => state.error)
	const { setToken } = useContext(AuthContext)
	const toast = useToast()

	useEffect(() => {
		if (!error) return

		if (error.type === "Unauthorized") {
			if (!toast.isActive("unauthorized")) {
				toast({ render: props => <UnauthorizedToast {...props} /> })
			}
			setToken(null)
		} else {
			if (!toast.isActive(error.type + error.message)) {
				toast({
					id: error.type + error.message,
					title: error.type,
					description: error.message,
					status: "error",
					isClosable: true
				})
			}
		}
	}, [error])

	return <></>
}

export default ErrorHandler
