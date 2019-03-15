let symbol = "+";
let total = "";
let currentValue = "";
let flag = 0; // 数字 = 0, 演算子 = 1

const screen = document.getElementById("screen");

// 数字を入力
const inputValue = data => {
  if (currentValue.length <= 8) { // 入力できる最大文字数
    flag = 0;
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
const inverted = () => {
  if (currentValue === "") { // 合計の数字を反転
    total = -total;
    screen.textContent = total;
  } else { // 入力した数字を反転
    currentValue = -currentValue;
    screen.textContent = currentValue;
  }
};

// 計算をする
const calclation = data => {
  if (flag === 0 && data !== "=") { // =以外の記号を押した
    flag = 1;

    let formula = total + symbol + currentValue;
    total = eval(formula);

    symbol = data;
    currentValue = "";
    screen.textContent = total;

  } else if (flag === 1 && data === "=") { // =を２回以上連打した
    let formula = total + symbol + total;
    total = eval(formula);

    currentValue = "";
    screen.textContent = total;

  } else if (data === "=") { // =を一回押した
    flag = 1;

    let formula = total + symbol + currentValue;
    total = eval(formula);

    currentValue = "";
    screen.textContent = total;

  } else { // =を押した後数字を入力せず記号を押した
    symbol = data;
  }
};

const percent = () => {
  if(symbol === "+" || symbol === "-") { // 足し算、引き算の場合の動作
   let formula = currentValue / 100;
   formula = total * formula;
   currentValue = eval(formula);
   
   screen.textContent = currentValue;
 }else { // それ以外(数字のみ、掛け算、割り算の動作)
   let formula = currentValue / 100;
   currentValue = eval(formula);

   screen.textContent = currentValue;
 }
};


// ACを押した場合の動作
const allCrear = () => {
  symbol = "+";
  total = "";
  currentValue = "";
  flag = 0;
  screen.textContent = "0";
};
