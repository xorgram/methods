import { TelegramClient, Api } from 'telegram'
import { EntityLike } from 'telegram/define'

export interface ArchiveChats {
	chatIds: EntityLike | EntityLike[]
}

export async function archiveChats(
	client: TelegramClient,
	{ chatIds }: ArchiveChats
) {
	if (!Array.isArray(chatIds)) {
		chatIds = [chatIds]
	}

	const folder: Api.InputFolderPeer[] = []

	for (const chat of chatIds) {
		folder.push(
			new Api.InputFolderPeer({
				peer: await client.getInputEntity(chat),
				folderId: 1
			})
		)
	}

	await client.invoke(new Api.folders.EditPeerFolders({ folderPeers: folder }))
	return true
}
