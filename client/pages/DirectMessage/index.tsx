import Workspace from '@layouts/Workspace';
import fetcher from '@utils/fetcher';
import React from 'react';
import useSWR from 'swr';

const DirectMessage = () => {
  return (
    <Workspace>
      <h1>DM 페이지</h1>
      <div>DirectMessage 보내기</div>
    </Workspace>
  );
};

export default DirectMessage;
