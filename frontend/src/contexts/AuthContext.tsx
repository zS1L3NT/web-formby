import { createContext, FC, PropsWithChildren, useEffect, useState } from "react"

import useFetcher from "../hooks/useFetcher"
import User from "../models/User"

const context = createContext<{
	token: string | null
	setToken: (token: string | null) => void
	user: User | null
	setUser: (user: User | null) => void
}>({
	token: null,
	setToken: () => {},
	user: null,
	setUser: () => {}
})

export const AuthProvider: FC<PropsWithChildren<{}>> = props => {
	const fetcher = useFetcher()

	const [token, setToken] = useState<string | null>(localStorage.getItem("token"))
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		const token = localStorage.getItem("token")

		if (token) {
			fetcher({
				url: "/user",
				method: "GET",
				token
			}).then(({ data }) => {
				if (data) {
					setUser(User.fromJson(data))
				} else {
					setToken(null)
					localStorage.removeItem("token")
				}
			})
		}
	}, [])

	const setTokenAndLocalStorage = (token: string | null) => {
		if (token) {
			localStorage.setItem("token", token)
		} else {
			localStorage.removeItem("token")
		}
		
		setToken(token)
	}

	return (
		<context.Provider
			value={{
				token,
				setToken: setTokenAndLocalStorage,
				user,
				setUser
			}}>
			{props.children}
		</context.Provider>
	)
}

export default context
