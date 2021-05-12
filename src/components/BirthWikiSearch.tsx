import React, { useState } from 'react';
import styled from 'styled-components';
import 'dotenv/config';
import { date } from '../types';
import {
  pressYear,
  pressMonth,
  pressDay,
  blurYear,
  blurMonth,
  blurDay,
  birthwikiHandler,
} from '../utils/dateHandler';

export default function BirthWikiSearch({ year, month, day }: date) {
  const [inputYear, setInputYear] = useState(year);
  const [inputMonth, setInputMonth] = useState(month);
  const [inputDay, setInputDay] = useState(day);
  const [warning, setWarning] = useState(false);
  const curYear = new Date().getFullYear();

  return (
    <BirthwikiSearch>
      <InputContiner>
        <InputDate
          type='number'
          id='year'
          min='1'
          max={curYear}
          defaultValue={year}
          onKeyUp={(e) => {
            pressYear(e, setWarning, setInputYear);
          }}
          onBlur={(e) => {
            blurYear(e, setInputYear);
          }}
          onFocus={(e) => {
            e.target.value = '';
          }}
        ></InputDate>
        <span>년</span>
        <InputDate
          type='number'
          id='month'
          max='12'
          min='1'
          defaultValue={month}
          onKeyUp={(e) => {
            pressMonth(e, setWarning, setInputMonth, inputYear);
          }}
          onBlur={(e) => {
            blurMonth(e, setInputMonth, inputYear);
          }}
          onFocus={(e) => {
            e.target.value = '';
          }}
        ></InputDate>
        <span>월</span>
        <InputDate
          type='number'
          id='day'
          min='1'
          max='31'
          defaultValue={day}
          onKeyUp={(e) => {
            pressDay(e, setWarning, setInputDay, inputYear, inputMonth);
          }}
          onBlur={(e) => {
            blurDay(e, setInputDay, inputYear, inputMonth);
          }}
          onFocus={(e) => {
            e.target.value = '';
          }}
        ></InputDate>
        <span>일</span>
      </InputContiner>
      <BirthwikiBtn
        onClick={() => {
          birthwikiHandler(inputYear, inputMonth, inputDay, setWarning);
        }}
      >
        Birth Wiki!
      </BirthwikiBtn>
      {warning ? (
        <span className='warning'>날짜를 다시 입력해 주세요</span>
      ) : (
        <span className='warning'></span>
      )}
    </BirthwikiSearch>
  );
}

const BirthwikiSearch = styled.div`
  font-family: sans-serif;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-repeat: repeat-x;
  background-position: x y;
  background-size: 100%;
  width: 600px;

  & .warning {
    margin: 10px;
  }
`;

const InputContiner = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InputDate = styled.input`
  box-sizing: border-box;
  color: #060b26;
  outline: 0;
  padding: 0 20px 0;
  border: none;
  border-bottom: 2px solid #060b26;
  background-color: rgba(255, 255, 255, 0);
  margin: 5px;
  width: 100px;
  height: 30px;
  font-size: 1.7rem;
  text-align: center;
  ::-webkit-inner-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const BirthwikiBtn = styled.button`
  background: #060b26;
  border-radius: 50px;
  white-space: nowrap;
  padding: 8px 25px;
  margin-left: 20px;
  color: #fff;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;
