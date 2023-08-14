import logoImg from "../../assets/logo.png";

import { Container, Content } from "./styles";

export function Header() {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt money" />
        <strong>SenFinança</strong>
      </Content>
    </Container>
  );
}
