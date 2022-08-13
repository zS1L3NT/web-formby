import { AnswersProps } from "../QuestionAnswers"
import TableValueDisplay from "../TableValueDisplay"

const TextAnswers = ({ answers, responses, users }: AnswersProps<"text">) => {
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
