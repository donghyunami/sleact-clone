import ChatBox from '@components/ChatBox';
import ChatList from '@components/ChatList';
import InviteChannelModal from '@components/InviteChannelModal';
import useInput from '@hooks/useInput';
import useSocket from '@hooks/useSocket';
import { Container, DragOver, Header } from '@pages/Channel/styles';
import { IChannel, IChat, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import makeSection from '@utils/makeSection';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState, VFC } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { useParams } from 'react-router';
import { Redirect } from 'react-router-dom';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

const PAGE_SIZE = 20;
const Channel = () => {
  const { workspace, channel } = useParams<{
    workspace: string;
    channel: string;
  }>();
  const { data: userData } = useSWR(`/api/users`, fetcher);
  const { data: channelsData } = useSWR<IChannel[]>(
    `/api/workspaces/${workspace}/channels`,
    fetcher,
  );
  const channelData = channelsData?.find((v) => v.name === channel);
  const {
    data: chatData,
    mutate: mutateChat,
    setSize,
  } = useSWRInfinite<IChat[]>(
    (index: number) =>
      `/api/workspaces/${workspace}/channels/${channel}/chats?perPage=${PAGE_SIZE}&page=${
        index + 1
      }`,
    fetcher,
    {
      onSuccess(data) {
        if (data?.length === 1) {
          setTimeout(() => {
            scrollbarRef.current?.scrollToBottom();
          }, 100);
        }
      },
    },
  );

  const { data: channelMembersData } = useSWR<IUser[]>(
    userData
      ? `/api/workspaces/${workspace}/channels/${channel}/members`
      : null,
    fetcher,
  );

  const [showInviteChannelModal, setShowInviteChannelModal] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [chat, onChangeChat, setChat] = useInput('');
  const [socket] = useSocket(workspace); // 소켓 연결를 위한
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
      if (chat?.trim() && chatData && channelData) {
        // console.log('메시지 전송');
        const savedChat = chat;
        mutateChat((prevChatData) => {
          // optimistic ui를 위해  mutate(ChatData) 변경
          prevChatData?.[0].unshift({
            id: (chatData[0][0]?.id || 0) + 1,
            content: savedChat,
            UserId: userData.id,
            User: userData,
            ChannelId: channelData.id,
            Channel: channelData,
            createdAt: new Date(),
          });
          return prevChatData;
        }, false).then(() => {
          setChat('');
          // 채팅시 스크롤바 제일 아래로
          scrollbarRef.current?.scrollToBottom();
        });
        axios
          .post(`/api/workspaces/${workspace}/channels/${channel}/chats`, {
            content: chat,
          })
          .then(() => {
            mutateChat(); // 서버측에 채팅을 등록하고 받아옴
          })
          .catch(console.error);
      }
    },
    [chat, chatData, userData, channelData, workspace, channel],
  );

  const onMessage = useCallback(
    (data: IChat) => {
      if (
        data.Channel.name === channel &&
        (data.content.startsWith('uploads\\') || data.UserId !== userData?.id)
      ) {
        // 채널 데이터가 내 채널명과 같은지
        // 보내는 사람의 id가 내가 아닌지
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
    },
    [channel, userData],
  );

  // DM 채팅하기
  useEffect(() => {
    socket?.on('message', onMessage);
    return () => {
      socket?.off('message', onMessage);
    };
  }, [socket, onMessage]);

  // 로딩시 스크롤바 제일 아래로
  useEffect(() => {
    if (chatData?.length === 1) {
      scrollbarRef.current?.scrollToBottom();
    }
  }, [chatData]);

  const onClickInviteChannel = useCallback(() => {
    setShowInviteChannelModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowInviteChannelModal(false);
  }, []);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      console.log(e);
      const formData = new FormData();
      if (e.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (let i = 0; i < e.dataTransfer.items.length; i++) {
          // If dropped items aren't files, reject them
          console.log(e.dataTransfer.items[i]);
          if (e.dataTransfer.items[i].kind === 'file') {
            const file = e.dataTransfer.items[i].getAsFile();
            console.log(e, '.... file[' + i + '].name = ' + file.name);
            formData.append('image', file);
          }
        }
      } else {
        // Use DataTransfer interface to access the file(s)
        for (let i = 0; i < e.dataTransfer.files.length; i++) {
          console.log(
            e,
            '... file[' + i + '].name = ' + e.dataTransfer.files[i].name,
          );
          formData.append('image', e.dataTransfer.files[i]);
        }
      }
      axios
        .post(
          `/api/workspaces/${workspace}/channels/${channel}/images`,
          formData,
        )
        .then(() => {
          setDragOver(false);
          localStorage.setItem(
            `${workspace}-${channel}`,
            new Date().getTime().toString(),
          );
        });
    },
    [workspace, channel],
  );

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    console.log(e);
    setDragOver(true);
  }, []);

  if (channelsData && !channelData) {
    return <Redirect to={`/workspace/${workspace}/channel/일반`} />;
  }

  const chatSections = makeSection(chatData ? chatData.flat().reverse() : []);

  return (
    <Container onDrop={onDrop} onDragOver={onDragOver}>
      <Header>
        <span>#{channel}</span>
        <div className="header-right">
          <span>{channelMembersData?.length}</span>
          <button
            onClick={onClickInviteChannel}
            className="c-button-unstyled p-ia__view_header__button"
            aria-label="Add people to #react-native"
            data-sk="tooltip_parent"
            type="button"
          >
            <i
              className="c-icon p-ia__view_header__button_icon c-icon--add-user"
              aria-hidden="true"
            />
          </button>
        </div>
      </Header>
      <ChatList
        chatSections={chatSections}
        scrollbarRef={scrollbarRef}
        setSize={setSize}
        isReachingEnd={isReachingEnd}
      />
      <ChatBox
        chat={chat}
        onChangeChat={onChangeChat}
        onSubmitForm={onSubmitForm}
      />
      <InviteChannelModal
        show={showInviteChannelModal}
        onCloseModal={onCloseModal}
        setShowInviteChannelModal={setShowInviteChannelModal}
      />
      {dragOver && <DragOver>업로드</DragOver>}
    </Container>
  );
};

export default Channel;
