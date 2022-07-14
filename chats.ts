import { Api } from "$grm";
import { bigInt } from "$deps";

import ClientHolder from "./client_holder.ts";

export interface AddChatMembersParams {
  chatId: Api.TypeEntityLike;
  userId: Api.TypeEntityLike | Api.TypeEntityLike[];
  forwardLimit?: number;
}

export interface ArchiveChatsParams {
  chatIds: Api.TypeEntityLike | Api.TypeEntityLike[];
}

export interface BanChatMemberParams {
  chatId: Api.TypeEntityLike;
  userId: Api.TypeEntityLike;
  untilDate?: number;
}

export interface CreateChannelParams {
  title: string;
  about?: string;
}

export interface CreateGroupParams {
  title: string;
  users: Api.TypeEntityLike | Api.TypeEntityLike[];
}

export interface CreateSupergroupParams {
  title: string;
  about?: string;
}

export interface DeleteChannelParams {
  chatId: Api.TypeEntityLike;
}

export interface DeleteChatPhotoParams {
  chatId: Api.TypeEntityLike;
}

export interface DeleteSupergroupParams {
  chatId: Api.TypeEntityLike;
}

export interface DeleteUserHistoryParams {
  chatId: Api.TypeEntityLike;
  userId: Api.TypeEntityLike;
}

export interface GetChatMemberParams {
  chatId: Api.TypeEntityLike;
  userId: Api.TypeEntityLike;
}

export interface PinChatMessageParams {
  /** Unique identifier or username of the target chat. Can be number | string | bigint */
  chatId: Api.TypeEntityLike;
  /** Identifier of a message to pin. */
  messageId: number;
  /**
   * Pass True, if it is not necessary to send a notification to all chat members about the new pinned message.
   * Notifications are always disabled in channels.
   */
  disableNotification?: boolean;
  /**
   * Pass True to pin the message for both sides (you and recipient).
   * Applicable to private chats only. Defaults to False.
   */
  bothSides?: boolean;
}
export interface PromoteChatMemberParams {
  chatId: Api.TypeEntityLike;
  userId: Api.TypeEntityLike;
  isAnonymous?: boolean;
  canManageChat?: boolean;
  canChangeInfo?: boolean;
  canPostMessages?: boolean;
  canEditMessages?: boolean;
  canDeleteMessages?: boolean;
  canRestrictMembers?: boolean;
  canInviteUsers?: boolean;
  canPinMessages?: boolean;
  canPromoteMembers?: boolean;
  canManageCalls?: boolean;
  rank?: string;
}

export interface UnbanChatMemberParmas {
  chatId: Api.TypeEntityLike;
  userId: Api.TypeEntityLike;
}

export interface UnpinChatMessageParams {
  /** Unique identifier or username of the target chat. Can be number | string | bigint */
  chatId: Api.TypeEntityLike;
  /** Identifier of a message to unpin. */
  messageId: number;
}

export default class Chats extends ClientHolder {
  async addChatMembers({
    chatId,
    userId,
    forwardLimit = 100,
  }: AddChatMembersParams) {
    const chatEntity = await this.client.getEntity(chatId);
    if (!Array.isArray(userId)) {
      userId = [userId];
    }
    if (chatEntity instanceof Api.Chat) {
      for (const user of userId) {
        await this.client.invoke(
          new Api.messages.AddChatUser({
            chatId: chatEntity.id,
            userId: await this.client.getEntity(user),
            fwdLimit: forwardLimit,
          }),
        );
      }
    } else {
      await this.client.invoke(
        new Api.channels.InviteToChannel({
          channel: chatEntity,
          users: await Promise.all(
            userId.map(async (user) => await this.client.getEntity(user)),
          ),
        }),
      );
    }
    return true;
  }

  async archiveChats({ chatIds }: ArchiveChatsParams) {
    if (!Array.isArray(chatIds)) {
      chatIds = [chatIds];
    }
    const folderPeers = new Array<Api.InputFolderPeer>();
    for (const chat of chatIds) {
      folderPeers.push(
        new Api.InputFolderPeer({
          peer: await this.client.getInputEntity(chat),
          folderId: 1,
        }),
      );
    }
    await this.client.invoke(new Api.folders.EditPeerFolders({ folderPeers }));
    return true;
  }

  async banChatMember({ chatId, userId, untilDate = 0 }: BanChatMemberParams) {
    const userEntity = await this.client.getEntity(userId);
    const chatEntity = await this.client.getEntity(chatId);
    if (chatEntity instanceof Api.Channel) {
      await this.client.invoke(
        new Api.channels.EditBanned({
          channel: chatEntity,
          participant: userEntity,
          bannedRights: new Api.ChatBannedRights({
            untilDate,
            viewMessages: true,
            sendMessages: true,
            sendMedia: true,
            sendStickers: true,
            sendGifs: true,
            sendGames: true,
            sendInline: true,
            embedLinks: true,
          }),
        }),
      );
    } else {
      await this.client.invoke(
        new Api.messages.DeleteChatUser({
          chatId: bigInt(<number> chatId),
          userId: userEntity,
        }),
      );
    }
    return true;
  }

  async createChannel({ title, about = "" }: CreateChannelParams) {
    return await this.client.invoke(
      new Api.channels.CreateChannel({ title, about, broadcast: true }),
    );
  }

