"use client";
import { useFormStatus } from "react-dom";

export default function SubmitFormButton({
  buttonText,
  option = "primary",
}: {
  buttonText: string;
  option?: "primary" | "secondary" | "tertiary" | "danger";
}) {
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
