import React, {
  useState,
  useEffect,
} from 'react';
import styled from 'styled-components';
import {
  Route,
  useParams,
} from 'react-router-dom';

import Loader from '../component/Loader';
import HeroList from '../component/HeroList';
import HeroProfile from '../component/HeroProfile';

import { COLOR_RED } from '../share/color'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 360px;

  >.container {
    width: fit-content;
  }

  .list-loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Error = styled.div`
  font-size: 15px;
  color: ${COLOR_RED};
  width: 100%;
  text-align: center;
  margin-top: 32px;
  animation: fade-in .3s linear forwards;
`;

function HeroPage() {
  const { heroId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [heroes, setHeroes] = useState([]);
  const [error, setError] = useState(null);

  const isHeroListPage = !heroId;

  useEffect(() => {
    fetch("https://hahow-recruit.herokuapp.com/heroes")
      .then(res => res.json())
      .then(
        (heroes) => {
          setIsLoaded(true);
          setHeroes(heroes);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );

      return () => {
        setIsLoaded(true);
        setHeroes([]);
        setError(null);
      }
  }, []);


  return (
    <Wrapper>
      {isLoaded ? (
        <div className="container">
          <HeroList heroes={heroes}/>
          <Route path="/heroes/:heroId">
            <HeroProfile />
          </Route>
        </div>
      ) : (
        <Loader className={'list-loader'} />
      )}
      {error ? (
        <Error>{error}</Error>
      ) : null}
    </Wrapper>
  );
}

export default HeroPage;