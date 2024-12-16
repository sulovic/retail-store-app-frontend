"use client";
import { useFormStatus } from "react-dom";

export default function SubmitFormButton({ buttonText }: { buttonText: string }) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="button button-sky">
      {pending ? "Učitavam..." : buttonText}
    </button>
  );
}
