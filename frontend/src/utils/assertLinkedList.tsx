import { iQuestion } from "../models/Question"

export default (questions: iQuestion[]) => {
	for (let i = 0; i < questions.length; i++) {
		const previousQuestionId = questions[i - 1]?.id ?? null
		if (!questions.find(question => question.previous_question_id === previousQuestionId)) {
			throw new Error(
				`Could not find question with previous_question_id: ${previousQuestionId} (i: ${i})`
			)
		}
	}
}
