import { useContext, useEffect } from "react"

import AuthContext from "../contexts/AuthContext"
import { setError } from "../slices/ErrorSlice"
import useAppDispatch from "./useAppDispatch"

const useOnlyAuthenticated = () => {
	const dispatch = useAppDispatch()
	const { token, user } = useContext(AuthContext)

	useEffect(() => {
		if (token === null) {
			dispatch(
				setError({
					type: "Unauthorized",
					message: "You must be logged in to access this page."
				})
			)
		}
	}, [token])

	return {
		token: token ?? "",
		user
	}
}

export default useOnlyAuthenticated
