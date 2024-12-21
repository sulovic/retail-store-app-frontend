"use client";
import { useFormStatus } from "react-dom";

type SubmitActionButtonProps = {
  buttonText: string;
  option?: "primary" | "secondary" | "tertiary" | "danger";
}

export default function SubmitActionButton({
  buttonText,
  option = "primary",
}: SubmitActionButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
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
      {pending ? "Učitavam..." : buttonText}
    </button>
  );
}
