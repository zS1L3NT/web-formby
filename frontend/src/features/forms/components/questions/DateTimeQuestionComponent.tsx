import { FC, PropsWithChildren, useState } from "react"
import DatePicker from "react-datepicker"

import { DateTimeQuestion } from "../../../../models/Question"
import QuestionComponent from "../QuestionComponent"

const DateTimeQuestionComponent: FC<
	PropsWithChildren<{
		question: DateTimeQuestion
		editable: boolean
	}>
> = props => {
	const { question, editable } = props

	const [date, setDate] = useState<Date | null>(new Date())

	return (
		<QuestionComponent
			editable={editable}
			question={question}>
			<DatePicker
				selected={date}
				onChange={setDate}
				showTimeInput
				timeInputLabel="Time:"
				dateFormat="MMMM d yyyy h:mm aa"
			/>
		</QuestionComponent>
	)
}

export default DateTimeQuestionComponent
