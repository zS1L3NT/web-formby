import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { Toast, useToast } from "@chakra-ui/react"
import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit"

import AuthContext from "../contexts/AuthContext"
import useAppSelector from "../hooks/useAppSelector"
import { setError } from "../slices/ErrorSlice"

const ErrorHandler = ({}: {}) => {
	const error = useAppSelector(state => state.error)
	const { setToken } = useContext(AuthContext)
	const navigate = useNavigate()
	const toast = useToast()

	useEffect(() => {
		if (!error) return

		toast({
			render: props => (
				<Toast
					{...props}
					title={error.type}
					description={error.message}
					status="error"
					isClosable={true}
				/>
			)
		})

		if (error.type === "Unauthorized") {
			setToken(null)
			// navigate("/login")
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
