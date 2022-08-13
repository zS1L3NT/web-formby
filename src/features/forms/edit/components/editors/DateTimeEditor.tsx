import { DateTime } from "luxon"

import { Input } from "@chakra-ui/react"

import { iDateTimeQuestion } from "../../../../../models/Question"
import { EditorProps } from "../QuestionEditor"

const DateTimeEditor = ({}: EditorProps<iDateTimeQuestion>) => {
	return (
		<Input
			disabled={true}
			type="datetime-local"
			value={DateTime.fromJSDate(new Date()).toFormat("yyyy-MM-dd'T'HH:mm''")}
			borderColor="var(--chakra-colors-chakra-border-color)"
		/>
	)
}

export default DateTimeEditor
