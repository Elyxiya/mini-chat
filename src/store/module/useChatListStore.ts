import { defineStore } from 'pinia'
import type { ChatListItem } from '@/types/chatList'
import { group,privateList,create,deleteList } from '@/api/chatList'
export const useChatListStore = defineStore('list', {
  state: () => ({
     groupList: [] as ChatListItem[],
     privateList: [] as ChatListItem[],
     currentChat:{} as ChatListItem,
     cachedIds: new Set<string>(),
  }),
  actions: {
    async setGroup() {
      try  {
        const res = await group()
        if(res.code === 0) {
          this.groupList = res.data
        }
      } catch (error) {
        console.log(error)
      }
    },
     async setPrivate() {
      try  {
        const res = await privateList()
        if(res.code === 0) {
          this.privateList = res.data
          this.cachedIds = new Set(this.privateList.map(item => item.targetId));
        }
      } catch (error) {
        console.log(error)
      }
    },
    async createChat(param: string) {
       // 检查是否已存在相同ID的项
       if (this.cachedIds.has(param.targetId)) {
        console.log('ID已存在，取消创建请求');
        console.log(this.privateList.find(item => item.id === param));
        return false;
      }
      try  {
        const res = await create(param)
        if(res.code === 0) {
          this.privateList.push(res.data)
          this.cachedIds.add(res.data.targetId);
        }
      } catch (error) {
        console.log(error)
      }
    },
    
    async deleteChat(param: string,id:string) {
      try  {
        const res = await deleteList({chatListId:param})
        if(res.code === 0) {
           console.log(param)
          this.privateList = this.privateList.filter(item => item.id !== param)
          this.cachedIds.delete(id);
        }
      } catch (error) {
        console.log(error)
      }
    },
    setCurrentChat(chat: ChatListItem) {
      this.currentChat = chat
      
    }
  }
})