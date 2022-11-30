import ChartValueDisplay from "../ChartValueDisplay"
import { AnswersProps } from "../QuestionAnswers"

const ChoiceAnswers = ({ question, answers, responses, users }: AnswersProps<"choice">) => {
	return (
		<ChartValueDisplay
			id={question.id}
			title="Choices"
			data={answers
				.map(answer => {
					const response = responses.find(response => response.id === answer.response_id)!
					const user = users.find(user => user.id === response.user_id)

					return answer.choices.map(choice => ({
						value: choice,
						user: user ?? null,
						response
					}))
				})
				.flat()}
			values={[...question.choices].sort()}
			getModalHeader={value => `Response with "${value}" selected`}
		/>
	)
}

export default ChoiceAnswers
