import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface Transaction {
  id: number;
  title: string;
  amount: number;
  category: string;
  createdAt: string;
  type: string;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
  deleteTransaction: (id: number) => Promise<void>;
  updateTransaction: (
    id: number,
    updatedTransaction: TransactionInput
  ) => Promise<void>;
}

interface TransactionInput {
  title: string;
  amount: number;
  category: string;
  type: string;
}

interface TransactionsProviderProps {
  children: React.ReactNode;
}

const TrasanctionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TrasanctionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api
      .get("transactions")
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post("/transactions", {
      ...transactionInput,
      createdAt: new Date(),
    });
    const { transaction } = response.data;

    setTransactions([...transactions, transaction]);
  }

  async function deleteTransaction(id: number) {
    await api.delete(`/transactions/${id}`);
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  }

  async function updateTransaction(
    id: number,
    updatedTransaction: TransactionInput
  ) {
    await api.put(`/transactions/${id}`, updatedTransaction);
    const updatedTransactions = transactions.map((transaction) =>
      transaction.id === id
        ? { ...transaction, ...updatedTransaction }
        : transaction
    );
    setTransactions(updatedTransactions);
  }

  return (
    <TrasanctionsContext.Provider
      value={{
        transactions,
        createTransaction,
        deleteTransaction,
        updateTransaction,
      }}
    >
      {children}
    </TrasanctionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TrasanctionsContext);

  return context;
}
