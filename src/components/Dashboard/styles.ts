import { styled } from "styled-components";

export const Container = styled.main`
  max-width: 1120px;
  margin: 0 auto;
  padding: 2.5rem 1rem;

  button {
    font-size: 1rem;
    color: var(text-highlight);
    background: var(--yellow);
    border: 0;
    padding: 0 2rem;
    border-radius: 0.25rem;
    height: 3rem;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }

  label {
    font-size: 1rem;
    color: #ffffff;
  }
`;

export const Filters = styled.div`
  display: flex;
  gap: 1rem;

  select {
    font-size: 1rem;
    color: var(text-highlight);
    background: var(--yellow);
    border: 0;
    padding: 0 1rem;
    border-radius: 0.25rem;
    height: 1.5rem;
  }
`;

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  padding: 1.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
