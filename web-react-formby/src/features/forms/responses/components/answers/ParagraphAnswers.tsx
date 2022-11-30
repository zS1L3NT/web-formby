import { AnswersProps } from "../QuestionAnswers"
import TableValueDisplay from "../TableValueDisplay"

const ParagraphAnswers = ({ answers, responses, users }: AnswersProps<"paragraph">) => {
	return (
		<TableValueDisplay
			answers={answers}
			responses={responses}
			users={users}
			columnHeader="Paragraph"
			getDataColumn={answer => <>{answer.paragraph}</>}
		/>
	)
}

export default ParagraphAnswers
