import { createContext, FC, PropsWithChildren, useEffect, useState } from "react"

import User from "../models/User"
import fetcher from "../utils/fetcher"

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

export const _AuthProvider: FC<PropsWithChildren<{}>> = props => {
	const [token, setToken] = useState<string | null>(localStorage.getItem("token"))
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		const token = localStorage.getItem("token")

		if (token) {
			fetcher({
				url: "/user",
				method: "GET",
				token
			}).then(([error, data]) => {
				if (error) {
					console.error(error)
					setToken(null)
					localStorage.removeItem("token")
				} else {
					setUser(User.fromJson(data))
				}
			})
		}
	}, [])

	const setTokenAndLocalStorage = (token: string | null) => {
		setToken(token)

		if (token) {
			localStorage.setItem("token", token)
		} else {
			localStorage.removeItem("token")
		}
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
