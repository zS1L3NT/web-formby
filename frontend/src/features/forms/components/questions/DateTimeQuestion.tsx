import { DateTime } from "luxon"
import { FC, useState } from "react"

import { Input } from "@chakra-ui/react"

import { iDateTimeQuestion } from "../../../../models/Question"
import { QuestionProps } from "../Question"

const DateTimeQuestion: FC<QuestionProps<iDateTimeQuestion>> = props => {
	const { editable } = props

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

export default DateTimeQuestion
