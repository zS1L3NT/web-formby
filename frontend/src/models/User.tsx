import { ModelWithTimestamps, WithTimestamps } from "./"

export type iUserData = {
	id: string
	name: string
	email: string
	photo: string
}

export default class User extends ModelWithTimestamps {
	constructor(
		id: string,
		public name: string,
		public email: string,
		public photo: string,
		createdAt: string,
		updatedAt: string
	) {
		super(id, createdAt, updatedAt)
	}

	static fromJson(json: WithTimestamps<iUserData>) {
		return new User(
			json.id,
			json.name,
			json.email,
			json.photo,
			json.created_at,
			json.updated_at
		)
	}

	toJson(): iUserData {
		return {
			id: this.id,
			name: this.name,
			email: this.email,
			photo: this.photo
		}
	}
}
