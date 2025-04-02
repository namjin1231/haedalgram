// src/store/userStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TUser } from "../types";

type UserStore = {
  isLoggedIn: boolean;
  login: (user: TUser) => void;
  logout: () => void;

  user: TUser | null;
  setUser: (user: TUser) => void;
};

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      //기본 상태
      login: (user: TUser) =>
        set({
          isLoggedIn: true,
          user: user,
        }),
        //로그인 함수
      logout: () =>
        set({
          isLoggedIn: false,
          user: null,
        }),
        //로그아웃 함수
      
      setUser: (user: TUser) => set({ user: user }),
      //유저 정보 갱신할 때 사용함함함
    }),
    
    {
      name: "userStorage",
    }
  )
);


export default useUserStore;
