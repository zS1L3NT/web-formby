import { FC, PropsWithChildren } from "react"

import Card from "../../../components/Card"
import Form from "../../../models/Form"

const FormHeader: FC<
	PropsWithChildren<{
		form: Form
		editable: boolean
	}>
> = props => {
	const { form, editable } = props

	return <Card></Card>
}

export default FormHeader
