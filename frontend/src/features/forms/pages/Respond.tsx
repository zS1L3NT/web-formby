import { FC, PropsWithChildren } from "react"

import Form from "../../../models/Form"
import { Question } from "../../../models/Question"

const Respond: FC<
	PropsWithChildren<{
		form: Form
		questions: Question[] | null
	}>
> = props => {
	return <></>
}

export default Respond
