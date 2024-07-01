import ChatContainer from '@/components/Chat/chatContainer/ChatContainer'
import Refrence from '@/components/Chat/reference/Refrence'
import Delete from '@/components/archive/settings/ChatSetting/Delete'
import Rename from '@/components/archive/settings/ChatSetting/Rename'
import { Share } from '@/components/archive/settings/ChatSetting/Share'
import React from 'react'
import { useSelector } from 'react-redux'

function DashLayout() {
  const open = useSelector(state => state.ShareSlice.open)

  return (
    <main >
        {/* <Refrence /> */}
        <ChatContainer />

        {/* {true &&
            <DeslikeAnswer />
          } */}
          {true &&
            <Rename />
          }
          {true &&
            <Delete />
          }
          {open &&
            <Share />
          }
    </main>
  )
}

export default DashLayout