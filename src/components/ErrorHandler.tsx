import { diff } from "deep-object-diff"
import { useContext, useEffect, useState } from "react"

import { usePrevious, useToast } from "@chakra-ui/react"

import AuthContext from "../contexts/AuthContext"
import useAppSelector from "../hooks/useAppSelector"
import UnauthorizedToast from "./UnauthorizedToast"

const ErrorHandler = () => {
	const error = useAppSelector(state => state.error)
	const { setToken } = useContext(AuthContext)
	const __error = usePrevious(error)
	const toast = useToast()

	const [lastToast, setLastToast] = useState(new Date())

	useEffect(() => {
		if (!error) return

		const differences = Object.keys(diff(__error ?? {}, error)).length
		if (differences > 0 && lastToast.getTime() + 1000 < new Date().getTime()) return

		setLastToast(new Date())
		if (error.type === "Unauthorized") {
			toast({ render: props => <UnauthorizedToast {...props} /> })
			setToken(null)
		} else {
			toast({
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
