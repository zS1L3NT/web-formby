import { useParams } from "react-router-dom"

import { useGetFormAnswersQuery, useGetFormQuery } from "../../../api"
import useOnlyAuthenticated from "../../../hooks/useOnlyAuthenticated"

const FormResponses = () => {
	const { token } = useOnlyAuthenticated()
	const form_id = useParams().form_id as string

	const { data: form } = useGetFormQuery({ form_id, token })
	const { data: answers } = useGetFormAnswersQuery({ form_id, token })

	return <></>
}

export default FormResponses