  async createGroup({ title, users }: CreateGroupParams) {
    if (!Array.isArray(users)) {
      users = [users];
    }
    return await this.client.invoke(
      new Api.messages.CreateChat({ title, users }),
    );
  }

  async createSupergroup({ title, about = "" }: CreateSupergroupParams) {
    return await this.client.invoke(
      new Api.channels.CreateChannel({ title, about, megagroup: true }),
    );
  }

  async deleteChannel({ chatId }: DeleteChannelParams) {
    await this.client.invoke(
      new Api.channels.DeleteChannel({
        channel: await this.client.getEntity(chatId),
      }),
    );
    return true;
  }

  async deleteChatPhoto({ chatId }: DeleteChatPhotoParams) {
    const chatEntity = await this.client.getEntity(chatId);
    if (chatEntity instanceof Api.Chat) {
      await this.client.invoke(
        new Api.messages.EditChatPhoto({
          chatId: chatEntity.id,
          photo: new Api.InputChatPhotoEmpty(),
        }),
      );
    } else if (chatEntity instanceof Api.Channel) {
      await this.client.invoke(
        new Api.channels.EditPhoto({
          channel: chatEntity,
          photo: new Api.InputChatPhotoEmpty(),
        }),
      );
    } else {
      throw new Error("Provided entity belongs to user");
    }
    return true;
  }

  async deleteSupergroup({ chatId }: DeleteSupergroupParams) {
    await this.client.invoke(
      new Api.channels.DeleteChannel({
        channel: await this.client.getEntity(chatId),
      }),
    );
    return true;
  }

  async deleteUserHistory({ chatId, userId }: DeleteUserHistoryParams) {
    const r = await this.client.invoke(
      new Api.channels.DeleteParticipantHistory({
        channel: await this.client.getEntity(chatId),
        participant: await this.client.getEntity(userId),
      }),
    );
    return Boolean(r.ptsCount);
  }

  async getChatMember({ chatId, userId }: GetChatMemberParams) {
    const chat = await this.client.getEntity(chatId);
    const user = await this.client.getEntity(userId);
    if (chat instanceof Api.Channel) {
      return (
        await this.client.invoke(
          new Api.channels.GetParticipant({ channel: chat, participant: user }),
        )
      ).participant;
    } else if (chat instanceof Api.Chat) {
      const fullChat = await this.client.invoke(
        new Api.messages.GetFullChat({ chatId: chat.id }),
      );
      const members = fullChat.users;
      return members.find((v) => v.id == user.id);
    } else {
      throw new Error(`The chatId "${chatId}" belongs to a user`);
    }
  }

  /**
   * Pin a message in a group, channel or your own chat.
   * You must be an administrator in the chat for this to work and must have the "can_pin_messages" admin right in the supergroup or "can_edit_messages" admin right in the channel.
   */
  async pinChatMessage({
    chatId,
    messageId,
    bothSides = false,
    disableNotification = false,
  }: PinChatMessageParams) {
    return await this.client.invoke(
      new Api.messages.UpdatePinnedMessage({
        peer: await this.client.getEntity(chatId),
        id: messageId,
        silent: disableNotification,
        pmOneside: !bothSides,
      }),
    );
  }

  async promoteChatMember({
    chatId,
    userId,
    isAnonymous = false,
    canManageChat = true,
    canChangeInfo = false,
    canPostMessages = false,
    canEditMessages = false,
    canDeleteMessages = false,
    canRestrictMembers = false,
    canInviteUsers = false,
    canPinMessages = false,
    canPromoteMembers = false,
    canManageCalls = false,
    rank = "Admin",
  }: PromoteChatMemberParams) {
    return await this.client.invoke(
      new Api.channels.EditAdmin({
        userId: await this.client.getEntity(userId),
        channel: await this.client.getEntity(chatId),
        rank: rank,
        adminRights: new Api.ChatAdminRights({
          anonymous: isAnonymous,
          changeInfo: canChangeInfo,
          postMessages: canPostMessages,
          editMessages: canEditMessages,
          deleteMessages: canDeleteMessages,
          banUsers: canRestrictMembers,
          inviteUsers: canInviteUsers,
          pinMessages: canPinMessages,
          addAdmins: canPromoteMembers,
          manageCall: canManageCalls,
          other: canManageChat,
        }),
      }),
    );
  }

  async unbanChatMember({ chatId, userId }: UnbanChatMemberParmas) {
    const chat = await this.client.getEntity(chatId);
    const user = await this.client.getEntity(userId);

    if (chat instanceof Api.Channel) {
      await this.client.invoke(
        new Api.channels.EditBanned({
          channel: chat,
          participant: user,
          bannedRights: new Api.ChatBannedRights({ untilDate: 0 }),
        }),
      );
    }

    return true;
  }

  /**
   * Unpin a message in a group, channel or your own chat.
   * You must be an administrator in the chat for this to work and must have the "can_pin_messages" admin right in the supergroup or "can_edit_messages" admin right in the channel.
   */
  async unpinChatMessage({ chatId, messageId }: UnpinChatMessageParams) {
    return await this.client.invoke(
      new Api.messages.UpdatePinnedMessage({
        peer: await this.client.getEntity(chatId),
        id: messageId,
        unpin: true,
      }),
    );
  }
}
