/**
 * Extend the base Actor entity by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class HackmasterActor extends Actor {

  /**
   * Augment the basic actor data with additional dynamic data.
   */
  prepareData() {
    super.prepareData();

    const actorData = this.data;
    const data = actorData.data;
    const flags = actorData.flags;

    // Make separate methods for each Actor type (character, npc, etc.) to keep
    // things organized.
    if (actorData.type === 'character') this._prepareCharacterData(actorData);
  }

  /**
   * Prepare Character type specific data
   */
  _prepareCharacterData(actorData) {
    const data = actorData.data;

    /*
    // Make modifications to data here. For example:
    // Loop through ability scores, and add their modifiers to our sheet output.
    for (let [key, ability] of Object.entries(data.abilities)) {
      // Calculate the modifier using d20 rules.
      ability.mod = Math.floor((ability.value - 10) / 2);
    }*/

    const strEntry = getTableEntry(strTable, data.abilities.str);
    data.abilities.str.dmg_mod = strEntry[2];
    data.abilities.str.feat_of_str = strEntry[3];
    data.abilities.str.lift = strEntry[4];
    data.abilities.str.carry.none = Math.round(strEntry[5] / 6);
    data.abilities.str.carry.light = Math.round(strEntry[5] / 3);
    data.abilities.str.carry.medium = Math.round(2 * strEntry[5] / 3);
    data.abilities.str.carry.heavy = strEntry[5];
    data.abilities.str.drag = strEntry[6];

    const intEntry = getTableEntry(intTable, data.abilities.int);
    data.abilities.int.atk_mod = intEntry[2];

    const wisEntry = getTableEntry(wisTable, data.abilities.wis);
    data.abilities.wis.init_mod = wisEntry[2];
    data.abilities.wis.def_mod = wisEntry[3];
    data.abilities.wis.mental_save_mod = wisEntry[4];

    const dexEntry = getTableEntry(dexTable, data.abilities.dex);
    data.abilities.dex.init_mod = dexEntry[2];
    data.abilities.dex.atk_mod = dexEntry[3];
    data.abilities.dex.def_mod = dexEntry[4];
    data.abilities.dex.dodge_save_mod = dexEntry[5];
    data.abilities.dex.feat_of_agi = dexEntry[6];

    const conEntry = getTableEntry(conTable, data.abilities.con);
    data.abilities.con.physical_save_mod = conEntry[2];

    const chaEntry = getTableEntry(chaTable, data.abilities.cha);
    data.abilities.cha.turning_mod = chaEntry[2];
    data.abilities.cha.morale_mod = chaEntry[3];
  }
};

function getTableEntry(table, ability) {
  for (let entry of table) {
    if ((ability.whole > entry[0]) ||
        (ability.whole == entry[0] && ability.frac >= entry[1])) {
      return entry;
    }
  }
  return Array(table[0].length).fill(0);
}
const strTable = [[20, 51, 7, 18, 675, 384, 1688],
  [20, 1, 6, 17, 612, 347, 1530],
  [19, 51, 6, 16, 554, 314, 1385],
  [19, 1, 5, 15, 504, 284, 1260],
  [18, 51, 5, 14, 458, 257, 1145],
  [18, 1, 4, 13, 417, 234, 1043],
  [17, 51, 4, 12, 380, 213, 950],
  [17, 1, 4, 11, 347, 194, 868],
  [16, 51, 3, 10, 318, 177, 795],
  [16, 1, 3, 9, 291, 162, 728],
  [15, 51, 3, 8, 267, 149, 668],
  [15, 1, 2, 7, 245, 137, 613],
  [14, 51, 2, 6, 240, 126, 600],
  [14, 1, 2, 5, 235, 116, 588],
  [13, 51, 1, 4, 230, 107, 575],
  [13, 1, 1, 3, 225, 99, 563],
  [12, 51, 1, 2, 220, 92, 550],
  [12, 1, 1, 1, 215, 84, 538],
  [11, 51, 0, 0, 210, 78, 525],
  [11, 1, 0, 0, 205, 72, 513],
  [10, 51, 0, 0, 200, 68, 500],
  [10, 1, 0, 0, 194, 66, 485],
  [9, 51, -1, -1, 187, 65, 468],
  [9, 1, -1, -2, 181, 63, 453],
  [8, 51, -1, -3, 173, 60, 433],
  [8, 1, -1, -3, 166, 59, 415],
  [7, 51, -2, -4, 157, 57, 393],
  [7, 1, -2, -5, 149, 54, 373],
  [6, 51, -2, -5, 140, 51, 350],
  [6, 1, -3, -6, 130, 48, 325],
  [5, 51, -3, -7, 120, 47, 300],
  [5, 1, -3, -7, 110, 44, 275],
  [4, 51, -4, -8, 99, 39, 248],
  [4, 1, -4, -9, 88, 36, 220],
  [3, 51, -4, -9, 76, 33, 190],
  [3, 1, -5, -10, 64, 30, 160],
  [2, 51, -5, -11, 58, 27, 145],
  [2, 1, -6, -12, 52, 24, 130],
  [1, 51, -6, -13, 42, 20, 105],
  [1, 1, -7, -14, 32, 15, 80]];
