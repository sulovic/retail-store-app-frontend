"use client";
import { useState } from "react";
import Modal from "../Modal";

type SubmitActionButtonProps = {
  buttonText: string;
  option?: "primary" | "secondary" | "tertiary" | "danger";
  action: (props: any) => Promise<void>;
  actionProps: any;
};

export default function SubmitActionButton({
  buttonText,
  option = "primary",
  action,
  actionProps,
}: SubmitActionButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [executing, setExecuting] = useState(false);

  const executeAction = async () => {
    setExecuting(true);
    setShowModal(false);
    await action(actionProps);
    setExecuting(false);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        disabled={executing}
        className={`button ${
          option === "danger"
            ? "button-danger"
            : option === "secondary"
            ? "button-secondary"
            : option === "tertiary"
            ? "button-tertiary"
            : "button-primary"
        } `}
      >
        {executing ? "Učitavam..." : buttonText}
      </button>
      {showModal && (
        <Modal
          onOK={() => executeAction()}
          onCancel={() => setShowModal(false)}
          title={"UPOZORENJE!"}
          question={"Da li ste sigurni da zelite da izvršite ovu akciju?"}
        />
      )}
    </>
  );
}
