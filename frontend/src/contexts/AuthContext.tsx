import { createContext, FC, PropsWithChildren, useState } from "react"

import User from "../models/User"

type iAuthData = {
	token: string | null
	user: User | null
}

const context = createContext<{
	auth: iAuthData
	setAuth: (value: iAuthData) => void
}>({
	auth: {
		token: null,
		user: null
	},
	setAuth: () => {}
})

export const AuthProvider: FC<PropsWithChildren<{}>> = props => {
	const [auth, setAuth] = useState<iAuthData>({
		token: null,
		user: null
	})

	return (
		<context.Provider
			value={{
				auth,
				setAuth
			}}>
			{props.children}
		</context.Provider>
	)
}
export default context
