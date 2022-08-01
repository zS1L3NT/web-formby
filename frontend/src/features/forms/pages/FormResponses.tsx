import { FC, PropsWithChildren, useContext } from "react"
import { useImmer } from "use-immer"

import AuthContext from "../../../contexts/AuthContext"
import FormContext from "../../../contexts/FormContext"
import useAsyncEffect from "../../../hooks/useAsyncEffect"
import useFetcher from "../../../hooks/useFetcher"
import { WithTimestamps } from "../../../models"
import { iAnswer } from "../../../models/Answer"

const FormResponses: FC<PropsWithChildren<{}>> = props => {
	const { token } = useContext(AuthContext)
	const { form } = useContext(FormContext)
	const fetcher = useFetcher()

	const [answers, setAnswers] = useImmer<WithTimestamps<iAnswer>[] | undefined>(undefined)

	useAsyncEffect(async () => {
		if (!token || !form) return

		const { data: answers } = await fetcher({
			url: `/forms/{form_id}/answers`,
			method: "GET",
			parameters: { form_id: form.id },
			token
		})

		if (answers) {
			setAnswers(answers)
		}
	}, [token, form])

	return <></>
}

export default FormResponses
