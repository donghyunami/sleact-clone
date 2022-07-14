import { IChannel, IUser } from '@typings/db';
import React, { FC } from 'react';

interface Props {
  channelData?: IChannel[];
  userData?: IUser;
}

const ChannelList: FC<Props> = () => {
  return <div>ChannelList</div>;
};

export default ChannelList;
