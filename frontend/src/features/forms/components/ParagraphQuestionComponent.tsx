import { FC, PropsWithChildren } from "react"

import Card from "../../../components/Card"
import { ParagraphQuestion } from "../../../models/Question"

const ParagraphQuestionComponent: FC<
	PropsWithChildren<{
		question: ParagraphQuestion
		editable: boolean
	}>
> = props => {
	const { question, editable } = props

	return <Card></Card>
}

export default ParagraphQuestionComponent
