import { create } from 'zustand';
import type { Ad } from '../types/Ad';

interface AdState {
  ads: Ad[];
  setAds: (ads: Ad[]) => void;
  addAd: (ad: Ad) => void;
  removeAd: (id: string) => void;
  updateAd: (updatedAd: Ad) => void;
}

export const useAdStore = create<AdState>((set) => ({
  ads: [],
  setAds: (ads) => set({ ads }),
  addAd: (newAd) => set((state) => ({ ads: [newAd, ...state.ads] })),
  
  // Novas funções para Deletar e Editar
  removeAd: (id) => set((state) => ({ ads: state.ads.filter(ad => ad.id !== id) })),
  updateAd: (updatedAd) => set((state) => ({
    ads: state.ads.map(ad => ad.id === updatedAd.id ? updatedAd : ad)
  })),
}));