"use strict";

const values = [
  ["8" + 2],
  ["8" - 2],
  [Number("8") + 2],
  ["12" > "3"],
  [12 === "12"],
  [Number("")],
  [Number("text")],
  [Boolean("false")],
  [typeof null],
  [typeof NaN],
];

values.forEach(([value], index) => {
  console.log(`${index + 1}. Значение:`, value, "| Тип:", typeof value);
});
