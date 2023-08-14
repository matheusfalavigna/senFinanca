import { useState } from "react";
import { Summary } from "../Summary";
import { TransactionsTable } from "../TransactionsTable";

import { Container, Content, Filters } from "./styles";

interface HeaderProps {
  onOpenNewTransactionModal: () => void;
}

export function Dashboard({ onOpenNewTransactionModal }: HeaderProps) {
  const [transactionTypeFilter, setTransactionTypeFilter] = useState("all");
  const [transactionCategoryFilter, setTransactionCategoryFilter] =
    useState("all");

  return (
    <Container>
      <Summary />

      <Content>
        <Filters>
          <label>Tipo:</label>
          <select
            value={transactionTypeFilter}
            onChange={(e) => setTransactionTypeFilter(e.target.value)}
          >
            <option value="all">Todos</option>
            <option value="deposit">Entrada</option>
            <option value="withdraw">Saída</option>
          </select>
          <label>Categoria:</label>
          <select
            value={transactionCategoryFilter}
            onChange={(e) => setTransactionCategoryFilter(e.target.value)}
          >
            <option value="all">Todas</option>
            <option value="Compras">Compras</option>
            <option value="Vendas">Vendas</option>
            <option value="Contas">Contas</option>
            <option value="Salário">Salário</option>
          </select>
        </Filters>

        <button type="button" onClick={onOpenNewTransactionModal}>
          Nova transação
        </button>
      </Content>

      <TransactionsTable
        transactionTypeFilter={transactionTypeFilter}
        setTransactionTypeFilter={setTransactionTypeFilter}
        transactionCategoryFilter={transactionCategoryFilter}
        setTransactionCategoryFilter={setTransactionCategoryFilter}
      />
    </Container>
  );
}
