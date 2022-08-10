import { iTextAnswer } from "../../../../../models/Answer"
import { iTextQuestion } from "../../../../../models/Question"
import { AnswersProps } from "../QuestionAnswers"
import TableValueDisplay from "../TableValueDisplay"

const TextAnswers = ({ answers, responses, users }: AnswersProps<iTextQuestion, iTextAnswer>) => {
	return (
		<TableValueDisplay
			answers={answers}
			responses={responses}
			users={users}
			columnHeader="Text"
			getDataColumn={answer => <>{answer.text}</>}
		/>
	)
}

export default TextAnswers
