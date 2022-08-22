import { Container, Header } from '@pages/DirectMessage/styles';
import fetcher from '@utils/fetcher';
import React, { useCallback, useEffect, useRef } from 'react';
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
import useSocket from '@hooks/useSocket';
import { toast } from 'react-toastify';

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

  const [socket] = useSocket(workspace); // 소켓 연결하기
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
      if (chat?.trim() && chatData) {
        // console.log('메시지 전송');
        const savedChat = chat;
        mutateChat((prevChatData) => {
          // optimistic ui를 위해  mutate(ChatData) 변경
          prevChatData?.[0].unshift({
            id: (chatData[0][0]?.id || 0) + 1,
            content: savedChat,
            SenderId: myData.id,
            Sender: myData,
            ReceiverId: userData.id,
            Receiver: userData,
            createdAt: new Date(),
          });
          return prevChatData;
        }, false).then(() => {
          setChat('');
          // 채팅시 스크롤바 제일 아래로
          scrollbarRef.current?.scrollToBottom();
        });
        axios
          .post(`/api/workspaces/${workspace}/dms/${id}/chats`, {
            content: chat,
          })
          .then(() => {
            mutateChat(); // 서버측에 채팅을 등록하고 받아옴
          })
          .catch(console.error);
      }
    },
    [chat, chatData, myData, userData, workspace, id],
  );

  const onMessage = useCallback((data: IDM) => {
    if (data.SenderId === Number(id) && myData.id !== Number(id)) {
      mutateChat((chatData) => {
        chatData?.[0].unshift(data);
        return chatData;
      }, false).then(() => {
        if (scrollbarRef.current) {
          if (
            scrollbarRef.current.getScrollHeight() <
            scrollbarRef.current.getClientHeight() +
              scrollbarRef.current.getScrollTop() +
              150
          ) {
            console.log('scrollToBottom!', scrollbarRef.current?.getValues());
            setTimeout(() => {
              scrollbarRef.current?.scrollToBottom();
            }, 100);
          }
        }
      });
    }
  }, []);
  // DM 채팅하기
  useEffect(() => {
    socket?.on('dm', onMessage);
    return () => {
      socket?.off('em', onMessage);
    };
  }, [socket, onMessage]);

  // 로딩시 스크롤바 제일 아래로
  useEffect(() => {
    if (chatData?.length === 1) {
      scrollbarRef.current?.scrollToBottom();
    }
  }, [chatData]);

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
        scrollRef={scrollbarRef}
        setSize={setSize}
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
