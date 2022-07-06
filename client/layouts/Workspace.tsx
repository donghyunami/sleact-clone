import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { FC, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import useSWR from 'swr';

const Workspace: FC = ({ children }) => {
  const { data, error, mutate } = useSWR(
    'http://localhost:3095/api/users',
    fetcher,
    { dedupingInterval: 10000 },
    // 1분동안 첫번째 요청한 데이터를 캐싱(보관)해서
    // 이것을 data를 그대로 가져옴
    // 즉, 최초 한번 요청을 보낸 다음, 1분동안은
    // 서버에 요청을 하지 않음
    // (서비스에 따라 Interval을 설정해주면 된다.)
  );

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

  if (!data) {
    // (로그아웃을 해서) 로그인되지 않은 상태이면 로그인 페이지로 이동
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <button onClick={onLogout}>로그아웃</button>
      {children}
    </div>
  );
};

export default Workspace;
