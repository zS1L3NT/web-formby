import { DateTime } from "luxon"

import { Input } from "@chakra-ui/react"

import { InputProps } from "../QuestionInput"

const DateTimeInput = ({ answer, setAnswer }: InputProps<"datetime">) => {
	return (
		<Input
			type="datetime-local"
			value={DateTime.fromJSDate(new Date(answer.datetime)).toFormat("yyyy-MM-dd'T'HH:mm''")}
			onChange={e =>
				setAnswer({ ...answer, datetime: new Date(e.target.value).toISOString() })
			}
			borderColor="var(--chakra-colors-chakra-border-color)"
		/>
	)
}

export default DateTimeInput
