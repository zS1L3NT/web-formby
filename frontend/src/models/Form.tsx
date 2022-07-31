export type iForm = {
	id: string
	user_id: string
	name: string
	description: string
	auth: boolean
	state: "draft" | "live" | "closed"
}
