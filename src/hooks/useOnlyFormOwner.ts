import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { iForm } from "../models/Form"
import { iUser } from "../models/User"
import { setError } from "../slices/ErrorSlice"
import useAppDispatch from "./useAppDispatch"

/**
 * Only allow the form owner to stay on this page.
 * If not, redirect the user to the form answer page or their forms view
 *
 * @param user Currently authenticated user
 * @param form Form
 */
const useOnlyFormOwner = (user: iUser | null | undefined, form: iForm | null | undefined) => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		if (!user || !form) return

		if (form.user_id !== user.id) {
			dispatch(
				setError({
					type: "Permission Denied",
					message: "You do not have permission to edit this form."
				})
			)

			if (form.state === "live") {
				navigate(`/forms/${form.id}`)
			} else {
				navigate("/forms")
			}
		}
	}, [user, form])
}

export default useOnlyFormOwner
