import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import AuthContext from "../contexts/AuthContext"
import User from "../models/User"
import fetcher from "../utils/fetcher"

const useOnlyAuthenticated = (redirect = "/login") => {
	const { token, user, setToken, setUser } = useContext(AuthContext)
	const navigate = useNavigate()

	useEffect(() => {
		if (!token) {
			return navigate(redirect)
		}

		if (!user) {
			fetcher({
				url: "/user",
				method: "GET",
				token
			}).then(([error, data]) => {
				if (error) {
					setToken(null)
					setUser(null)
					navigate(redirect)
				} else {
					setUser(User.fromJson(data))
				}
			})
		}
	}, [token, user])
}

export default useOnlyAuthenticated
