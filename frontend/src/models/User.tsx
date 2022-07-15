export type iUserData = {
	id: string
	name: string
	email: string
	photo: string
	created_at: string
	updated_at: string
}

export default class User {
	constructor(
		public id: string,
		public name: string,
		public email: string,
		public photo: string,
		public createdAt: Date,
		public updatedAt: Date
	) {}

	static fromJson(json: iUserData) {
		return new User(
			json.id,
			json.name,
			json.email,
			json.photo,
			new Date(json.created_at),
			new Date(json.updated_at)
		)
	}

	toJson(): Omit<iUserData, "created_at" | "updated_at"> {
		return {
			id: this.id,
			name: this.name,
			email: this.email,
			photo: this.photo
		}
	}
}
