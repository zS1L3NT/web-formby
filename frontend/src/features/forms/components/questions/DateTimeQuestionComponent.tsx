import { DateTime } from "luxon"
import { FC, PropsWithChildren, useState } from "react"

import { Input } from "@chakra-ui/react"

import { DraggableProvided } from "react-beautiful-dnd"
import { DateTimeQuestion } from "../../../../models/Question"
import QuestionComponent from "../QuestionComponent"

const DateTimeQuestionComponent: FC<
	PropsWithChildren<{
		provided: DraggableProvided
		question: DateTimeQuestion
		editable: boolean
	}>
> = props => {
	const { provided, question, editable } = props

	const [date, setDate] = useState<Date>(new Date())

	return (
		<QuestionComponent
			provided={provided}
			editable={editable}
			question={question}>
			<Input
				isDisabled={editable}
				type="datetime-local"
				value={DateTime.fromJSDate(date).toFormat("yyyy-MM-dd'T'HH:mm''")}
				onChange={e => setDate(new Date(e.target.value))}
			/>
		</QuestionComponent>
	)
}

export default DateTimeQuestionComponent
