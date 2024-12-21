import { ReactNode } from "react";

export default function UsersLayout({ children, modal }: { children: ReactNode; modal: ReactNode }) {
  return (
    <div>
      {/* Main Content */}
      {children}

      {/* Modal */}
      {modal}
    </div>
  );
}
