import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/index';
import { setIsLogin, setUserInfo, setIsSidbar, setIsEdit, setGuest, setGuestModal } from '../actions/index';
import axios from 'axios';
import initialState from '../reducers/initialState';
import SidebarMystory from './SidebarMystory';

const MypageContainer = styled.div`
  color: #fff;
  font-size: 30px;
  height: 100%;
  width: 300px;
  margin: 10px;
  top: 60px;
  position: fixed;
`;

const ProfileContainer = styled.div`
  font-size: 20px;
  border: #fff 1px solid;
  border-radius: 20px;
  margin: 5px 0;
  padding: 10px;
  color: #fff;
`;

const Profile = styled.div`
  font-size: 20px;
  padding: 5px;
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  border-radius: 20px;
`;

const UserPoto = styled.img`
  font-size: 60px;
  height: 100px;
  width: 100px;
  color: #fff;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const UserInfoContainer = styled.div`
  font-size: 15px;
  display: grid;
  grid-template-rows: 1fr 1fr;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 10px;
  width: 100%;
`;

const UserInfoEdit = styled.button`
  border-radius: 50px;
  background: rgba(6, 11, 38, 0.8);
  white-space: nowrap;
  padding: 10px 35px;
  margin: 10px 10px 0 20px;
  color: #fff;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: rgba(255, 255, 255, 0.8);
    color: #000;
  }
`;

const Logout = styled.button`
  border-radius: 50px;
  background: rgba(6, 11, 38, 0.8);
  white-space: nowrap;
  width: 100px;
  padding: 10px 0;
  margin: 10px 10px 0 20px;
  color: #fff;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: rgba(255, 255, 255, 0.8);
    color: #000;
  }
`;

const MyStoryContainer = styled.div`
  font-size: 20px;
  border: #fff 1px solid;
  border-radius: 20px;
  margin: 5px 0;
  padding: 10px 10px 15px;
  color: #fff;
`;

const RecordCardsList = styled.div`
  font-size: 20px;
  border: #fff 1px solid;
  border-radius: 20px;
  margin: 5px 0;
  padding: 10px;
  color: #fff;

  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;

  .active,
  &:hover {
    background-color: #ccc;
  }

  p {
    margin: 0;
  }
`;

const MyStory = styled(Link)`
  display: flex;
  margin: 5px;
`;

const LikeCardsList = styled.div`
  font-size: 20px;
  border: #fff 1px solid;
  border-radius: 20px;
  margin: 5px 0;
  padding: 10px;
  color: #fff;

  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;

  .active,
  &:hover {
    background-color: #ccc;
  }

  p {
    margin: 0;
  }
`;

const Likecard = styled(Link)`
  display: flex;
  margin: 5px;
`;

const MyBookMark = styled.button`
  display: flex;
  margin: 5px;
`;

function SidebarMypage() {
  const userInfo = useSelector((state: RootState) => state.userInfoReducer.userInfo);
  const { accessToken, source, profileImage, nickName, userEmail, likeCards, recordCards } = userInfo;
  const sidebar = useSelector((state: RootState) => state.sidebarReducer.isSidebar);
  const dispatch = useDispatch();
  const [storyclicked, setStoryClicked] = useState(false);
  const [markclicked, setMarkClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isGuest = useSelector((state: RootState) => state.guestReducer.isGuest);
  const [shareModalMain, setShareModalMain] = useState(false);
  const [unLikeModal, setUnlikeModal] = useState(false);

  const logoutHandler = () => {
    if (isGuest) {
      dispatch(setGuest(false));
      dispatch(setGuestModal(false));
    } else {
      const birthwikiServer = 'https://server.birthwiki.space/user/logout';
      axios({
        url: birthwikiServer,
        method: 'POST',
        data: {
          source: source,
        },
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => {
          console.log('Logout', res);
          dispatch(setIsLogin(false));
          dispatch(setIsSidbar(false));
          dispatch(setUserInfo(initialState.userInfo));
        })
        .then(() => console.log(userInfo))
        .catch((error) => console.log('err', error.message));
    }
  };

  const editHandler = () => {
    dispatch(setIsSidbar(false));
    dispatch(setIsEdit(true));
  };

  const clickedStoryHandler = () => {
    setStoryClicked(!storyclicked);
  };

  const clickMarkHandler = () => {
    setMarkClicked(!markclicked);
  };
  return (
    <MypageContainer>
      Mypage
      <ProfileContainer>
        <Profile>
          {profileImage ? (
            <UserPoto src={`${profileImage}`} />
          ) : (
            <UserPoto src={`${process.env.PUBLIC_URL}/img/profile.png`} />
          )}

          <UserInfoContainer>
            <UserInfo>{nickName}</UserInfo>
            <UserInfo>{userEmail}</UserInfo>
          </UserInfoContainer>
        </Profile>
        <UserInfoEdit onClick={editHandler}>Edit</UserInfoEdit>
        <Logout type='submit' onClick={logoutHandler}>
          Logout
        </Logout>
      </ProfileContainer>
      <MyStoryContainer>
        <RecordCardsList>
          <p onClick={clickedStoryHandler}> 나만의 기록리스트 </p>
          {recordCards !== null
            ? storyclicked
              ? recordCards.map((data: any) => (
                  <MyStory to='/' key={data.id}>
                    {data}
                  </MyStory>
                ))
              : ''
            : ''}
        </RecordCardsList>
        <LikeCardsList>
          <p onClick={clickMarkHandler}> 내가 찜한 카드 </p>
          {likeCards !== null
            ? markclicked
              ? likeCards.map((card: any, index: any) => (
                  <SidebarMystory
                    id={card.id}
                    like={card.like}
                    date={card.date}
                    category={card.category}
                    contents={card.contents}
                    image={card.image}
                    korea={card.korea}
                    world={card.world}
                    key={index}
                  />
                ))
              : ''
            : ''}
        </LikeCardsList>
      </MyStoryContainer>
    </MypageContainer>
  );
}

export default SidebarMypage;
