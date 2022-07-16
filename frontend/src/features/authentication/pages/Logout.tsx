import { FC, PropsWithChildren, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useToast } from "@chakra-ui/react"

import AuthContext from "../../../contexts/AuthContext"
import useFetcher from "../../../hooks/useFetcher"
import useOnlyAuthenticated from "../../../hooks/useOnlyAuthenticated"

const Logout: FC<PropsWithChildren<{}>> = props => {
	const { token, setToken, setUser } = useContext(AuthContext)
	const fetcher = useFetcher()
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
		}).then(({ data }) => {
			if (data) {
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

export default Logout
