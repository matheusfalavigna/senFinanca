import styled from "styled-components";

export const Container = styled.div`
  table {
    width: 100%;
    border-spacing: 0 0.5rem;

    th {
      color: var(--text-body);
      border: 0;
      padding: 1rem 2rem;
      text-align: left;
      line-height: 1.5rem;
    }

    td {
      padding: 1rem 2rem;
      background: var(--shape);
      color: var(--text-body);
      border-radius: 0.25rem;

      &:first-child {
        color: var(--yellow);
      }

      &.deposit {
        color: var(--green);
      }

      &.withdraw {
        color: var(--red);
      }

      button {
        border: 0;
        background: transparent;
        transition: filter 0.2s;

        &:hover {
          filter: brightness(1.1);
        }
      }

      img {
        width: 2rem;
        height: 1.4rem;
      }
    }
  }
`;
