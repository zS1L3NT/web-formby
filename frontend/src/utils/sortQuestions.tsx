import { iQuestion } from "../models/Question"

export default (questions: iQuestion[]): iQuestion[] => {
	const sortedQuestions: iQuestion[] = []

	while (sortedQuestions.length < questions.length) {
		const previousQuestionId = sortedQuestions.at(-1)?.id ?? null
		const question = questions.find(
			question => question.previous_question_id === previousQuestionId
		)

		if (question) {
			sortedQuestions.push(question)
		} else {
			throw new Error("Could not find question with previous_question_id: " + previousQuestionId)
		}
	}

	return sortedQuestions
}
