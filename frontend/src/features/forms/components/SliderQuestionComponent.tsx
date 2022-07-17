import { FC, PropsWithChildren } from "react"

import Card from "../../../components/Card"
import { SliderQuestion } from "../../../models/Question"

const SliderQuestionComponent: FC<
	PropsWithChildren<{
		question: SliderQuestion
		editable: boolean
	}>
> = props => {
	const { question, editable } = props

	return <Card></Card>
}

export default SliderQuestionComponent
