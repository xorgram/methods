import { TelegramClient, Api } from 'telegram'
import { EntityLike } from 'telegram/define'

export interface DeleteChatPhoto {
	chatId: EntityLike
}

export async function deleteChatPhoto(
	client: TelegramClient,
	{ chatId }: DeleteChatPhoto
) {
	const chatEntity = await client.getEntity(chatId)

	if (chatEntity instanceof Api.Chat) {
		await client.invoke(
			new Api.messages.EditChatPhoto({
				chatId: chatEntity.id,
				photo: new Api.InputChatPhotoEmpty()
			})
		)
	} else if (chatEntity instanceof Api.Channel) {
		await client.invoke(
			new Api.channels.EditPhoto({
				channel: chatEntity,
				photo: new Api.InputChatPhotoEmpty()
			})
		)
	} else {
		throw new Error('Provided entity belongs to user')
	}

	return true
}
