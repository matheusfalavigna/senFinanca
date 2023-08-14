import styled from "styled-components";

export const Container = styled.header`
  background: var(--gray);
`;

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  padding: 1rem 0.5rem;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    max-width: 3rem;
    border-radius: 50%;
  }

  strong {
    margin-left: 1rem;
    font-size: 1.5rem;
    color: #fff;
  }
`;
