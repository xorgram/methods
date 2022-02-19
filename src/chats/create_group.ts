import { Api } from 'telegram'
import CreateChannel from './create_channel'

export interface CreateGroupParams {
	title: string
	users: Api.TypeEntityLike | Api.TypeEntityLike[]
}

export default class CreateGroup extends CreateChannel {
	createGroup({ title, users }: CreateGroupParams) {
		if (!Array.isArray(users)) {
			users = [users]
		}
		return this.client.invoke(new Api.messages.CreateChat({ title, users }))
	}
}
