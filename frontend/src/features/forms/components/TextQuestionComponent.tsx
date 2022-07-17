import { FC, PropsWithChildren } from "react"

import Card from "../../../components/Card"
import { TextQuestion } from "../../../models/Question"

const TextQuestionComponent: FC<
	PropsWithChildren<{
		question: TextQuestion
		editable: boolean
	}>
> = props => {
	const { question, editable } = props

	return <Card></Card>
}

export default TextQuestionComponent
