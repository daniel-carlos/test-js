type WinningCombinationsResult = [number, number[]][];

const payingSymbols = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const nonPayingSymbols = [10, 11, 12, 13, 14, 15];

// all groups of matching positions for symbols
const sightGroups5 = [
  [0, 1, 2, 3, 4],
  [0, 1, 2, 3],
  [1, 2, 3, 4],
  [0, 1, 2],
  [1, 2, 3],
  [2, 3, 4],
];
const sightGroups6 = [
  [0, 1, 2, 3, 4, 5],
  [0, 1, 2, 3, 4],
  [1, 2, 3, 4, 5],
  [0, 1, 2, 3],
  [1, 2, 3, 4],
  [2, 3, 4, 5],
  [0, 1, 2],
  [1, 2, 3],
  [2, 3, 4],
  [3, 4, 5],
];

// group of contiguous symbols 
const sightWindow = (lines: number[], sightGroup: number[]) => {
  return sightGroup.map((pos) => lines[pos]);
};

// retreaves the first paying symbol of a window
const getSymbol = (window: number[]): number => {
  return window.find((s) => s !== 0 && payingSymbols.includes(s)) || -1;
};

// determine if given window is a win
const windowValidate = (window: number[], symbol: number): boolean => {
  return window.every((s) => {
    return s === symbol || s === 0; // consider 0 as wildcard
  });
};

function call(lines: number[]): WinningCombinationsResult {
  // handling borderline cases
  if (lines.every((l) => l === 0)) {
    if (lines.length === 5) return [[0, [0, 1, 2, 3, 4]]];
    else return [[0, [0, 1, 2, 3, 4, 5]]];
  }

  let output: WinningCombinationsResult = [];

  const sightGroups = lines.length === 5 ? sightGroups5 : sightGroups6;

  sightGroups.forEach((sg) => {
    const sw = sightWindow(lines, sg);
    if (!sw.every((l) => l === 0)) {
      const symbol = getSymbol(sw);
      if (windowValidate(sw, symbol)) {
        if (!output.find((o) => o[0] === symbol)) {
          output.push([symbol, sg]);
        }
      }
    }
  });

  return output.sort((a, b) => a[0] - b[0]);
}

export const WinningCombinations = { call };
