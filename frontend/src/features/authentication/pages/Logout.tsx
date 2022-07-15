import { FC, PropsWithChildren, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useToast } from "@chakra-ui/react"

import AuthContext from "../../../contexts/AuthContext"
import useOnlyAuthenticated from "../../../hooks/useOnlyAuthenticated"
import fetcher from "../../../utils/fetcher"

const _Logout: FC<PropsWithChildren<{}>> = props => {
	const { token, setToken, setUser } = useContext(AuthContext)
	const navigate = useNavigate()
	const toast = useToast()

	useOnlyAuthenticated()

	useEffect(() => {
		if (!token) {
			return navigate("/login")
		}

		setToken(null)
		setUser(null)
		navigate("/login")

		fetcher({
			url: "/logout",
			method: "POST",
			token
		}).then(([error, data]) => {
			if (error) {
				console.error(error)
				// toast({
				// 	title: error.type,
				// 	description: error.message,
				// 	status: "error",
				// 	isClosable: true
				// })
			} else {
				toast({
					title: data.message,
					status: "success",
					isClosable: true
				})
			}
		})
	}, [token])

	return <></>
}

export default _Logout
