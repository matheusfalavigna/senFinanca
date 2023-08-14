import { useState } from "react";
import { useTransactions } from "../../hook/useTransactions";
import { NewTransactionModal } from "../NewTransactionModal";

import bin from "../../assets/bin.svg";
import pen from "../../assets/pen.svg";

import { Container } from "./styles";

interface Transaction {
  id: number;
  title: string;
  amount: number;
  category: string;
  createdAt: string;
  type: string;
}

interface TransactionsTableProps {
  transactionTypeFilter: string;
  setTransactionTypeFilter: React.Dispatch<React.SetStateAction<string>>;
  transactionCategoryFilter: string;
  setTransactionCategoryFilter: React.Dispatch<React.SetStateAction<string>>;
}

export function TransactionsTable({
  transactionTypeFilter,
  transactionCategoryFilter,
}: TransactionsTableProps) {
  const { transactions, deleteTransaction, updateTransaction } =
    useTransactions();
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  async function handleDelete(id: number) {
    try {
      await deleteTransaction(id);
    } catch (error) {
      console.error("Erro ao excluir a transação:", error);
    }
  }

  async function handleEdit(transaction: Transaction) {
    setEditingTransaction(transaction);
  }

  async function handleSaveEdit() {
    if (editingTransaction) {
      try {
        await updateTransaction(editingTransaction.id, editingTransaction);
        setEditingTransaction(null);
      } catch (error) {
        console.error("Erro ao atualizar a transação:", error);
      }
    }
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const typeMatch =
      transactionTypeFilter === "all" ||
      transactionTypeFilter === transaction.type;
    const categoryMatch =
      transactionCategoryFilter === "all" ||
      transactionCategoryFilter === transaction.category;
    return typeMatch && categoryMatch;
  });

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
            <th>Editar/Deletar</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>
                {editingTransaction?.id === transaction.id ? (
                  <NewTransactionModal
                    isOpen={true}
                    onRequestClose={() => setEditingTransaction(null)}
                    editingTransaction={editingTransaction}
                  />
                ) : (
                  transaction.title
                )}
              </td>
              <td className={transaction.type}>
                {editingTransaction?.id === transaction.id ? (
                  <NewTransactionModal
                    isOpen={true}
                    onRequestClose={() => setEditingTransaction(null)}
                    editingTransaction={editingTransaction}
                  />
                ) : (
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(transaction.amount)
                )}
              </td>
              <td>
                {editingTransaction?.id === transaction.id ? (
                  <NewTransactionModal
                    isOpen={true}
                    onRequestClose={() => setEditingTransaction(null)}
                    editingTransaction={editingTransaction}
                  />
                ) : (
                  transaction.category
                )}
              </td>
              <td>
                {editingTransaction?.id === transaction.id ? (
                  <NewTransactionModal
                    isOpen={true}
                    onRequestClose={() => setEditingTransaction(null)}
                    editingTransaction={editingTransaction}
                  />
                ) : (
                  new Intl.DateTimeFormat("pt-BR", {}).format(
                    new Date(transaction.createdAt)
                  )
                )}
              </td>
              <td>
                {editingTransaction?.id === transaction.id ? (
                  <button onClick={() => handleSaveEdit()}>Salvar</button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(transaction)}>
                      <img src={pen} alt="Editar transação" />
                    </button>
                    <button onClick={() => handleDelete(transaction.id)}>
                      <img src={bin} alt="Excluir transação" />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
