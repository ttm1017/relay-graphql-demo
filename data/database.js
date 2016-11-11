const LUKE = {
  id: 1,
  name: "LUKE",
  friends: [2,3]
};
const R2D2 = {
  id: 2,
  name: "R2D2",
  friends:[1,3,4]
};
const C3PO = {
  id: 3,
  name: "C3PO",
  friends: [1,2,4]
};
const CHEW = {
  id: 4,
  name: "CHEWBACCA",
  friends: [2,3]
};
const characters = {
  1: LUKE,
  2:R2D2,
  3: C3PO,
  4: CHEW
}
export function getLUKE () {
  return LUKE;
}
export function getCharacter(id) {
  return characters[id]
}
export function getAllCharacter() {
  return characters;
}

const oldPublic = {
  id: 1,
  period: 'old republic',
  number: 3500
};
const riseOfEmprie = {
  id: 2,
  period: 'Rise of the Empire',
  number: 6000
};
const rebillion = {
  id: 3,
  period: 'Rebillion',
  number: 5000
};
const PeriodCharactors = {
  1: oldPublic,
  2: riseOfEmprie,
  3: rebillion
}
export function getPeriodCharactors () {
  return [oldPublic,riseOfEmprie,rebillion]
}
export function getPeriodCharactor (id) {
  return PeriodCharactors[id];
}
const data = {
  characters,
  PeriodCharactors
}
export function getData() {
  return data;
}