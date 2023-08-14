import Modal from "react-modal";
import { FormEvent, useState, useEffect } from "react";
import { useTransactions } from "../../hook/useTransactions";

import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import closeImg from "../../assets/close.svg";

import { Container, RadioBox, TransactionTypeContainer } from "./styles";

interface Transaction {
  id: number;
  title: string;
  amount: number;
  category: string;
  createdAt: string;
  type: string;
}

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  editingTransaction?: Transaction | null;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
  editingTransaction,
}: NewTransactionModalProps) {
  const { createTransaction, updateTransaction } = useTransactions();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("deposit");

  useEffect(() => {
    if (editingTransaction) {
      setTitle(editingTransaction.title);
      setAmount(editingTransaction.amount);
      setCategory(editingTransaction.category);
      setType(editingTransaction.type);
    }
  }, [editingTransaction]);

  async function handleCreateOrUpdateTransaction(event: FormEvent) {
    event.preventDefault();

    if (editingTransaction) {
      await updateTransaction(editingTransaction.id, {
        title,
        amount,
        category,
        type,
      });
    } else {
      await createTransaction({
        title,
        amount,
        category,
        type,
      });
    }

    setTitle("");
    setAmount(0);
    setCategory("");
    setType("deposit");

    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateOrUpdateTransaction}>
        <h2>
          {editingTransaction ? "Editar transação" : "Cadastrar transação"}
        </h2>

        <input
          placeholder="Título"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setType("deposit")}
            isActive={type === "deposit"}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={() => setType("withdraw")}
            isActive={type === "withdraw"}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="Categoria"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />

        <button type="submit">
          {editingTransaction ? "Salvar" : "Cadastrar"}
        </button>
      </Container>
    </Modal>
  );
}
