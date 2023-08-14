import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TrasanctionsProvider } from "./hook/useTransactions";
import Modal from "react-modal";

import { GlobalStyle } from "./styles/global";

Modal.setAppElement("#root");

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
    setEditingTransaction(null);
  }

  return (
    <TrasanctionsProvider>
      <Header />

      <Dashboard onOpenNewTransactionModal={handleOpenNewTransactionModal} />

      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
        editingTransaction={editingTransaction}
      />

      <GlobalStyle />
    </TrasanctionsProvider>
  );
}
