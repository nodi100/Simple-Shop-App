import { ReactNode } from "react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  closeBtnText?: string;
  children: ReactNode;
}
