import styled from "styled-components";
import Paging from "../components/common/pagination";
import Loading from "../components/common/Loading";
import { React, useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Title from "../components/common/Title";
import UserTable from "../components/common/tables/userTable";
import { AuthContext } from "../components/common/login/AuthProvider";

const StyledPage = styled.div`
    padding-top: 1.5em;

    .contents {
      padding-top: 9em;
      margin-left: 17em;
    }

    .infotable {
      margin-top: 2em;
    }
`;

const UserList = () => {
    const { accessToken } = useContext(AuthContext);
    const [user, setUser] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const fullLocation = `${location.pathname}${location.search}${location.hash}`;

    const [userTableLoading, setUserTableLoading] = useState(true);

    const getUserApproveInfo = async () => {
        if (!accessToken) {
            alert('로그인이 필요합니다.');
            navigate('/admin/login');
        }
        try {
            const response = await fetch(`http://43.202.196.181:8080/api/users?page=0`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            const json = await response.json();
            setUser(json);
            console.log(user);
        } catch (error) {
            console.error('Fetching users failed:', error);
        } finally {
            setUserTableLoading(false);
        }
    };

    useEffect(() => {
        getUserApproveInfo();
    }, [accessToken]);

    return (
        <StyledPage>
            <div className="contents">
                <Title title='회원관리' sub='회원의 목록을 확인하고 관리할 수 있습니다.'></Title>
                <div className="infotable">
                    {userTableLoading ? (
                        <Loading />
                    ) : (
                        <>
                            <UserTable response={user} />
                            <Paging response={user} />
                        </>
                    )}
                </div>
            </div>
        </StyledPage>
    );
}

export default UserList;