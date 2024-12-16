"use client";

import type { ModalProps } from "@/types/types";

const Modal: React.FC<ModalProps> = ({ onOK, onCancel, title, question }) => {
  return (
    <div className="relative z-40">
      <div className="fixed inset-0 bg-zinc-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <div className="relative w-full max-w-xl transform overflow-hidden rounded-lg bg-white p-4 text-left shadow-xl transition-all sm:p-8 dark:bg-zinc-800">
            <div className="w-full sm:mt-0">
              <div className="text-left">
                <h5>{title}</h5>
                <div className="my-4 h-0.5 w-full bg-zinc-400"></div>
                <div className="my-2">
                  <p>{question}</p>
                </div>
                <div className="my-4 h-0.5 w-full bg-zinc-400"></div>
              </div>
            </div>
            <div className="flex flex-row-reverse gap-2">
              <button
                type="button"
                className="button button-sky"
                onClick={onOK}
              >
                OK
              </button>
              <button
                type="button"
                className="button button-zinc"
                onClick={onCancel}
              >
                Odustani
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
