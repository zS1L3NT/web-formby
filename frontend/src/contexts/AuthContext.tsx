import { createContext, FC, PropsWithChildren, useState } from "react"

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

export const _AuthProvider: FC<PropsWithChildren<{}>> = props => {
	const [token, setToken] = useState<string | null>(null)
	const [user, setUser] = useState<User | null>(null)

	return (
		<context.Provider
			value={{
				token,
				setToken,
				user,
				setUser
			}}>
			{props.children}
		</context.Provider>
	)
}

export default context
