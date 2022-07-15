import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import AuthContext from "../contexts/AuthContext"

const useOnlyUnauthenticated = (redirect = "/") => {
	const { token } = useContext(AuthContext)
	const navigate = useNavigate()

	useEffect(() => {
		if (token) {
			navigate(redirect)
		}
	}, [token])
}

export default useOnlyUnauthenticated
