"use client";

type ModalProps = {
  onOK: () => void;
  onCancel: () => void;
  title: string;
  question: string;
};

const Modal: React.FC<ModalProps> = ({ onOK, onCancel, title, question }) => {
  return (
    <div className="absolute inset-0 z-50">
      <div className="absolute inset-0 bg-zinc-500 bg-opacity-75 transition-opacity">
        <div className="absolute inset-0 flex items-center justify-center z-50">
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
                <button type="button" className="button button-primary" onClick={onOK}>
                  OK
                </button>
                <button type="button" className="button button-tertiary" onClick={onCancel}>
                  Odustani
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
