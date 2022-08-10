import { DateTime } from "luxon"

import { iDateTimeAnswer } from "../../../../../models/Answer"
import { iDateTimeQuestion } from "../../../../../models/Question"
import { AnswersProps } from "../QuestionAnswers"
import TableValueDisplay from "../TableValueDisplay"

const DateTimeAnswers = ({
	answers,
	responses,
	users
}: AnswersProps<iDateTimeQuestion, iDateTimeAnswer>) => {
	return (
		<TableValueDisplay
			answers={answers}
			responses={responses}
			users={users}
			columnHeader="Date (Response)"
			getDataColumn={answer => (
				<>{DateTime.fromISO(answer.datetime).toFormat("dd LLL yyyy, HH:mm:ss")}</>
			)}
		/>
	)
}

export default DateTimeAnswers
