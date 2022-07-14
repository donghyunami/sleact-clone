import useInput from '@hooks/useInput';
import {
  Header,
  Form,
  Label,
  Input,
  Error,
  Button,
  LinkContainer,
} from '@pages/SignUp/styles';
import axios from 'axios';
import useSWR from 'swr';
import React, { useCallback, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import fetcher from '@utils/fetcher';

const LogIn = () => {
  const { data, error, mutate } = useSWR('/api/users', fetcher, {
    dedupingInterval: 10000,
  });
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [logInError, setLogInError] = useState(false);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLogInError(false);
      axios
        .post(
          '/api/users/login',
          { email, password },
          { withCredentials: true },
        )
        .then((res) => mutate(res.data))
        .catch((error) => {
          setLogInError(error.response?.data?.code === 401);
        });
    },
    [email, password],
  );

  // 로딩중 처리
  if (data === undefined) {
    return <div>로딩중...</div>;
  }

  // 로그인이 된 상황
  if (data) {
    return <Redirect to="/workspace/sleact/channel/일반" />;
  }

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChangeEmail}
            />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChangePassword}
            />
          </div>
          {logInError && (
            <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>
          )}
        </Label>
        <Button type="submit">로그인</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default LogIn;
