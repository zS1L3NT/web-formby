import { Chart, registerables } from "chart.js"

import { iChoiceAnswer } from "../../../../../models/Answer"
import { iChoiceQuestion } from "../../../../../models/Question"
import ChartValueDisplay from "../ChartValueDisplay"
import { AnswersProps } from "../QuestionAnswers"

Chart.register(...registerables)

const ChoiceAnswers = ({
	question,
	answers,
	responses,
	users
}: AnswersProps<iChoiceQuestion, iChoiceAnswer>) => {
	return (
		<ChartValueDisplay
			id={question.id}
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
