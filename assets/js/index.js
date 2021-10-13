"use strict";

const body = document.body,
  div = body.querySelector(".div"),
  li = body.querySelectorAll("li"),
  inputR = body.querySelector('input[name="red"]'),
  inputG = body.querySelector('input[name="green"]'),
  inputB = body.querySelector('input[name="blue"]'),
  inputA = body.querySelector('input[name="alpha"]'),
  optionValue = body.querySelector('select[name="option"]'),
  saveBtn = body.querySelector("#save");
saveBtn.addEventListener("click", addStyle);
class RGB {
  constructor(alpha, ...arg) {
    arg.forEach((el) => {
      if (isNaN(el)) throw new TypeError("color value must be a number");
      if (el < 0 || el > 255)
        throw RangeError("Value must be bigger than 0 and less than 255");
      if (!Number.isInteger(el)) throw RangeError("Value must be integer");
    });
    if (alpha < 0 || alpha > 10)
      throw RangeError("Value must be bigger than 0 and less than 10");
    if (isNaN(alpha)) throw new TypeError("color value must be a number");
    if (!Number.isInteger(alpha)) throw RangeError("Value must be integer");
    this.colors = arg;
    this.alpha = alpha;
  }

  getColor() {
    let [r, g, b] = this.colors;

    return `rgb(${r},${g},${b},${this.alpha / 10})`;
  }

  setColor() {
    switch (optionValue.value) {
      case "body":
        body.style["background-color"] = this.getColor();
        break;
      case "div":
        div.style["background-color"] = this.getColor();
        break;
      case "li":
        li.forEach((el) => (el.style["background-color"] = this.getColor()));
        break;
    }
  }
}

function addStyle(event) {
  event.preventDefault();
  try {
    new RGB(
      Number(inputA.value),
      Number(inputR.value),
      Number(inputG.value),
      Number(inputB.value)
    ).setColor();
  } catch (e) {
    console.log(e);
  }
  inputA.value = "";
  inputB.value = "";
  inputG.value = "";
  inputR.value = "";
}
