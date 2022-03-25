

export function getInitialCards(numDecks) {
  const cards = [];

  for (let i = 0; i < 13; i++) {
    cards.push((numDecks || 1) * 4);
  }

  return cards;
}

export function getCardName(index) {
  return [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
    'A',
  ][index];
}

export function getRunningCountValue(index) {
  return [
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    -1,
    -1,
    -1,
    -1,
    -1,
  ][index];
}

export function getCardValue(index) {
  return [
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    10,
    10,
    10,
    11,
  ][index];
}

export function sumAll() {
  let i;
  let sum = 0;
  for (i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
}

/**
 * a
 * 2
 * 3
 * 4
 * 5
 * 6
 * 7
 * 8
 * 9
 * 10
 * j
 * q
 * k
 */