const intTable = [[18, 1, 3],
  [15, 1, 2],
  [12, 1, 1],
  [10, 1, 0],
  [7, 1, -1],
  [4, 1, -2],
  [3, 1, -3],
  [2, 1, -4],
  [1, 1, -5]];
const wisTable = [[18, 1, -1, 3, 3],
  [15, 1, 0, 2, 2],
  [13, 1, 1, 1, 1],
  [12, 1, 1, 1, 0],
  [10, 1, 2, 0, 0],
  [9, 1, 3, -1, 0],
  [7, 1, 3, -1, -1],
  [5, 1, 4, -2, -2],
  [4, 1, 4, -2, -3],
  [3, 1, 5, -3, -3],
  [2, 1, 6, -3, -4],
  [1, 1, 7, -4, -4]];
const dexTable = [[20, 51, -5, 5, 7, 3, 18],
  [20, 1, -4, 5, 6, 3, 17],
  [19, 51, -4, 4, 6, 3, 16],
  [19, 1, -4, 4, 6, 3, 15],
  [18, 51, -3, 4, 5, 3, 14],
  [18, 1, -3, 4, 5, 3, 13],
  [17, 51, -3, 3, 5, 2, 12],
  [17, 1, -2, 3, 4, 2, 11],
  [16, 51, -2, 3, 4, 2, 10],
  [16, 1, -2, 3, 4, 2, 9],
  [15, 51, -1, 2, 3, 2, 8],
  [15, 1, -1, 2, 3, 2, 7],
  [14, 51, -1, 2, 3, 1, 6],
  [14, 1, 0, 2, 2, 1, 5],
  [13, 51, 0, 1, 2, 1, 4],
  [13, 1, 0, 1, 2, 1, 3],
  [12, 51, 1, 1, 1, 0, 2],
  [12, 1, 1, 1, 1, 0, 1],
  [11, 51, 1, 0, 1, 0, 0],
  [10, 1, 2, 0, 0, 0, 0],
  [9, 51, 3, 0, -1, 0, -1],
  [9, 1, 3, -1, -1, 0, -2],
  [8, 51, 3, -1, -1, -1, -3],
  [8, 1, 4, -1, -2, -1, -3],
  [7, 51, 4, -4, -2, -1, -4],
  [7, 1, 4, -2, -2, -1, -5],
  [6, 51, 5, -2, -3, -2, -5],
  [6, 1, 5, -2, -3, -2, -6],
  [5, 51, 5, -2, -3, -2, -7],
  [5, 1, 6, -3, -4, -2, -7],
  [4, 51, 6, -3, -4, -3, -8],
  [4, 1, 6, -3, -4, -3, -9],
  [3, 51, 7, -3, -5, -3, -9],
  [3, 1, 7, -4, -5, -3, -10]];
const conTable = [[21, 1, 4],
  [18, 1, 3],
  [15, 1, 2],
  [13, 1, 1],
  [9, 1, 0],
  [7, 1, -1],
  [5, 1, -2],
  [3, 1, -3],
  [2, 1, -4],
  [1, 1, -5]]
const chaTable = [[22, 1, 12, 6],
  [21, 1, 11, 6],
  [20, 1, 10, 5],
  [19, 1, 9, 5],
  [18, 1, 8, 4],
  [17, 1, 7, 4],
  [16, 1, 6, 3],
  [15, 1, 5, 3],
  [14, 1, 4, 2],
  [13, 1, 3, 2],
  [12, 1, 2, 1],
  [11, 1, 1, 1],
  [10, 1, 0, 0],
  [9, 1, -1, -1],
  [8, 1, -2, -1],
  [7, 1, -3, -2],
  [6, 1, -4, -2],
  [5, 1, -5, -3],
  [4, 1, -6, -3],
  [3, 1, -7, -4],
  [2, 1, -8, -4],
  [1, 1, -9, -5]];