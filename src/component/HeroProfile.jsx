import React, {
  useState,
  useEffect,
  Fragment,
} from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Loader from './Loader'

import { HERO_ABILITIES } from '../share/hero';
import {
  COLOR_RED,
  COLOR_GREEN,
} from '../share/color'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px;
  animation: fade-in 1s ease-in;
  flex-wrap: wrap;
  @media screen and (max-width: 767px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-height: 320px;
  }
  .profile-loader {
    margin-top: 60px;
    @media screen and (max-width: 767px) {
      margin-top: 0px;
    }
  }
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 10px; 
  }
`;

const Label = styled.div`
  font-size: 20px;
  color: #000000;
  display: inline-block;
  width: 100px;
`;

const Button = styled.button`
  border-radius: 5px;
  border: 2px solid darkgray;
  background: lightgrey;
  color: #000;
  display: inline-block;
  width: 30px;
  height: 30px;
  font-size: 20px;
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  opacity: ${props => props.disabled ? 0.4 : 1};
  user-select: none;
  transition: opacity .3s ease, background .12s ease;
  &:hover {
    opacity: .9;
    background: #b2b2b2;
  }
`;

const Value = styled.div`
  display: inline-block;
  font-size: 20px;
  color: grey;
  width: 20px;
  margin: 0 10px;
  text-align: right;
`;

const StatusBlock = styled.div`
  margin-left: 80px;
  align-self: flex-end;
  @media screen and (max-width: 768px) {
    align-self: center;
    margin-left: 0;
    margin-top: 32px;
  }
`;

const RemainValue = styled.div`
  font-size: 16px;
`;

const Number = styled.span`
  display: inline-block;
  min-width: 22px;
`;

const SubmitButton = styled.button`
  padding: 8px 16px;
  border-radius: 5px;
  border: 2px solid darkgray;
  background-color: lightgrey;
  color: #000;
  min-width: 100px;
  margin-top: 10px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
  cursor: ${props => props.disabled ? 'normal' : 'pointer' };
  opacity: ${props => props.disabled ? 0.6 : 1 };
  transition: opacity .3s ease, background .12s ease;
  &:hover {
    opacity: .9;
    background: #b2b2b2;
  }
`;

const Message = styled.div`
  font-size: 15px;
  color: ${COLOR_GREEN};
  width: 100%;
  text-align: center;
  margin-top: 32px;
  animation: fade-in .3s linear forwards;
  &.-error {
    color: ${COLOR_RED};
  }
`;

function HeroProfile() {
  const { heroId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [profile, setProfile] = useState(null);
  const [totalValue, setTotalValue] = useState(0);
  const [message, setMessage] = useState({
    type: null,
    text: '',
  });
  
  useEffect(() => {
    fetch(`https://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(
        (profile) => {
          setProfile(profile);
          const totalValue = Object.values(profile).reduce((acc, count) => (acc + count))
          setTotalValue(totalValue);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setMessage({
            type: 'error',
            text: '能力載入失敗，請稍後再試。',
          });
        },
      )

    return () => {
      setIsLoaded(false);
      setProfile(null);
      setTotalValue(0);
      setMessage({
        type: null,
        text: '',
      });
    }
  }, [heroId]);

  const onSubmit = (profile) => {
    setIsUpdating(true);

    fetch(`https://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profile)
    })
    .then(
      (res) => {
        setIsUpdating(false);
        setMessage({
          type: 'success',
          text: '英雄能力已更新！',
        });
      },
      (error) => {
        setIsUpdating(false);
        setMessage({
          type: 'error',
          text: '更新失敗，請稍後再試。',
        });
      }
    );
  };

  let remainValue
  
  if(isLoaded && profile && totalValue) {
    const currentTotalValue = Object.values(profile).reduce((acc, count) => (acc + count))
    remainValue = totalValue - currentTotalValue
  }

  return (
    <Wrapper>
      {isLoaded && profile ? (
        <Fragment>
          <div>
            {HERO_ABILITIES.map(ability => {
              const value = profile[ability];
              
              return (
                <ListItem key={`ability-${ability}`}>
                  <Label>{ability.toUpperCase()}</Label>
                  <Button
                    disabled={remainValue === 0}
                    onClick={() => {
                      if(remainValue) {
                        setProfile({
                          ...profile,
                          [ability]: value + 1,
                        });
                      }
                  }}>+</Button>
                  <Value>{profile && profile[ability]}</Value>
                  <Button
                    disabled={value === 0}
                    onClick={() => {
                      if(value > 0) {
                        setProfile({
                          ...profile,
                          [ability]: value - 1,
                        });
                      }
                  }}>-</Button>
                </ListItem>
              );
            })}
          </div>
          <StatusBlock>
            <RemainValue>剩餘點數：<Number>{remainValue}</Number></RemainValue>
            <SubmitButton
              disabled={remainValue > 0 || isUpdating}
              onClick={() => {
                if(!isUpdating && remainValue === 0) {
                  onSubmit(profile)
                }
              }}>
                {isUpdating ? '更新中' : '儲存'}
              </SubmitButton>
          </StatusBlock>
        </Fragment>
      ) : <Loader className="profile-loader" />}
      {message && message.text ? (
        <Message className={`-${message.type}`}>{message.text}</Message>
      ) : null}
    </Wrapper>
  );
}

export default HeroProfile;