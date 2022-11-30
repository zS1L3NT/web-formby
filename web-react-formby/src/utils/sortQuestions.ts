import { WithTimestamps } from "../models"
import { iQuestion } from "../models/Question"

export default (_questions: WithTimestamps<iQuestion<any>>[]) => {
	const questions = <WithTimestamps<iQuestion<any>>[]>[]

	let previousQuestionId: string | null = null
	while (true) {
		const question = _questions.find(q => q.previous_question_id === previousQuestionId)
		if (!question) break

		questions.push(question)
		previousQuestionId = question.id
	}

	if (_questions.length !== questions.length) {
		return _questions
	} else {
		return questions
	}
}
