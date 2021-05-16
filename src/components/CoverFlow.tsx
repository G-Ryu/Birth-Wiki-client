import React, { useEffect } from 'react';
import styled from 'styled-components';
import './CoverFlow.css';
import FavoriteButton from './FavoriteButton';
import CreateCard from './CardCreate';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { FaRegArrowAltCircleRight } from 'react-icons/fa';
import movieCover from '../img/subData/movieCover.jpg';
import musicCover from '../img/subData/musicCover.jpg';
import recordCover from '../img/subData/recordCover.jpeg';
import {
  prevHandler,
  nextHandler,
  clickHandler,
  pressHandler,
  wheelHandler,
  dragStart,
} from '../utils/slideHandler';

function CoverFlow(props: any) {
  const subMovie = {
    image: movieCover,
    korea: { title: '영화정보가 없습니다', poster: movieCover },
    world: { title: '영화정보가 없습니다', poster: movieCover },
  };
  const subMusic = {
    image: musicCover,
    korea: { title: '음악정보가 없습니다', poster: musicCover, singer: '가수정보가 없습니다' },
    world: { title: '음악정보가 없습니다', poster: musicCover, singer: '가수정보가 없습니다' },
  };

  const issue = props.data.issueCard;
  const death = props.data.deathCard;
  const birth = props.data.birthCard;
  const movie = props.data.movieCard ? props.data.movieCard : subMovie;
  const music = props.data.musicCard ? props.data.musicCard : subMusic;

  const cardData = [issue, birth, death, movie, music, 0];
  const cardTitle = [
    '그날, 있었던 이슈',
    '그날, 누군가의 탄생',
    '그날, 누군가의 사망',
    '그때, 가장 핫한 영화',
    '그때, 가장 핫한 음악',
  ];

  const initCheck = Array(6).fill(false);
  initCheck[props.selected] = true;

  useEffect(() => {
    if (props.selected === 5) {
      const createCover = document.getElementById('createCover') as HTMLImageElement;
      createCover.style.display = 'none';
    }
  }, []);

  return (
    <Container>
      <button onClick={prevHandler} className='moveBtn'>
        <FaRegArrowAltCircleLeft />
      </button>
      <div className='slider' tabIndex={0} onKeyUp={pressHandler} draggable='true' onDragStart={dragStart}>
        {cardData.map((card, idx: number) => {
          return (
            <input
              key={idx}
              type='radio'
              className='slideInput'
              name='testimonial'
              id={`t-${idx + 1}`}
              defaultChecked={initCheck[idx]}
              onClick={() => {
                clickHandler(idx + 1);
              }}
            />
          );
        })}
        <div className='testimonials'>
          {cardData.map((card, idx: number) => {
            if (idx < 3) {
              return (
                <label key={idx} className='item' htmlFor={`t-${idx + 1}`}>
                  <div className='inner_item'>
                    <div className='sideImg'>
                      <img
                        src={`${card.image}`}
                        alt={`${card.category}`}
                        draggable='false'
                        onWheel={wheelHandler}
                      />
                    </div>
                    <div className='sideContent'>
                      <div>
                        <h2 className='cardTitle'>{cardTitle[idx]}</h2>
                      </div>
                      <div className='issueList'>
                        {card.contents.map((list: string[], key: number) => {
                          return (
                            <p key={key}>
                              <span>{list[0]}</span> {list[1]}
                            </p>
                          );
                        })}
                      </div>
                      <div>
                        <FavoriteButton cardData={card} />
                      </div>
                    </div>
                  </div>
                </label>
              );
            } else if (idx === 3 || idx === 4) {
              return (
                <label key={idx} className='item' htmlFor={`t-${idx + 1}`}>
                  <div className='inner_item'>
                    <div className='sideImg'>
                      <img
                        src={`${card.image}`}
                        alt={`${card.category}`}
                        draggable='false'
                        onWheel={wheelHandler}
                      />
                    </div>
                    <div className='sideContent'>
                      <div>
                        <h2 className='cardTitle'>{cardTitle[idx]}</h2>
                      </div>
                      <div>
                        {card.world ? (
                          <>
                            <img
                              src={`${card.world.poster}`}
                              alt={`${card.world.title}`}
                              style={{ width: '100px', height: '100px' }}
                              draggable='false'
                            />
                            <h3>{card.world.title}</h3>
                          </>
                        ) : (
                          <div>자료없음</div>
                        )}
                        {card.world && card.world.singer ? (
                          <h4>{card.world.singer.replace('&amp;', '&')}</h4>
                        ) : null}
                        <p>해외</p>
                        {card.korea ? (
                          <>
                            <img
                              src={`${card.korea.poster}`}
                              alt={`${card.korea.title}`}
                              style={{ width: '100px', height: '100px' }}
                              draggable='false'
                            />
                            <h3>{card.korea.title}</h3>
                          </>
                        ) : (
                          <div>자료없음</div>
                        )}
                        {card.korea && card.korea.singer ? (
                          <h4>{card.korea.singer.replace('&amp;', '&')}</h4>
                        ) : null}
                        <p>한국</p>
                      </div>
                      <div>
                        <FavoriteButton cardData={card} />
                      </div>
                    </div>
                  </div>
                </label>
              );
            } else if (idx === 5) {
              return (
                <label htmlFor='t-6' className='item'>
                  <div className='inner_item'>
                    <img
                      id='createCover'
                      src={`${recordCover}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div className='sideImg'>
                      <img
                        src={`${recordCover}`}
                        alt={`${recordCover}`}
                        draggable='false'
                        onWheel={wheelHandler}
                      />
                    </div>
                    <div className='sideContent'>
                      <CreateCard />
                    </div>
                  </div>
                </label>
              );
            }
          })}
        </div>
        <div className='dots' onWheel={wheelHandler}>
          {cardData.map((el, idx) => {
            return <label key={idx} htmlFor={`t-${idx + 1}`}></label>;
          })}
        </div>
      </div>
      <button onClick={nextHandler} className='moveBtn'>
        <FaRegArrowAltCircleRight />
      </button>
      <div
        className='slideBG'
        draggable={true}
        onClick={() => {
          props.setIsFlow(false);
          props.setIsHover(true);
        }}
      ></div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  min-width: 85vw;
  min-height: 100vh;
  z-index: 2;
  user-select: none;

  & .inner_item {
    display: flex;

    & .sideImg {
      width: 100%;
      background: #fff;
      color: #000;
      box-shadow: 0 5px 16px rgb(0 0 0 / 20%);
      border-radius: 15px;
      z-index: 3;
      position: relative;

      @media (max-width: 699px) {
        width: 100%;
        height: 18vh;
        box-shadow: none;
        border-radius: 0;
      }
    }

    & .sideImg img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    & .sideContent {
      width: 100%;
      height: 430px;
      display: flex;
      flex-direction: column;
      align-items: center;
      line-height: 1.8;
      color: #141414;
      padding: 10px;
      overflow: auto;

      & img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        border: 6px solid #eee;
      }

      @media (max-width: 699px) {
        width: 100%;
        height: 250px;
        padding: 0;
      }
    }

    & .sideContent p:after {
      content: '';
      display: block;
      border-bottom: 1px solid rgba(155, 155, 155, 0.13);
      margin-top: 10px;
    }

    & .sideContent::-webkit-scrollbar {
      width: 2px;
    }

    & .issueList p {
      word-break: keep-all;
      font-size: 1.1rem;
      font-weight: 600;

      & span {
        color: #333;
        padding: 5px 10px;
        border-radius: 15px;
        background: #eee;
      }

      @media (max-width: 699px) {
        font-size: 0.8rem;
      }
    }
  }

  & .slideBG {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }

  & .slider {
    outline: none;
  }

  & .moveBtn {
    position: relative;
    z-index: 2;
    font-size: 3rem;
    background: none;
    line-height: 90px;
    width: 100px;
    height: 80px;
    cursor: pointer;
    border-radius: 50%;
    border: none;
  }

  & .moveBtn:active {
    color: #fff;
  }
`;

export default CoverFlow;
