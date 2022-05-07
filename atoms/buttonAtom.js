import { atom } from "recoil";

export const currentShuffleState = atom({
  key: "currentShuffleState",
  default: null,
});

export const isShuffleState = atom({
  key: "isShuffleState",
  default: false,
});

export const repeatState = atom({
  key: "isRepeatState",
  default: "off",
});
