import { Api } from 'telegram'
import CreateGroup from './create_group'

export interface CreateSupergroupParams {
	title: string
	about?: string
}

export default class CreateSupergroup extends CreateGroup {
	async createSupergroup({ title, about = '' }: CreateSupergroupParams) {
		return await this.client.invoke(
			new Api.channels.CreateChannel({ title, about, megagroup: true })
		)
	}
}
