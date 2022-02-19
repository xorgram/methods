import { Api } from 'telegram'
import DeleteSupergroup from './delete_supergroup'

export interface DeleteUserHistoryParams {
	chatId: Api.TypeEntityLike
	userId: Api.TypeEntityLike
}

export default class DeleteUserHistory extends DeleteSupergroup {
	async deleteUserHistory({ chatId, userId }: DeleteUserHistoryParams) {
		const r = await this.client.invoke(
			new Api.channels.DeleteParticipantHistory({
				channel: await this.client.getEntity(chatId),
				participant: await this.client.getEntity(userId)
			})
		)

		return Boolean(r.ptsCount)
	}
}
