import { create } from 'zustand';

// Adicionamos o 'editAd' na lista de modais permitidos
export type ModalType = 'login' | 'register' | 'createAd' | 'adDetail' | 'editAd' | null;

interface ModalState {
  modalData: any;
  activeModal: string | null;
  selectedAd?: any; // Informamos ao TS que modalData existe (usamos any para suportar diferentes modais)
  openModal: (modal: ModalType, data?: any) => void; // openModal agora aceita receber os dados
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  activeModal: null,
  modalData: null,
  
  // Quando abrimos um modal, guardamos também a informação (ex: os dados do anúncio)
  openModal: (modal, data = null) => set({ activeModal: modal, modalData: data }),
  
  // Quando fechamos, limpamos tudo
  closeModal: () => set({ activeModal: null, modalData: null }),
}));