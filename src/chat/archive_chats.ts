import { Api } from 'telegram'
import { EntityLike } from 'telegram/define'
import AddChatMembers from './add_chat_members'

export interface ArchiveChatsParams {
	chatIds: EntityLike | EntityLike[]
}

export default class ArchiveChats extends AddChatMembers {
	async archiveChats({ chatIds }: ArchiveChatsParams) {
		if (!Array.isArray(chatIds)) {
			chatIds = [chatIds]
		}

		const folder: Api.InputFolderPeer[] = []

		for (const chat of chatIds) {
			folder.push(
				new Api.InputFolderPeer({
					peer: await this.client.getInputEntity(chat),
					folderId: 1
				})
			)
		}

		await this.client.invoke(
			new Api.folders.EditPeerFolders({ folderPeers: folder })
		)
		return true
	}
}
