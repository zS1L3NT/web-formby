import { useContext } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { useToast } from "@chakra-ui/react"

import { useLogoutMutation } from "../../../api"
import AuthContext from "../../../contexts/AuthContext"
import useAsyncEffect from "../../../hooks/useAsyncEffect"
import { setError } from "../../../slices/ErrorSlice"

const Logout = () => {
	const { token, setToken } = useContext(AuthContext)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const toast = useToast()

	const [logout] = useLogoutMutation()

	useAsyncEffect(async () => {
		if (!token) {
			return navigate("/login")
		}

		setToken(null)
		navigate("/login")

		const result = await logout({
			token
		})

		if ("data" in result) {
			toast({
				title: result.data.message,
				status: "success",
				isClosable: true
			})
		} else {
			dispatch(setError(result.error))
		}
	}, [token])

	return <></>
}

export default Logout
