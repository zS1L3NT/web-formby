import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import { useToast } from "@chakra-ui/react"

import { useLogoutMutation } from "../../../api"
import AuthContext from "../../../contexts/AuthContext"
import useAsyncEffect from "../../../hooks/useAsyncEffect"
import { ApiError } from "../../../utils/axiosBaseQuery"

const Logout = () => {
	const { token, setToken } = useContext(AuthContext)
	const navigate = useNavigate()
	const toast = useToast()

	const [logoutMutation] = useLogoutMutation()

	useAsyncEffect(async () => {
		if (!token) {
			return navigate("/login")
		}

		setToken(null)
		navigate("/login")

		const result = await logoutMutation({
			token
		})

		if ("data" in result) {
			toast({
				title: result.data.message,
				status: "success",
				isClosable: true
			})
		} else {
			const error = result.error as ApiError
			toast({
				title: error.type,
				description: error.message,
				status: "error",
				isClosable: true
			})
		}
	}, [token])

	return <></>
}

export default Logout
