import { iSwitchAnswer } from "../../../../../models/Answer"
import { iSwitchQuestion } from "../../../../../models/Question"
import ChartValueDisplay from "../ChartValueDisplay"
import { AnswersProps } from "../QuestionAnswers"

const SwitchAnswers = ({
	question,
	answers,
	responses,
	users
}: AnswersProps<iSwitchQuestion, iSwitchAnswer>) => {
	return (
		<ChartValueDisplay
			id={question.id}
			data={answers.map(answer => {
				const response = responses.find(response => response.id === answer.response_id)!
				const user = users.find(user => user.id === response.user_id)

				return {
					value: answer.switch ? "Enabled" : "Disabled",
					response,
					user: user ?? null
				}
			})}
			values={["Enabled", "Disabled"]}
			getModalHeader={value => `Responses with "${value}" chosen`}
		/>
	)
}

export default SwitchAnswers
