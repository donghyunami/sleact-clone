import Chat from '@components/Chat';
import { IDM } from '@typings/db';
import React, { forwardRef, RefObject, useCallback } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { ChatZone, Section, StickyHeader } from './styles';

interface Props {
  chatSections: { [key: string]: IDM[] };
  setSize: (f: (size: number) => number) => Promise<IDM[][] | undefined>;
  isEmpty: boolean;
  isReachingEnd: boolean;
}

const CharList = forwardRef<Scrollbars, Props>(
  ({ chatSections, setSize, isEmpty, isReachingEnd }, ref) => {
    const onScroll = useCallback(
      (values) => {
        if (values.scrollTop === 0 && !isReachingEnd) {
          // !isReachingEnd: 끝에 도달하면 (해당) 데이터를 불러올 필요가 없음
          console.log('가장 위');
          // 이전 데이터 추가 로딩
          setSize((prevSize) => prevSize + 1).then(() => {
            // 페이지수 변경 (페이지를 하나 더 불러오기)
            // 스크롤 위치 유지
          });
        }
      },
      [setSize, isReachingEnd],
    );
    // console.log('chatData', chatSections);
    return (
      <ChatZone>
        <Scrollbars
          className="scrollbars"
          autoHide
          ref={ref}
          onScrollFrame={onScroll}
        >
          {Object.entries(chatSections).map(([date, chats]) => {
            return (
              <Section className={`section-${date}`} key={date}>
                <StickyHeader>
                  <button>{date}</button>
                </StickyHeader>
                {chats?.map((chat) => (
                  <Chat key={chat.id} data={chat} />
                ))}
              </Section>
            );
          })}
        </Scrollbars>
      </ChatZone>
    );
  },
);

export default CharList;
