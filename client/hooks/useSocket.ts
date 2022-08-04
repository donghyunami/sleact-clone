import io from 'socket.io-client';
import { useCallback } from 'react';

const backUrl = 'http://localhost:3095';

const sockets: { [key: string]: SocketIOClient.Socket } = {};
const useSocket = (
  workspace?: string,
): [SocketIOClient.Socket | undefined, () => void] => {
  const disconnect = useCallback(() => {
    if (workspace) {
      sockets[workspace].disconnect();
      delete sockets[workspace];
    }
  }, [workspace]);
  if (!workspace) {
    return [undefined, disconnect];
  }

  if (!sockets[workspace]) {
    // 기존에 저장해놓은 소켓이 없는 경우만 소켓 요청하깅
    sockets[workspace] = io.connect(`${backUrl}/ws-${workspace}`, {
      transports: ['websocket'],
    });
  }
  // 기존에 저장해놓은 소켓이 있다면, 기존에 저장해놓은 소켓 리턴
  return [sockets[workspace], disconnect];
};

export default useSocket;
