import { useContext, useDebugValue, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import AuthContext from "../contexts/AuthContext"

const useOnlyAuthenticated = (redirect = "/login") => {
	const { token, user } = useContext(AuthContext)
	const navigate = useNavigate()

	useDebugValue(`token ${token !== null ? "!" : "="}== null`)

	useEffect(() => {
		if (token === null) {
			navigate(redirect)
		}
	}, [token])

	return {
		token: token ?? "",
		user
	}
}

export default useOnlyAuthenticated
