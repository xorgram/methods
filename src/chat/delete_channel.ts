import { Api } from 'telegram'
import CreateSupergroup from './create_supergroup'

export interface DeleteChannelParams {
	chatId: Api.TypeEntityLike
}

export default class DeleteChannel extends CreateSupergroup {
	async deleteChannel({ chatId }: DeleteChannelParams) {
		await this.client.invoke(
			new Api.channels.DeleteChannel({
				channel: await this.client.getEntity(chatId)
			})
		)

		return true
	}
}
