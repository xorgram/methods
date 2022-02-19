import { Api } from 'telegram'
import AddChatMembers from './add_chat_members'

export interface ArchiveChatsParams {
	chatIds: Api.TypeEntityLike | Api.TypeEntityLike[]
}

export default class ArchiveChats extends AddChatMembers {
	async archiveChats({ chatIds }: ArchiveChatsParams) {
		if (!Array.isArray(chatIds)) {
			chatIds = [chatIds]
		}
		const folderPeers = new Array<Api.InputFolderPeer>()
		for (const chat of chatIds) {
			folderPeers.push(
				new Api.InputFolderPeer({
					peer: await this.client.getInputEntity(chat),
					folderId: 1
				})
			)
		}
		await this.client.invoke(new Api.folders.EditPeerFolders({ folderPeers }))
		return true
	}
}
