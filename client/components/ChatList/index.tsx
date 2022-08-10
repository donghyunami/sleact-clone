import Chat from '@components/Chat';
import { IDM } from '@typings/db';
import React, { useCallback, useRef, VFC } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { ChatZone } from './styles';

interface Props {
  chatData?: IDM[];
}

const CharList: VFC<Props> = ({ chatData }) => {
  const scrollbarRef = useRef(null);
  const onScroll = useCallback(() => {}, []);
  console.log('chatData', chatData);
  return (
    <ChatZone>
      <Scrollbars autoHide ref={scrollbarRef} onScrollFrame={onScroll}>
        {chatData?.map((chat) => (
          <Chat key={chat.id} data={chat} />
        ))}
      </Scrollbars>
    </ChatZone>
  );
};

export default CharList;
