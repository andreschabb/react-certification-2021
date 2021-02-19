import styled from 'styled-components';

export const Container = styled.section`
  text-align: center;
  height: 100%;
  width: 80%;
  margin-bottom: 5%;
`;

export const Title = styled.h1`
  font-size: 4rem;
  letter-spacing: -6px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  font-weight: normal;

  @media screen and (max-width: 650px) {
    font-size: 3rem;
    letter-spacing: -4px;
  }

  @media screen and (max-width: 425px) {
    font-size: 2rem;
    letter-spacing: -2px;
  }
`;
