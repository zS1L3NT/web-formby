import { useContext, useDebugValue, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import AuthContext from "../contexts/AuthContext"
import User from "../models/User"
import useFetcher from "./useFetcher"

const useOnlyAuthenticated = (redirect = "/login") => {
	const { token, user, setUser } = useContext(AuthContext)
	const fetcher = useFetcher()
	const navigate = useNavigate()

	useDebugValue(`token ${token !== null ? "!" : "="}== null`)

	useEffect(() => {
		if (!token) {
			return navigate(redirect)
		}

		if (!user) {
			fetcher(
				{
					url: "/user",
					method: "GET",
					token
				},
				false
			).then(({ data }) => {
				if (!data) return

				setUser(User.fromJson(data))
			})
		}
	}, [token, user])
}

export default useOnlyAuthenticated
