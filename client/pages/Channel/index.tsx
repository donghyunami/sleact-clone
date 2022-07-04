import Workspace from '@layouts/Workspace';
import fetcher from '@utils/fetcher';
import React from 'react';
import useSWR from 'swr';

const Channel = () => {
  const { data, error, mutate } = useSWR(
    'http://localhost:3095/api/users',
    fetcher,
    { dedupingInterval: 10000 },
  );

  return (
    <Workspace>
      <div>로그인하신 것을 축하합니다.</div>
    </Workspace>
  );
};

export default Channel;
