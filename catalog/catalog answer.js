const fs = require('fs');

const d = JSON.parse(fs.readFileSync('./data/input.json', 'utf8'));
const { n, k } = d.keys;

const points = [];

for (const [index, point] of Object.entries(d)) {
  if (index !== 'keys' && point && point.value && point.base) {
    points.push({ x: parseInt(index), y: parseInt(point.value, point.base) });
  }
}

function computePolynomialValue(x, coordinates) {
  let result = 0;
  for (const { x: xi, y: yi } of coordinates) {
    let basis = 1;
    for (const { x: xj } of coordinates) {
      if (xi !== xj) {
        basis *= (x - xj) / (xi - xj);
      }
    }
    result += yi * basis;
  }
  return result;
}

const interpolatedValue = computePolynomialValue(0, points);
console.log(`Interpolated value at x = 0: ${interpolatedValue}`);