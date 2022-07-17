import { FC, PropsWithChildren } from "react"

import Card from "../../../components/Card"
import { ChoiceQuestion } from "../../../models/Question"

const ChoiceQuestionComponent: FC<
	PropsWithChildren<{
		question: ChoiceQuestion
		editable: boolean
	}>
> = props => {
	const { question, editable } = props

	return <Card></Card>
}

export default ChoiceQuestionComponent
