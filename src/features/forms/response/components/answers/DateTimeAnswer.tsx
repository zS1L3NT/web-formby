import { DateTime } from "luxon"

import { Input } from "@chakra-ui/react"

import { AnswerProps } from "../QuestionAnswer"

const DateTimeAnswer = ({ answer }: AnswerProps<"datetime">) => {
	return (
		<Input
			defaultValue={
				answer
					? DateTime.fromJSDate(new Date(answer.datetime)).toFormat(
							"dd LLL yyyy, HH:mm:ss"
					  )
					: undefined
			}
			borderColor="var(--chakra-colors-chakra-border-color)"
			onFocus={e => e.target.blur()}
			cursor="not-allowed"
		/>
	)
}

export default DateTimeAnswer
