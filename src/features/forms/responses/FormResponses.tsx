import { useParams } from "react-router-dom"

import { useGetFormAnswersQuery, useGetFormQuery } from "../../../api"
import useOnlyAuthenticated from "../../../hooks/useOnlyAuthenticated"
import useOnlyFormOwner from "../../../hooks/useOnlyFormOwner"

const FormResponses = () => {
	const { token, user } = useOnlyAuthenticated()
	const form_id = useParams().form_id as string

	const { data: form } = useGetFormQuery({ form_id, token })
	const { data: answers } = useGetFormAnswersQuery({ form_id, token })

	useOnlyFormOwner(user, form)

	return <></>
}

export default FormResponses
