import React, {
  MouseEvent,
  useCallback,
  useEffect,
  useState,
  VFC,
} from 'react';
import { Redirect, Switch, Route, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import useSWR from 'swr';
import gravatar from 'gravatar';
import loadable from '@loadable/component';
import fetcher from '@utils/fetcher';
import {
  AddButton,
  Channels,
  Chats,
  Header,
  LogOutButton,
  MenuScroll,
  ProfileImg,
  ProfileModal,
  RightMenu,
  WorkspaceButton,
  WorkspaceModal,
  WorkspaceName,
  Workspaces,
  WorkspaceWrapper,
} from './styles';
import Menu from '@components/Menu';
import { IUser, IWorkspace, IChannel } from '@typings/db';
import { Button, Input, Label } from '@pages/SignUp/style';
import useInput from '@hooks/useInput';
import Modal from '@components/Modal';
import CreateChannelModal from '@components/CreateChannelModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

const Workspace: VFC = () => {
  const { workspace, channel } = useParams<{
    workspace: string;
    channel: string;
  }>();

  const {
    data: userData,
    error,
    mutate,
  } = useSWR<IUser | false>('http://localhost:3095/api/users', fetcher, {
    dedupingInterval: 10000,
  });

  const { data: channelData } = useSWR<IChannel[]>(
    userData
      ? `http://localhost:3095/api/workspaces/${workspace}/channels`
      : null,
    fetcher,
    {
      dedupingInterval: 10000,
    },
  );

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCreateWorkSpaceModal, setShowCreateWorkSpaceModal] =
    useState(false);
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const [newWorkspace, onChangeNewWorkspace, setNewWorkspace] = useInput('');
  const [newUrl, onChangeNewUrl, setNewUrl] = useInput('');

  useEffect(() => {
    toast.configure();
  }, []);

  const onLogout = useCallback(() => {
    axios
      .post('http://localhost:3095/api/users/logout', null, {
        withCredentials: true,
      })
      .then(() => {
        // data에 false로 지정해서 로그아웃하기
        mutate(false, false);
      });
  }, []);

  const onCloseUserProfile = useCallback((e) => {
    e.stopPropagation();
    setShowUserMenu(false);
  }, []);

  const onClickUserProfile = useCallback((e: MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    setShowUserMenu((prev) => !prev);
  }, []);

  const onClickCreateWorkspace = useCallback((e) => {
    setShowCreateWorkSpaceModal(true);
  }, []);

  const onCreateWorkspace = useCallback(
    (e) => {
      e.preventDefault();

      // if (!newWorkspace || !newWorkspace.trim()) return;
      // if (!newUrl || !newUrl.trim()) return;

      if (!newWorkspace || !newWorkspace.trim() || !newUrl || !newUrl.trim()) {
        alert('워크스페이 이름 또는 url를 입력해주세요!');
        return;
      }

      axios
        .post(
          'http://localhost:3095/api/workspaces',
          {
            workspace: newWorkspace,
            url: newUrl,
          },
          {
            withCredentials: true,
          },
        )
        .then(() => {
          mutate();
          setShowCreateWorkSpaceModal(false);
          setNewWorkspace('');
          setNewUrl('');
        })
        .catch((error) => {
          console.dir(error.response.data);
          toast.error(error.response?.data, { position: 'bottom-center' });
        });
    },
    [newWorkspace, newUrl],
  );

  const onCloseModal = useCallback(() => {
    setShowCreateWorkSpaceModal(false);
    setShowCreateChannelModal(false);
    setNewWorkspace('');
    setNewUrl('');
  }, []);

  const toggleWorkspaceModal = useCallback(() => {
    setShowWorkspaceModal((prev) => !prev);
  }, []);

  const onClickAddChannel = useCallback(() => {
    setShowCreateChannelModal(true);
  }, []);

  // 로딩중 처리
  if (userData === undefined) {
    return <div>로딩중...</div>;
  }

  if (!userData) {
    // (로그아웃을 해서) 로그인되지 않은 상태이면 로그인 페이지로 이동
    return <Redirect to="/login" />;
  }

  return (
    <div>
      {userData && (
        <Header>
          <RightMenu>
            <span onClick={onClickUserProfile}>
              <ProfileImg
                src={gravatar.url(userData.email, { s: '28px', d: 'retro' })}
                alt={userData.nickname}
              />
              {showUserMenu && (
                <Menu
                  style={{ right: 0, top: 38 }}
                  show={showUserMenu}
                  onCloseModal={onCloseUserProfile}
                >
                  <ProfileModal>
                    <img
                      src={gravatar.url(userData.email, {
                        s: '36px',
                        d: 'retro',
                      })}
                      alt={userData.nickname}
                    />
                    <div>
                      <span id="profile-name">{userData.nickname}</span>
                      <span id="profile-active">Active</span>
                    </div>
                  </ProfileModal>
                  <LogOutButton onClick={onLogout}>로그아웃</LogOutButton>
                </Menu>
              )}
            </span>
          </RightMenu>
        </Header>
      )}
      {userData && (
        <WorkspaceWrapper>
          <Workspaces>
            {userData?.Workspaces?.map((ws: IWorkspace) => (
              <Link key={ws.id} to={`/workspace/${ws.url}/channel/일반`}>
                <WorkspaceButton>
                  {ws.name.slice(0, 1).toUpperCase()}
                </WorkspaceButton>
              </Link>
            ))}
            {/* 워크스페이스 생성 */}
            <AddButton onClick={onClickCreateWorkspace}>+</AddButton>
          </Workspaces>
          <Channels>
            <WorkspaceName onClick={toggleWorkspaceModal}>Select</WorkspaceName>
            <MenuScroll>
              <Menu
                show={showWorkspaceModal}
                onCloseModal={toggleWorkspaceModal}
                style={{ top: 95, left: 80 }}
              >
                <WorkspaceModal>
                  <h2>Sleact</h2>
                  <button onClick={onClickAddChannel}>채널만들기</button>
                  <button onClick={onLogout}>로그아웃</button>
                </WorkspaceModal>
              </Menu>
              {channelData?.map((ch) => (
                <div key={ch.id}>{ch.name}</div>
              ))}
            </MenuScroll>
          </Channels>
          <Chats>
            <Switch>
              <Route
                path="/workspace/:workspace/channel/:channel"
                component={Channel}
              />
              <Route
                path="/workspace/:workspace/dm/:id"
                component={DirectMessage}
              />
            </Switch>
          </Chats>
        </WorkspaceWrapper>
      )}

      <Modal show={showCreateWorkSpaceModal} onCloseModal={onCloseModal}>
        <form onSubmit={onCreateWorkspace}>
          <Label id="workspace-label">
            <span>워크스페이스 이름</span>
            <Input
              id="wordspace"
              value={newWorkspace}
              onChange={onChangeNewWorkspace}
            />
          </Label>
          <Label id="workspace-url-label">
            <span>워크스페이스 url</span>
            <Input id="wordspace" value={newUrl} onChange={onChangeNewUrl} />
          </Label>
          <Button type="submit">생성하기</Button>
        </form>
      </Modal>
      <CreateChannelModal
        show={showCreateChannelModal}
        onCloseModal={onCloseModal}
        setShowCreateChannelModal={setShowCreateChannelModal}
      ></CreateChannelModal>
    </div>
  );
};

export default Workspace;
