import { DateTime } from "luxon"
import { FC, useState } from "react"

import { Input } from "@chakra-ui/react"

import { DateTimeQuestion } from "../../../../models/Question"
import { QuestionComponentProps } from "../QuestionComponent"

const DateTimeQuestionComponent: FC<QuestionComponentProps<DateTimeQuestion>> = props => {
	const { editable, dirtyQuestion, setDirtyQuestion, question } = props

	const [date, setDate] = useState<Date>(new Date())

	return (
		<Input
			isDisabled={editable}
			type="datetime-local"
			value={DateTime.fromJSDate(date).toFormat("yyyy-MM-dd'T'HH:mm''")}
			onChange={e => setDate(new Date(e.target.value))}
		/>
	)
}

export default DateTimeQuestionComponent
