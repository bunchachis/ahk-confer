export const B1 = "1"
export const B2 = "2"
export const B3 = "3"
export const B4 = "4"
export const B5 = "5"
export const B6 = "6"
export const B7 = "7"
export const B8 = "8"
export const B9 = "9"
export const B0 = "0"
export const A = "A"
export const B = "B"
export const C = "C"
export const D = "D"
export const G = "~"
export const ML = "L"
export const MM = "M"
export const MR = "R"
export const MU = "N"
export const MD = "S"
export const M1 = "X"
export const M2 = "Y"
export const T = "T"

export const gamepadButtons = [B1, B2, B3, B4, B5, B6, B7, B8, B9, B0]
export const buttons = {B1, B2, B3, B4, B5, B6, B7, B8, B9, B0, A, B, C, D, G}
export const allMods = [
  "", G,
  G + A, G + B, G + C, G + D,
  G + A + B, G + B + C, G + C + D, G + A + D,
  A, B, C, D,
  A + B, B + C, C + D, A + D,
]
export const onlyMods = [A, B, C, D, G]
export const forbiddenMods = {[A]: C, [B]: D, [C]: A, [D]: B}

const ahkNames = {
  [B1]: "Joy1",
  [B2]: "Joy2",
  [B3]: "Joy3",
  [B4]: "Joy4",
  [B5]: "Joy5",
  [B6]: "Joy6",
  [B7]: "Joy7",
  [B8]: "Joy8",
  [B9]: "Joy9",
  [B0]: "Joy10",
  [ML]: "LButton",
  [MM]: "MButton",
  [MR]: "RButton",
  [MU]: "WheelUp",
  [MD]: "WheelDown",
  [M1]: "XButton1",
  [M2]: "XButton2",
}
export const ahkName = id => ahkNames[id]