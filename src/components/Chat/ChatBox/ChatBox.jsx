import React from 'react'
import Answer from './Supplyers/Answer'
import Reference from './Supplyers/Reference'
import Starter from './Supplyers/Starter'
import Question from './Supplyers/Question'
import Loading from './Loading/Loading'

function ChatBox() {
  return (
    <div
    className="w-full grid grid-cols-4" 
    id="chat"
    style={{ height: 'calc(100vh - 80px)',width: (windhtchat-10)+"px",position:'absolute',right:0,top:0,overflowY:'scroll'}}
    >
      <div className='col-span-1' style={{width: elementWidth+'px'}}></div>
      {/* relative */}
      <div className='col-span-3'>
    {  loading ? 
      <Loading />
    :
    <ul>
      {conversation && Object.entries(conversation).length == 0 ?
        <Starter />
      :
      <li ref={chatRef} id='chat-zeft' className="clearfix2 mt-4 px-10" style={{paddingTop:'90px'}}>

        { chatData && conversation && conversation.user_chats && 
          chatData.map((item,i)=>(
        <React.Fragment key={i}>
        
          <Question />

        <div className='relative'>
            <Reference />
            <Answer />
        </div>
        </React.Fragment>
        ))
        }
      </li>
      }
    </ul>
    }
    </div>
  </div>
  )
}

export default ChatBox