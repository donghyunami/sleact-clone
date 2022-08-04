import Chat from '@components/Chat';
import { IDM } from '@typings/db';
import React, { VFC } from 'react';
import { ChatZone } from './styles';

interface Props {
  chatData?: IDM[];
}

const CharList: VFC<Props> = ({ chatData }) => {
  console.log('chatData', chatData);
  return (
    <ChatZone>
      {chatData?.map((chat) => (
        <Chat key={chat.id} data={chat} />
      ))}
    </ChatZone>
  );
};

export default CharList;
