import { ModelWithTimestamps, WithTimestamps } from "./"

export type iQuestionType =
	| "text"
	| "paragraph"
	| "color"
	| "choice"
	| "switch"
	| "slider"
	| "rating"
	| "datetime"
	| "table"

export type iFormData = {
	id: string
	user_id: string
	name: string
	description: string
	requires_auth: boolean
	live: boolean
}

export default class Form extends ModelWithTimestamps {
	constructor(
		id: string,
		public userId: string,
		public name: string,
		public description: string,
		public requiresAuth: boolean,
		public live: boolean,
		createdAt: string,
		updatedAt: string
	) {
		super(id, createdAt, updatedAt)
	}

	static fromJson(json: WithTimestamps<iFormData>): Form {
		return new Form(
			json.id,
			json.user_id,
			json.name,
			json.description,
			json.requires_auth,
			json.live,
			json.created_at,
			json.updated_at
		)
	}

	toJson(): iFormData {
		return {
			id: this.id,
			user_id: this.userId,
			name: this.name,
			description: this.description,
			requires_auth: this.requiresAuth,
			live: this.live
		}
	}
}
