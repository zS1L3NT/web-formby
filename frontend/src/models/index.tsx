export type WithTimestamps<T> = T & {
	created_at: string
	updated_at: string
}

export abstract class ModelWithTimestamps {
	public createdAt: Date
	public updatedAt: Date

	constructor(public id: string, createdAt: string, updatedAt: string) {
		this.createdAt = new Date(createdAt)
		this.updatedAt = new Date(updatedAt)
	}
}
