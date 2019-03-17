const SYMBOL_TYPE = {
  ADD: "+",
  SUB: `-`,
  MUL: "*",
  DIV: `/`,
  EQU: "="
};
let symbol = SYMBOL_TYPE.ADD;

const FLAG_TYPE = {
  NUMBER: 0,
  OPERATOR: 1
};
let flag = FLAG_TYPE.NUMBER;

let total = "";
let currentValue = "";


const screen = document.getElementById("screen");

// 数字を入力
const inputValue = data => {
  if (currentValue.length <= 8) { // 入力できる最大文字数
    flag = FLAG_TYPE.NUMBER;
    currentValue += data;
    screen.textContent = currentValue;
  }
};

// 文字列から.を見つけ、入力を制限する
const inputDot = data => {
  if (!currentValue.includes(".")) {
    currentValue += data;
    screen.textContent = currentValue;
  }
};

// プラスマイナスの反転
const invert = () => {
  if (currentValue === "") { // 合計の数字を反転
    total = -total;
    screen.textContent = total;
  } else { // 入力した数字を反転
    currentValue = -currentValue;
    screen.textContent = currentValue;
  }
};

// 計算をする
const calculate = data => {
  if (flag === FLAG_TYPE.OPERATOR && data !== SYMBOL_TYPE.EQU) { // =を押した後数字を入力せず記号を押した
    symbol = data;
    return;
  }

  let formula;
  if (flag === FLAG_TYPE.NUMBER && data !== SYMBOL_TYPE.EQU) { // =以外の記号を押した
    flag = FLAG_TYPE.OPERATOR;
    formula = total + symbol + currentValue;
    symbol = data;
  } else if (flag === FLAG_TYPE.OPERATOR && data === SYMBOL_TYPE.EQU) { // =を２回以上連打した
    if (total < 0) {
      formula = total + symbol + -total;
    } else {
      formula = total + symbol + total;
    }
  } else if (data === SYMBOL_TYPE.EQU) { // =を一回押した
    flag = FLAG_TYPE.OPERATOR;
    formula = total + symbol + " " + currentValue; // " "はcurrentValueにマイナスの値が入っていた場合に必要
  }

  total = eval(formula);
  currentValue = "";
  screen.textContent = total;
};

const percent = () => {
  if (symbol === SYMBOL_TYPE.ADD || symbol === SYMBOL_TYPE.SUB) { // 足し算、引き算の場合の動作
    let formula = currentValue / 100;
    formula = total * formula;
    currentValue = eval(formula);

    screen.textContent = currentValue;
  } else { // それ以外(数字のみ、掛け算、割り算の動作)
    let formula = currentValue / 100;
    currentValue = eval(formula);

    screen.textContent = currentValue;
  }
};

// ACを押した場合の動作
const allClear = () => {
  symbol = SYMBOL_TYPE.ADD;
  total = "";
  currentValue = "";
  flag = FLAG_TYPE.NUMBER;
  screen.textContent = "0";
};
