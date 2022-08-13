import { diff } from "deep-object-diff"

import { iQuestionType } from "../models"
import { iQuestion } from "../models/Question"

/**
 * Get the difference between two questions before updating the server.
 *
 * @param old Old Question
 * @param new_ New Question
 * @returns An object containing the difference between both questions
 */
export const getQuestionDifference = <T extends iQuestionType>(
	old: iQuestion<T>,
	new_: iQuestion<T>
) => {
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
				const cnew = <iQuestion<"choice">>(<unknown>new_)

				difference.choices = cnew.choices ?? ["Choice 1"]
				difference.choice_type = cnew.choice_type ?? "radio"
				break
			case "slider":
				const snew = <iQuestion<"slider">>(<unknown>new_)

				difference.slider_min = snew.slider_min ?? 0
				difference.slider_step = snew.slider_step ?? 10
				difference.slider_max = snew.slider_max ?? 100
				break
			case "table":
				const tnew = <iQuestion<"table">>(<unknown>new_)

				difference.table_columns = tnew.table_columns ?? ["Column 1"]
				difference.table_rows = tnew.table_rows ?? ["Row 1"]
				difference.table_type = tnew.table_type ?? "radio"
				break
		}
	} else {
		switch (new_.type) {
			case "choice":
				const cold = <iQuestion<"choice">>(<unknown>old)
				const cnew = <iQuestion<"choice">>(<unknown>new_)

				if (Object.keys(diff(cnew.choices ?? {}, cold.choices ?? {})).length) {
					difference.choices = cnew.choices
				}

				if (cnew.choice_type !== cold.choice_type) {
					difference.choice_type = cnew.choice_type
				}
				break
			case "slider":
				const sold = <iQuestion<"slider">>(<unknown>old)
				const snew = <iQuestion<"slider">>(<unknown>new_)

				if (snew.slider_min !== sold.slider_min) {
					difference.slider_min = snew.slider_min
				}

				if (snew.slider_step !== sold.slider_step) {
					difference.slider_step = snew.slider_step
				}

				if (snew.slider_max !== sold.slider_max) {
					difference.slider_max = snew.slider_max
				}
				break
			case "table":
				const told = <iQuestion<"table">>(<unknown>old)
				const tnew = <iQuestion<"table">>(<unknown>new_)

				if (Object.keys(diff(tnew.table_columns ?? {}, told.table_columns ?? {})).length) {
					difference.table_columns = tnew.table_columns
				}

				if (Object.keys(diff(tnew.table_rows ?? {}, told.table_rows ?? {})).length) {
					difference.table_rows = tnew.table_rows
				}

				if (tnew.table_type !== told.table_type) {
					difference.table_type = tnew.table_type
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
export const assertLinkedQuestions = (questions: iQuestion<any>[]) => {
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
export const createDuplicate = <T extends iQuestionType>(question: iQuestion<T>) => {
	const dq = <Omit<iQuestion<T>, "id">>{
		form_id: question.form_id,
		previous_question_id: question.id,
		title: question.title,
		description: question.description,
		photo: question.photo,
		required: question.required,
		type: question.type
	}

	if (question.type === "choice") {
		const dcq = <Omit<iQuestion<"choice">, "id">>(<unknown>dq)
		const cq = <iQuestion<"choice">>(<unknown>question)

		dcq.choices = [...cq.choices]
		dcq.choice_type = cq.choice_type
	}

	if (question.type === "slider") {
		const dsq = <Omit<iQuestion<"slider">, "id">>(<unknown>dq)
		const sq = <iQuestion<"slider">>(<unknown>question)

		dsq.slider_min = sq.slider_min
		dsq.slider_step = sq.slider_step
		dsq.slider_max = sq.slider_max
	}

	if (question.type === "table") {
		const dtq = <Omit<iQuestion<"table">, "id">>(<unknown>dq)
		const tq = <iQuestion<"table">>(<unknown>question)

		dtq.table_columns = [...tq.table_columns]
		dtq.table_rows = [...tq.table_rows]
		dtq.table_type = tq.table_type
	}

	return dq
}
