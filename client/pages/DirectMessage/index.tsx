import { Container, Header } from '@pages/DirectMessage/styles';
import fetcher from '@utils/fetcher';
import React, { useCallback, useState } from 'react';
import gravatar from 'gravatar';
import { useParams } from 'react-router';
import useSWR from 'swr';
import ChatList from '@components/ChatList';
import ChatBox from '@components/ChatBox';
import useInput from '@hooks/useInput';

const DirectMessage = () => {
  const { workspace, id } = useParams<{ workspace: string; id: string }>();

  // (워크스페이스에 초대된)유저 정보
  const { data: userData } = useSWR(
    `/api/workspaces/${workspace}/users/${id}`,
    fetcher,
  );

  // 내 정보 (채팅할 때 누가 누구에게 보내는 명시)
  const { data: myData } = useSWR(`/api/users`, fetcher);

  const [chat, onChangeChat] = useInput('');
  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    console.log('submit');
  }, []);

  if (userData) {
    console.log('userData', userData);
  }
  console.log();
  if (!userData || !myData) {
    return null;
  }

  return (
    <Container>
      <Header>
        <img
          src={gravatar.url(userData.email, { s: '24px', d: 'retro' })}
          alt={userData.nickname}
        />
        <span>{userData.nickname}</span>
      </Header>
      <ChatList />
      <ChatBox
        chat={chat}
        onChangeChat={onChangeChat}
        onSubmitForm={onSubmitForm}
      />
    </Container>
  );
};

export default DirectMessage;
