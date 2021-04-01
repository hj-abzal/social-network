import React, {ChangeEvent} from 'react';
import s from './Messages.module.css';
import state, {MessagesDataType} from "../../../../redux/state";

type messagesPropsType = {
    messegeData: MessagesDataType[]
    sendMessage: () => void
    newMessage: string
    updateMessageText: (newMessage: string) => void
}

const Messages = (props: messagesPropsType) => {
    let messegedata = props.messegeData.map(message => <Message key={message.id} message={message}/>)

    const sendMessage = () => {
    props.sendMessage();

    }
    const onChangeHandler = (e:ChangeEvent<HTMLTextAreaElement>) => {
        props.updateMessageText(e.currentTarget.value)
    }
debugger
    return (
        <div className={s.dialogs}>

            <div className={s.messages}>
                {messegedata}
            </div>
            <div>
                <textarea onChange={onChangeHandler} value={props.newMessage}/>
                <button onClick={sendMessage}> sent message</button>
            </div>

        </div>
    )
}


type MessagePropsType = {
    message: MessagesDataType
}

function Message(props: MessagePropsType) {


    return (
        <div className={s.wrapper}>
            <img className={s.avatar} src={props.message.avatar} alt="avatar"/>
            <div className={s.angle}></div>
            <div className={s.item}>
                <div className={s.name}>{props.message.name}</div>
                <div className={s.text}>{props.message.message}</div>
                <div className={s.time}>{props.message.time}</div>
            </div>
        </div>
    )
}


export default Messages;