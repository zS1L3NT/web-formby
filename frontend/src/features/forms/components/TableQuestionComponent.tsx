import { FC, PropsWithChildren } from "react"

import Card from "../../../components/Card"
import { TableQuestion } from "../../../models/Question"

const TableQuestionComponent: FC<
	PropsWithChildren<{
		question: TableQuestion
		editable: boolean
	}>
> = props => {
	const { question, editable } = props

	return <Card></Card>
}

export default TableQuestionComponent
