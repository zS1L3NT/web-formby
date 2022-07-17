import { FC, PropsWithChildren } from "react"

import Card from "../../../components/Card"
import { RatingQuestion } from "../../../models/Question"

const RatingQuestionComponent: FC<
	PropsWithChildren<{
		question: RatingQuestion
		editable: boolean
	}>
> = props => {
	const { question, editable } = props

	return <Card></Card>
}

export default RatingQuestionComponent
