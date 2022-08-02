import { useContext, useEffect } from "react"

import { useToast } from "@chakra-ui/react"
import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit"

import AuthContext from "../contexts/AuthContext"
import useAppSelector from "../hooks/useAppSelector"
import { setError } from "../slices/ErrorSlice"
import UnauthenticatedToast from "./UnauthenticatedToast"

const ErrorHandler = () => {
	const error = useAppSelector(state => state.error)
	const { setToken } = useContext(AuthContext)
	const toast = useToast()

	useEffect(() => {
		if (!error) return

		if (error.type === "Unauthorized") {
			toast({ render: props => <UnauthenticatedToast {...props} /> })
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

export const errorHandlerMiddleware: Middleware =
	({ dispatch }) =>
	next =>
	action => {
		if (isRejectedWithValue(action)) {
			console.log(action)
			dispatch(setError(action.payload))
		} else {
			next(action)
		}
	}

export default ErrorHandler
