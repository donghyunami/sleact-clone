import React, { memo, useMemo, VFC } from 'react';
import gravatar from 'gravatar';
import { ChatWrapper } from './styles';
import { IChat, IDM, IUser } from '@typings/db';
import dayjs from 'dayjs';
import regexifyString from 'regexify-string';
import { Link, useParams } from 'react-router-dom';
interface Props {
  data: IDM | IChat;
}

const Chat: VFC<Props> = ({ data }) => {
  const { workspace } = useParams<{ workspace: string; channel: string }>();
  const user = 'Sender' in data ? data.Sender : data.User;

  // @[리뽀바라기](1)
  // 형태: @[닉네임](dmId)
  const result = useMemo(
    () =>
      regexifyString({
        input: data.content,
        pattern: /@\[(.+?)\]\((\d+?)\)|\n/g,
        decorator(match, index) {
          const arr: string[] | null = match.match(/@\[(.+?)]\((\d+?)\)/)!;
          console.log('arr', arr);
          if (arr) {
            // 닉네임(arr[1]), dmId(arr[2]) 탐색
            return (
              <Link
                key={match + index}
                to={`/workspace/${workspace}/dm/${arr[2]}`}
              >
                @{arr[1]}
              </Link>
            );
          }
          // 줄바꿈 적용
          return <br key={index} />;
        },
      }),
    [data.content],
  );

  return (
    <ChatWrapper>
      <div className="chat-img">
        <img
          src={gravatar.url(user.email, { s: '36px', d: 'retro' })}
          alt={user.nickname}
        />
      </div>
      <div className="chat-text">
        <div className="chat-user">
          <b>{user.nickname}</b>
          <span>{dayjs(data.createdAt).format('h:mm A')}</span>
        </div>
        <p>{result}</p>
      </div>
    </ChatWrapper>
  );
};

export default memo(Chat);
