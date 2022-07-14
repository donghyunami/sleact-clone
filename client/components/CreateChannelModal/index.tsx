import Modal from '@components/Modal';
import useInput from '@hooks/useInput';
import { Button, Input, Label } from '@pages/SignUp/styles';
import { IChannel, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback, useEffect, VFC } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useSWR from 'swr';

interface Props {
  show: boolean;
  onCloseModal: () => void;
  setShowCreateChannelModal: (flag: boolean) => void;
}

const CreateChannelModal: VFC<Props> = ({
  show,
  onCloseModal,
  setShowCreateChannelModal,
}) => {
  const [newChannel, onChangeNewChannel, setNewChannel] = useInput('');
  const { workspace, channel } = useParams<{
    workspace: string;
    channel: string;
  }>();

  const { data: userData } = useSWR<IUser | false>('/api/users', fetcher, {
    dedupingInterval: 10000,
  });

  const { data: channelData, mutate: mutateChannelData } = useSWR<IChannel[]>(
    userData ? `/api/workspaces/${workspace}/channels` : null,
    fetcher,
    {
      dedupingInterval: 10000,
    },
  );

  useEffect(() => {
    toast.configure();
  }, []);

  const onCreateChannel = useCallback(
    (e) => {
      e.preventDefault();
      console.log('채널 생성하기');
      if (!newChannel || !newChannel.trim()) {
        return;
      }
      axios
        .post(
          `/api/workspaces/${workspace}/channels`,
          {
            name: newChannel,
          },
          {
            withCredentials: true,
          },
        )
        .then(() => {
          setShowCreateChannelModal(false);
          mutateChannelData();
          setNewChannel('');
        })
        .catch((error) => {
          toast.error(error.response?.data, { position: 'bottom-center' });
          console.dir(error);
        });
    },
    [newChannel],
  );
  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onCreateChannel}>
        <Label id="workspace-label">
          <span>채널</span>
          <Input
            id="wordspace"
            value={newChannel}
            onChange={onChangeNewChannel}
          />
        </Label>
        <Button type="submit">생성하기</Button>
      </form>
    </Modal>
  );
};

export default CreateChannelModal;
