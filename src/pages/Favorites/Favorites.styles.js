import styled from 'styled-components';

export const Container = styled.section`
  height: ${({ fixed }) => (fixed ? '85vh' : '100%')};
  width: 80%;
  margin-bottom: 5%;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 4rem;
  letter-spacing: -6px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  font-weight: normal;

  @media screen and (max-width: 750px) {
    font-size: 2rem;
    letter-spacing: -4px;
  }

  @media screen and (max-width: 500px) {
    font-size: 1.5rem;
    letter-spacing: -2px;
  }
`;
