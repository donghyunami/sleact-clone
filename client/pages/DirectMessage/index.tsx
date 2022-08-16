import { Container, Header } from '@pages/DirectMessage/styles';
import fetcher from '@utils/fetcher';
import React, { useCallback, useRef } from 'react';
import gravatar from 'gravatar';
import { useParams } from 'react-router';
import ChatList from '@components/ChatList';
import ChatBox from '@components/ChatBox';
import useInput from '@hooks/useInput';
import axios from 'axios';
import { IDM } from '@typings/db';
import makeSection from '@utils/makeSection';
import Scrollbars from 'react-custom-scrollbars-2';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

const DirectMessage = () => {
  const { workspace, id } = useParams<{ workspace: string; id: string }>();

  // (워크스페이스에 초대된)유저 정보
  const { data: userData, error } = useSWR(
    `/api/workspaces/${workspace}/users/${id}`,
    fetcher,
  );

  // 내 정보 (채팅할 때 누가 누구에게 보내는 명시)
  const { data: myData } = useSWR(`/api/users`, fetcher);
  const [chat, onChangeChat, setChat] = useInput('');

  const {
    data: chatData,
    mutate: mutateChat,
    setSize,
  } = useSWRInfinite<IDM[]>(
    (index) =>
      `/api/workspaces/${workspace}/dms/${id}/chats?perPage=20&page=${
        index + 1
      }`,
    fetcher,
  );

  const scrollbarRef = useRef<Scrollbars>(null);
  const isEmpty = chatData?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty ||
    (chatData && chatData[chatData.length - 1]?.length < 20) ||
    false;

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      console.log('submit');
      console.log('chat', chat);
      if (chat?.trim()) {
        console.log('메시지 전송');
        axios
          .post(`/api/workspaces/${workspace}/dms/${id}/chats`, {
            content: chat,
          })
          .then(() => {
            mutateChat(); // 채팅을 등록하고 받아옴
            setChat(''); //채팅창 초기화
          })
          .catch(console.error);
      }
    },
    [chat, workspace, id, mutateChat, setChat],
  );

  if (error) {
    return <div>{error?.response.data}</div>;
  }

  if (chatData === undefined) {
    return <div>DM 메시지 불러오는중 ...</div>;
  }
  if (!userData || !myData) {
    return null;
  }

  const chatSections = makeSection(chatData ? chatData.flat().reverse() : []);

  return (
    <Container>
      <Header>
        <img
          src={gravatar.url(userData.email, { s: '24px', d: 'retro' })}
          alt={userData.nickname}
        />
        <span>{userData.nickname}</span>
      </Header>
      <ChatList
        chatSections={chatSections}
        ref={scrollbarRef}
        setSize={setSize}
        isEmpty={isEmpty}
        isReachingEnd={isReachingEnd}
      />
      <ChatBox
        chat={chat}
        onChangeChat={onChangeChat}
        onSubmitForm={onSubmitForm}
      />
    </Container>
  );
};

export default DirectMessage;
