import { create } from 'zustand';

interface MobileMenuState {
	isOpen: boolean;
	onClose: () => void;
	onOpen: () => void;
  toggle: () => void;
}

export const useMobileMenu = create<MobileMenuState>((set) => ({
	isOpen: false,
	onClose: () => set({ isOpen: false }),
	onOpen: () => set({ isOpen: true }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
