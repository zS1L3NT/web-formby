import { FC, PropsWithChildren } from "react"

import Card from "../../../components/Card"
import { ColorQuestion } from "../../../models/Question"

const ColorQuestionComponent: FC<
	PropsWithChildren<{
		question: ColorQuestion
		editable: boolean
	}>
> = props => {
	const { question, editable } = props

	return <Card></Card>
}

export default ColorQuestionComponent
