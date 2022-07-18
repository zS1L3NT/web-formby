import { FC, PropsWithChildren } from "react"

import Card from "../../../../components/Card"
import { DateTimeQuestion } from "../../../../models/Question"

const DateTimeQuestionComponent: FC<
	PropsWithChildren<{
		question: DateTimeQuestion
		editable: boolean
	}>
> = props => {
	const { question, editable } = props

	return <Card></Card>
}

export default DateTimeQuestionComponent
