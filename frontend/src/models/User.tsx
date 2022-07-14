export type iUserData = {
	id: string
	name: string
	email: string
	photo: string
	created_at: string
	updated_at: string
}

export default class User {
	public id: string
	public name: string
	public email: string
	public photo: string
	public createdAt: Date
	public updatedAt: Date

	constructor(
		id: string,
		name: string,
		email: string,
		photo: string,
		createdAt: Date,
		updatedAt: Date
	) {
		this.id = id
		this.name = name
		this.email = email
		this.photo = photo
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	static fromJson(json: any) {
		return new User(
			json.id,
			json.name,
			json.email,
			json.photo,
			new Date(json.created_at),
			new Date(json.updated_at)
		)
	}

	toJson() {
		return {
			id: this.id,
			name: this.name,
			email: this.email,
			photo: this.photo
		}
	}
}
