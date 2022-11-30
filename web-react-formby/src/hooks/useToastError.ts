import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { SerializedError } from "@reduxjs/toolkit"

import AuthContext from "../contexts/AuthContext"
import { setError } from "../slices/ErrorSlice"
import { ApiError } from "../utils/axiosBaseQuery"
import useAppDispatch from "./useAppDispatch"

const useToastError = (error: ApiError | SerializedError | undefined, redirect = false) => {
	const { token } = useContext(AuthContext)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		if (error) {
			dispatch(setError(error))
			if (redirect) {
				navigate(token ? "/forms" : "/login")
			}
		}
	}, [error, redirect])
}

export default useToastError
