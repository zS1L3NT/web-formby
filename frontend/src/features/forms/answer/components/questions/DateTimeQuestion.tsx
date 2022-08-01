import { DateTime } from "luxon"

import { Input } from "@chakra-ui/react"

import { iDateTimeAnswer } from "../../../../../models/Answer"
import { iDateTimeQuestion } from "../../../../../models/Question"
import { QuestionProps } from "../Question"

const DateTimeQuestion = ({
	editable,
	answer,
	setAnswer
}: QuestionProps<iDateTimeQuestion, iDateTimeAnswer>) => {
	return (
		<Input
			isDisabled={editable}
			type="datetime-local"
			value={DateTime.fromJSDate(new Date(answer.datetime)).toFormat("yyyy-MM-dd'T'HH:mm''")}
			onChange={e => setAnswer({ ...answer, datetime: new Date(e.target.value).toISOString() })}
			borderColor="whiteAlpha.300"
		/>
	)
}

export default DateTimeQuestion
