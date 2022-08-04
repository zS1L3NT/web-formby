import { useEffect } from "react"

import { SerializedError } from "@reduxjs/toolkit"

import { setError } from "../slices/ErrorSlice"
import { ApiError } from "../utils/axiosBaseQuery"
import useAppDispatch from "./useAppDispatch"

const useToastError = (error: ApiError | SerializedError | undefined) => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (error) {
			dispatch(setError(error))
		}
	}, [error, dispatch])
}

export default useToastError
