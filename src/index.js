import * as Grid from './models/grid';
import solve, { clearCandidates, populateCandidates } from './lib/solver';

const createTable = (grid) => {
  const puzzle = document.createElement('div');
  puzzle.className = 'puzzle';

  grid.cells.forEach((cell) => {
    const c = document.createElement('div');
    c.className = [
      'cell',
    ].concat(cell.number > 0 ? [] : 'unsolved').join(' ');

    const number = document.createElement('input');
    number.value = cell.number || '';
    number.placeholder = 'empty';
    number.className = 'number';

    c.appendChild(number);

    if (cell.candidates.length > 0) {
      const candidates = document.createElement('div');
      candidates.className = 'candidates';
      candidates.innerHTML = cell.candidates.join(', ');

      c.appendChild(candidates);
    }

    puzzle.appendChild(c);
  });

  return puzzle;
};

const puzzleDebugger = () => {
  let parent = null;
  return (grid) => {
    if (parent) {
      parent.remove();
    }
    parent = createTable(grid);
    document.body.appendChild(parent);
    return grid;
  };
};

let puzzleCount = 0;
const initGrid = () => {
  puzzleCount += 1;
  return populateCandidates(clearCandidates(Grid.create()));
}

const debug = puzzleDebugger();
let grid = debug(initGrid());
let interval = null;
const times = [];
let unsolvableCount = 0;

const handleButtonStates = () => {
  document.querySelector('#auto').disabled = !!interval;
  document.querySelector('#stop').disabled = !interval;
};

const hasUnsolved = grid => grid.cells.some(c => !c.number);

const stop = () => {
  clearInterval(interval);
  interval = null;
  handleButtonStates();
};

const tick = () => {
  grid = debug(solve(grid));
  if (!hasUnsolved(grid)) {
    stop();
  }
  return grid;
}

const start = () => {
  interval = setInterval(tick, 0);
  handleButtonStates();
};

const handleUnsolvable = grid => (err) => {
  unsolvableCount += 1;
  err.grid = grid;
  throw err;
};

const solvePromise = initialGrid => (
  hasUnsolved(initialGrid)
    ? Promise.resolve(initialGrid).then(solve).catch(handleUnsolvable(initialGrid)).then(solvePromise)
    : Promise.resolve(initialGrid)
);

const solveAll = () => {
  const startedAt = Date.now();
  const stats = (nextGrid) => {
    const time = Date.now() - startedAt;
    times.push(time);
    const average = times.reduce((avg, t) => (avg + t) / 2.0, times[0]);
    const min = Math.min(...times);
    const max = Math.max(...times);
    const element = document.querySelector('#time');
    element.innerText = `${average}  [${min}/${max}]`;
    element.title = `${times.length} runs: ${times.join('ms, ')}ms`;
    document.querySelector('#unsolvable').innerText = `${unsolvableCount} unsolvable puzzles of ${puzzleCount}`;
    grid = debug(nextGrid);
  };
  return solvePromise(initGrid())
    .then((solvedGrid) => {
      stats(solvedGrid);
    })
    .catch((err) => {
      if (err.grid) {
        stats(err.grid);
      } else {
        console.error(err);
      }
    });
};

document.querySelector('#new').addEventListener('click', () => {
  stop();
  grid = debug(populateCandidates(clearCandidates(Grid.create())));
});

document.querySelector('#next').addEventListener('click', () => {
  tick();
});

document.querySelector('#solve').addEventListener('click', () => {
  solveAll();
});

document.querySelector('#auto').addEventListener('click', () => {
  start();
});

document.querySelector('#stop').addEventListener('click', () => {
  stop();
});

handleButtonStates();
