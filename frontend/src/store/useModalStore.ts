import { create } from 'zustand';
import type { Ad } from '../types/ad';

type ModalType = 'login' | 'register' | 'createAd' | 'adDetail' | null;

interface ModalState {
  activeModal: ModalType;
  selectedAd: Ad | null;
  openModal: (modal: ModalType, ad?: Ad | null) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  activeModal: null,
  selectedAd: null,
  openModal: (modal, ad = null) => set({ activeModal: modal, selectedAd: ad }),
  closeModal: () => set({ activeModal: null, selectedAd: null }),
}));