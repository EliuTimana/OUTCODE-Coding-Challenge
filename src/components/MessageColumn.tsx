import {Message} from "../models";
import {MessageItem} from "./MessageItem";
import styled from 'styled-components'
export interface Props {
    messages: Message[]
}
const Column=styled.div`
        display: flex;
      flex-direction: column;
      margin-left: 5px;
      margin-right: 5px;
    `

export const MessageColumn = ({messages}: Props) => {
    return <Column>
        {messages.map((m, i) => <MessageItem message={m.message} priority={m.priority} key={i}/>)}
    </Column>
}