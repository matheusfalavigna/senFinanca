import { styled } from "styled-components";
import { darken, transparentize } from "polished";

export const Container = styled.form`
  h2 {
    color: var(--text-highlight);
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 2rem;
  }

  input {
    background-color: #f0f0f0;
    border: 1px solid #d7d7d7;
    border-radius: 0.25rem;
    font-size: 1rem;
    height: 4rem;
    margin-bottom: 1rem;
    padding: 0 1.5rem;
    width: 100%;
  }

  button[type="submit"] {
    background-color: var(--yellow);
    border: 0;
    border-radius: 0.25rem;
    color: var(--text-highlight);
    font-size: 1rem;
    font-weight: 600;
    height: 4rem;
    margin-top: 1.5rem;
    padding: 0 1.5rem;
    transition: filter 0.2s;
    width: 100%;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;

export const TransactionTypeContainer = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
`;

interface RadioBoxProps {
  isActive: boolean;
  activeColor: "green" | "red";
}

const colors = {
  green: "#33cc95",
  red: "#e52e4d",
};

export const RadioBox = styled.button<RadioBoxProps>`
  height: 4rem;
  border: 1px solid #d7d7d7;
  border-radius: 0.25rem;

  background-color: ${(props) => {
    return props.isActive
      ? transparentize(0.9, colors[props.activeColor])
      : "transparent";
  }};

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: ${darken(0.1, "#f0f0f0")};
  }

  img {
    height: 20px;
    width: 20px;
  }

  span {
    display: inline-block;
    margin-left: 1rem;
    font-size: 1rem;
    color: var(--text-highlight);
  }
`;
