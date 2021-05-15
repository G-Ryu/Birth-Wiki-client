import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/index';
import { setGuestModal, setGuestReject, setUserInfo, setSaveModal } from '../actions';
import recordCover from '../img/subData/recordCover.jpeg';
import axios from 'axios';

function CardCreate({ setChecked }: any) {
  const userInfo = useSelector((state: RootState) => state.userInfoReducer.userInfo);
  const isLogin = useSelector((state: RootState) => state.loginReducer.isLogin);
  const isGuest = useSelector((state: RootState) => state.guestReducer.isGuest);
  const dispatch = useDispatch();
  const selectedDate = new URL(window.location.href).pathname.split('/')[2];
  const isSave = useSelector((state: RootState) => state.saveReducer.isSave);

  const guestCreate = () => {
    if (isGuest) {
      dispatch(setGuestReject(true));
    } else {
      dispatch(setGuestModal(true));
    }
  };

  const formSubmit = () => {
    const formTag = document.getElementById('formData') as HTMLFormElement;
    const form = new FormData(formTag);
    const resetBtn = document.getElementById('reset') as HTMLInputElement;

    axios({
      url: 'https://server.birthwiki.space/record/create',
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${userInfo.accessToken}` },
      data: form,
    })
      .then((res) => {
        resetBtn.click();
        const addRecord = [...userInfo.recordCards, res.data.data.recordCard];
        const newInfo = Object.assign({}, userInfo, { recordCards: addRecord });
        dispatch(setUserInfo(newInfo));
        dispatch(setSaveModal(true));
        setChecked([false, false, false, false, false, true]);
      })
      .catch(() => {
        //저장 실패 모달
      });
  };

  return (
    <CreateCard>
      <div className='create'>
        <h2>나만의 기록</h2>
        <form id='formData' noValidate={true}>
          <input type='text' name='date' value={`${selectedDate}`} style={{ display: 'none' }} />
          <div className='custom-file'>
            <input
              type='file'
              className='custom-file_input'
              id='field-upload'
              name='cardImage'
              style={{ display: 'none' }}
              required
            />
            <label className='custom-file_label' htmlFor='field-upload'>
              사진 업로드
            </label>
          </div>
          <div className='crtCard'>
            <textarea className='card-desc' name='contents' placeholder='내용을 입력하세요' />
          </div>
          <input type='reset' id='reset' style={{ display: 'none' }} />
        </form>
        {isLogin ? (
          <button className='createBtn' onClick={formSubmit}>
            기록하기
          </button>
        ) : (
          <button className='createBtn' onClick={guestCreate}>
            게스트기록
          </button>
        )}
      </div>
    </CreateCard>
  );
}

const CreateCard = styled.div`
  border-radius: 10px;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;

  & h2 {
    color: black;
  }

  & .create {
    color: #fff;
    background: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 10px;
  }

  .input-file-button {
    padding: 6px 20px;
    background-color: #f2f2f2;
    border-radius: 4px;
    color: #000;
    font-weight: 700;
    cursor: pointer;
  }

  & .crtCard {
    margin-top: 20px;
  }

  & .create .card-desc {
    width: 270px;
    height: 170px;
    padding: 10px 10px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border: 0;
    border-radius: 15px;
    background-color: #f8f8f8;
    resize: none;

    @media (max-width: 699px) {
      width: 370px;
    }
  }

  & .createBtn {
    margin-top: 10px;
    background: #f2f2f2;
    font-size: 1rem;
    width: 40%;
    border: none;
    padding: 8px 20px;
    border-radius: 4px;
    font-weight: 700;
  }

  & .invisable {
    display: none;
  }

  & .custom-file_input {
    display: none;
    position: absolute;
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    z-index: -1;
  }
  & .custom-file_label {
    position: relative;
    display: block;
    width: 100%;
    min-width: 335px;
    min-height: 45px;
    margin: 10px 0;
    padding: 0;
    background: #ffffff;
    border: 1px solid #dfdfdf;
    color: #666666;
    border-radius: 15px;
    line-height: 45px;
    text-align: center;
    text-transform: none;
    cursor: pointer;
    transition: all 0.3s;
  }
  & .custom-file_input:valid ~ .custom-file_label {
    border-color: #39b54a;
    background: #39b54a;
    color: #39b54a;
  }
  & .custom-file_input:valid ~ .custom-file_label:before {
    content: '업로드 되었습니다';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    color: #ffffff;
    line-height: 45px;
  }
`;

export default CardCreate;
