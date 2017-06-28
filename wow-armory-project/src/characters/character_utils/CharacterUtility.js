let gender_map = [
    { id: "0", gender: "Male" },
    { id: "1", gender: "Female" }
];

let race_map = [
    { id: 1, race: "temp" },
    { id: 2, race: "Orc" },
    { id: 3, race: "temp" },
    { id: 4, race: "temp" },
    { id: 5, race: "Undead" },
    { id: 6, race: "Tauren" },
    { id: 7, race: "temp" },
    { id: 8, race: "Troll" },
    { id: 9, race: "Goblin" },
    { id: 10, race: "Blood Elf" },
    { id: 26, race: "Pandarian" }
];

let class_map = [
    { id: 1, class: "Warrior" },
    { id: 2, class: "Paladin" },
    { id: 3, class: "Hunter" },
    { id: 4, class: "Rogue" },
    { id: 5, class: "Priest" },
    { id: 6, class: "Death Knight" },
    { id: 7, class: "Shaman" },
    { id: 8, class: "Mage" },
    { id: 9, class: "Warlock" },
    { id: 10, class: "Monk" },
    { id: 11, class: "Druid" },
    { id: 12, class: "Demon Hunter" },
];


/* Converts class api code into string */
export function convertClass(members) {
    let classConvert = members;
    console.log(class_map.length);
    for (var i = 0; i < classConvert.length; i++) {
        for (var j = 0; j < class_map.length; j++) {
            if (class_map[j].id === members[i].class) {
                classConvert[i].class = class_map[j].class;
                break;
            }
        }
    }
    return classConvert;
}

/* Converts race api code into string race */
export function convertRace(members) {
    let raceConvert = members;
    for (var i = 0; i < raceConvert.length; i++) {
        for (var j = 0; j < race_map.length; j++) {
            if (race_map[j].id === members[i].race) {
                raceConvert[i].race = race_map[j].race;
                break;
            }
        }
    }
    return raceConvert;
}

/* Converts gender api code into string */
export function convertGender(members) {
    let genderConvert = members;
    for (var i = 0; i < members.length; i++) {

        if (gender_map[0].id === genderConvert[i].gender) {
            genderConvert[i].gender = gender_map[0].gender;
        } else {
            genderConvert[i].gender = gender_map[1].gender;
        }
    }
    return genderConvert;
}

export function convertGenderAndRaceToString(members) {
    let gender_convert = convertGender(members);
    let race_convert   = convertRace(members);
    let class_convert  = convertClass(members);
    for (var i = 0; i < members.length; i++) {
        members[i].class = class_convert[i].class;
        members[i].race  = race_convert[i].race;
    }
    return members;
} 
 export function stripUneededDetails(members) {
    let temp = [];
    console.log(members);
    for (let i = 0; i < members.length; i++) {
      temp.push({
        id: i,
        name:              members[i].character.name,
        race:              members[i].character.race,
        achievementPoints: members[i].character.achievementPoints,
        thumbnail:         'http://us.battle.net/static-render/us/' + members[i].character.thumbnail,
        class:             members[i].character.class,
        gender:            members[i].character.gender.achievementPoints
      });
    }
    return temp;
  }

