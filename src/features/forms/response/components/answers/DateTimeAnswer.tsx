import { DateTime } from "luxon"

import { Input } from "@chakra-ui/react"

import { iDateTimeAnswer } from "../../../../../models/Answer"
import { iDateTimeQuestion } from "../../../../../models/Question"
import { AnswerProps } from "../QuestionAnswer"

const DateTimeAnswer = ({ answer }: AnswerProps<iDateTimeQuestion, iDateTimeAnswer>) => {
	return (
		<Input
			defaultValue={
				answer
					? DateTime.fromJSDate(new Date(answer.datetime)).toFormat(
							"dd LLL yyyy, HH:mm:ss"
					  )
					: undefined
			}
			borderColor="whiteAlpha.300"
			onFocus={e => e.target.blur()}
			cursor="not-allowed"
		/>
	)
}

export default DateTimeAnswer
