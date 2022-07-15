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
	created_at: string
	updated_at: string
}

export default class Form {
	constructor(
		public id: string,
		public userId: string,
		public name: string,
		public description: string,
		public requiresAuth: boolean,
		public live: boolean,
		public createdAt: Date,
		public updatedAt: Date
	) {}

	static fromJson(json: iFormData): Form {
		return new Form(
			json.id,
			json.user_id,
			json.name,
			json.description,
			json.requires_auth,
			json.live,
			new Date(json.created_at),
			new Date(json.updated_at)
		)
	}

	toJson(): Omit<iFormData, "created_at" | "updated_at"> {
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
