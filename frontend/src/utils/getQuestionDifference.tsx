import { diff } from "deep-object-diff"

import { iChoiceQuestion, iQuestion, iSliderQuestion, iTableQuestion } from "../models/Question"

export default (old: iQuestion, new_: iQuestion) => {
	const difference: Record<string, any> = {}

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
				difference.choices = new_.choices ?? []
				difference.choice_type = new_.choice_type ?? "radio"
				break
			case "slider":
				difference.slider_min = new_.slider_min ?? 0
				difference.slider_step = new_.slider_step ?? 10
				difference.slider_max = new_.slider_max ?? 100
				break
			case "table":
				difference.table_columns = new_.table_columns ?? []
				difference.table_rows = new_.table_rows ?? []
				difference.table_type = new_.table_type ?? "radio"
				break
		}
	} else {
		switch (new_.type) {
			case "choice":
				const cnew = old as iChoiceQuestion

				if (Object.keys(diff(new_.choices ?? {}, cnew.choices ?? {})).length) {
					difference.choices = new_.choices
				}

				if (new_.choice_type !== cnew.choice_type) {
					difference.choice_type = new_.choice_type
				}
				break
			case "slider":
				const snew = old as iSliderQuestion

				if (new_.slider_min !== snew.slider_min) {
					difference.slider_min = new_.slider_min
				}

				if (new_.slider_step !== snew.slider_step) {
					difference.slider_step = new_.slider_step
				}

				if (new_.slider_max !== snew.slider_max) {
					difference.slider_max = new_.slider_max
				}
				break
			case "table":
				const tnew = old as iTableQuestion

				if (Object.keys(diff(new_.table_columns ?? {}, tnew.table_columns ?? {})).length) {
					difference.table_columns = new_.table_columns
				}

				if (Object.keys(diff(new_.table_rows ?? {}, tnew.table_rows ?? {})).length) {
					difference.table_rows = new_.table_rows
				}

				if (new_.table_type !== tnew.table_type) {
					difference.table_type = new_.table_type
				}
				break
		}
	}

	return difference
}
