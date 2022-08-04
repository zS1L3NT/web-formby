import { diff } from "deep-object-diff"

import { iChoiceQuestion, iQuestion, iSliderQuestion, iTableQuestion } from "../models/Question"

/**
 * Get the difference between two questions before updating the server.
 *
 * @param old Old Question
 * @param new_ New Question
 * @returns An object containing the difference between both questions
 */
export const getQuestionDifference = (old: iQuestion, new_: iQuestion) => {
	const difference = <Record<string, any>>{}

	if (new_.title !== old.title) {
		difference.title = new_.title
	}

	if (new_.description !== old.description) {
		difference.description = new_.description
	}

	if (new_.photo !== old.photo) {
		difference.photo = new_.photo
	}

	if (new_.required !== old.required) {
		difference.required = new_.required
	}

	if (new_.type !== old.type) {
		difference.type = new_.type

		switch (new_.type) {
			case "choice":
				difference.choices = new_.choices ?? ["Choice 1"]
				difference.choice_type = new_.choice_type ?? "radio"
				break
			case "slider":
				difference.slider_min = new_.slider_min ?? 0
				difference.slider_step = new_.slider_step ?? 10
				difference.slider_max = new_.slider_max ?? 100
				break
			case "table":
				difference.table_columns = new_.table_columns ?? ["Column 1"]
				difference.table_rows = new_.table_rows ?? ["Row 1"]
				difference.table_type = new_.table_type ?? "radio"
				break
		}
	} else {
		switch (new_.type) {
			case "choice":
				const cold = <iChoiceQuestion>old

				if (Object.keys(diff(new_.choices ?? {}, cold.choices ?? {})).length) {
					difference.choices = new_.choices
				}

				if (new_.choice_type !== cold.choice_type) {
					difference.choice_type = new_.choice_type
				}
				break
			case "slider":
				const sold = <iSliderQuestion>old

				if (new_.slider_min !== sold.slider_min) {
					difference.slider_min = new_.slider_min
				}

				if (new_.slider_step !== sold.slider_step) {
					difference.slider_step = new_.slider_step
				}

				if (new_.slider_max !== sold.slider_max) {
					difference.slider_max = new_.slider_max
				}
				break
			case "table":
				const told = <iTableQuestion>old

				if (Object.keys(diff(new_.table_columns ?? {}, told.table_columns ?? {})).length) {
					difference.table_columns = new_.table_columns
				}

				if (Object.keys(diff(new_.table_rows ?? {}, told.table_rows ?? {})).length) {
					difference.table_rows = new_.table_rows
				}

				if (new_.table_type !== told.table_type) {
					difference.table_type = new_.table_type
				}
				break
		}
	}

	return difference
}

/**
 * Assert that all questions are linked like a linked list
 *
 * @throws Error if the questions are not linked like a linked list
 * @param questions Questions to check if they are a linked list
 */
export const assertLinkedQuestions = (questions: iQuestion[]) => {
	for (let i = 0; i < questions.length; i++) {
		const previousQuestionId = questions[i - 1]?.id ?? null
		if (!questions.find(question => question.previous_question_id === previousQuestionId)) {
			throw new Error(
				`Could not find question with previous_question_id: ${previousQuestionId} (i: ${i})`
			)
		}
	}
}

/**
 * Creates a duplicate of the question for the server
 *
 * @param question Question to create a duplicate of
 * @returns Duplicate of the quetion
 */
export const createDuplicate = (question: iQuestion) => {
	const duplicateQuestion = <Omit<iQuestion, "id">>{
		form_id: question.form_id,
		previous_question_id: question.id,
		title: question.title,
		description: question.description,
		photo: question.photo,
		required: question.required,
		type: question.type
	}

	if (question.type === "choice") {
		const duplicateChoiceQuestion = <Omit<iChoiceQuestion, "id">>duplicateQuestion
		duplicateChoiceQuestion.choices = [...question.choices]
		duplicateChoiceQuestion.choice_type = question.choice_type
	}

	if (question.type === "slider") {
		const duplicateSliderQuestion = <Omit<iSliderQuestion, "id">>duplicateQuestion
		duplicateSliderQuestion.slider_min = question.slider_min
		duplicateSliderQuestion.slider_step = question.slider_step
		duplicateSliderQuestion.slider_max = question.slider_max
	}

	if (question.type === "table") {
		const duplicateTableQuestion = <Omit<iTableQuestion, "id">>duplicateQuestion
		duplicateTableQuestion.table_columns = [...question.table_columns]
		duplicateTableQuestion.table_rows = [...question.table_rows]
		duplicateTableQuestion.table_type = question.table_type
	}

	return duplicateQuestion
}
