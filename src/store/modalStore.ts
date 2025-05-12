// src/store/modalStore.ts

import { create } from "zustand";

type ModalStore = {
  isOpenAddPostModal: boolean;
  openAddPostModal: () => void;
  closeAddPostModal: () => void;

  isOpenSearchModal: boolean;
  openSearchModal: () => void;
  closeSearchModal: () => void;

  isOpenEditModal: boolean;
  openEditModal: () => void;
  closeEditModal: () => void;
};

const useModalStore = create<ModalStore>((set) => ({
  isOpenAddPostModal: false,
  openAddPostModal: () => set({ isOpenAddPostModal: true }),
  closeAddPostModal: () => set({ isOpenAddPostModal: false }),

  isOpenSearchModal: false,
  openSearchModal: () => set({ isOpenSearchModal: true }),
  closeSearchModal: () => set({ isOpenSearchModal: false }),

  isOpenEditModal: false,
  openEditModal: () => set({ isOpenEditModal: true }),
  closeEditModal: () => set({ isOpenEditModal: false }),
}));

export default useModalStore;
