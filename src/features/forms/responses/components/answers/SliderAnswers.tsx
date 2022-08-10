import { iSliderAnswer } from "../../../../../models/Answer"
import { iSliderQuestion } from "../../../../../models/Question"
import ChartValueDisplay from "../ChartValueDisplay"
import { AnswersProps } from "../QuestionAnswers"

const SliderAnswers = ({
	question,
	answers,
	responses,
	users
}: AnswersProps<iSliderQuestion, iSliderAnswer>) => {
	const sliderSteps = (question.slider_max - question.slider_min) / question.slider_step + 1

	return (
		<ChartValueDisplay
			id={question.id}
			title="Slider Values"
			data={answers.map(answer => {
				const response = responses.find(response => response.id === answer.response_id)!
				const user = users.find(user => user.id === response.user_id)

				return {
					value: answer.slider + "",
					response,
					user: user ?? null
				}
			})}
			values={Array.from(Array(sliderSteps)).map(
				(_, i) => question.slider_min + i * question.slider_step + ""
			)}
			getModalHeader={value => `Responses with ${value} selected`}
		/>
	)
}

export default SliderAnswers
