import { FC, PropsWithChildren } from "react"

import Card from "../../../components/Card"
import { SwitchQuestion } from "../../../models/Question"

const SwitchQuestionComponent: FC<
	PropsWithChildren<{
		question: SwitchQuestion
		editable: boolean
	}>
> = props => {
	const { question, editable } = props

	return <Card></Card>
}

export default SwitchQuestionComponent
