import useInput from '@hooks/useInput';
import React, { useCallback, useState } from 'react';
import {
    Header,
    Form,
    Input,
    Label,
    Button,
    LinkContainer,
    Error,
} from './style';

const SignUp = () => {
    const [email, onChangeEmail, setEmail] = useInput('');
    const [nickname, onChangeNickname, setNickName] = useInput('');
    const [password, , setPassword] = useInput('');
    const [passwordCheck, , setPasswordCheck] = useInput('');
    const [mismatchError, setMismatchError] = useState(false);

    const onChangePassword = useCallback(e => {
        setPassword(e.target.value);
        setMismatchError(passwordCheck !== e.target.value);
    }, [])

    const onChangePasswordCheck = useCallback(e => {
        setPasswordCheck(e.target.value);
        setMismatchError(password !== e.target.value);
    }, [password, setPasswordCheck])

    const onSubmit = useCallback(e => {
        e.preventDefault();
        // 비밀번호 일치하는 지 체크
        if (!mismatchError) {
            console.log('서버로 회원가입하기')
        }
    }, [email, nickname, password, passwordCheck])

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
                        {!email && <Error>이메일을 입력해주세요.</Error>}
                    </div>
                </Label>
                <Label id="nickname-label">
                    <span>닉네임</span>
                    <div>
                        <Input
                            type="text"
                            id="nickname"
                            name="nickname"
                            value={nickname}
                            onChange={onChangeNickname}
                        />
                        {!nickname && <Error>닉네임을 입력해주세요.</Error>}
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
                </Label>
                <Label id="password-check-label">
                    <span>비밀번호 확인</span>
                    <div>
                        <Input
                            type="password"
                            id="password-check"
                            name="password-check"
                            value={passwordCheck}
                            onChange={onChangePasswordCheck}
                        />
                    </div>
                    {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
                    {/* {signUpError && <Error>이미 가입된 이메일입니다.</Error>} */}
                    {/* {signUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>} */}
                </Label>
                <Button type="submit">회원가입</Button>
            </Form>
            <LinkContainer>
                이미 회원이신가요?&nbsp;
                <a href="/login">로그인 하러가기</a>
            </LinkContainer>
        </div>
    );
};

export default SignUp
