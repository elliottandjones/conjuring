import React from 'react';

const CreatureDetail = ({ creature, isDisplaying, modifier }) => {
  const whatSkills = (creature) => {
    let skills = "";
    if (creature.acrobatics) { skills += `Perception +${creature.acrobatics} `; }
    if (creature.animal_handling) { skills += `Animael Handling +${creature.animal_handling} `; }
    if (creature.arcana) { skills += `Arcana +${creature.arcana} `; }
    if (creature.athletics) { skills += `Athletics +${creature.athletics} `; }
    if (creature.deception) { skills += `Deception +${creature.deception} `; }
    if (creature.history) { skills += `History +${creature.history} `; }
    if (creature.insight) { skills += `Insight +${creature.insight} `; }
    if (creature.intimidation) { skills += `Intimidation +${creature.intimidation} `; }
    if (creature.investigation) { skills += `Investigation +${creature.investigation} `; }
    if (creature.medicine) { skills += `Medicine +${creature.medicine} `; }
    if (creature.nature) { skills += `Nature +${creature.nature} `; }
    if (creature.perception) { skills += `Perception +${creature.perception} `; }
    if (creature.performance) { skills += `Performance +${creature.performance} `; }
    if (creature.persuasion) { skills += `Persuasion +${creature.persuasion} `; }
    if (creature.religion) { skills += `Religion +${creature.religion} `; }
    if (creature.sleight_of_hand) { skills += `Sleight of Hand +${creature.sleight_of_hand} `; }
    if (creature.stealth) { skills += `Stealth +${creature.stealth} `; }
    if (creature.survival) { skills += `Survival +${creature.survival} `; }
    return skills;
  }

  return isDisplaying !== false
    ? (
      <div className="dib pa2 ccard hotem" style={{ overflowY: 'scroll', width: '100%' }} >
        <p className="ma1 derk fira" style={{ fontSize: '1.5em' }}>
          {creature.name}
        </p>
        {
          creature.subtype
            ? <p className="i ma1">{creature.size} {creature.type} ({creature.subtype}), {creature.alignment}</p>
            : <p className="i ma1">{creature.size} {creature.type}, {creature.alignment}</p>
        }
        <hr className="left" />
        <p><b className="mr2">Armor Class</b> {creature.armor_class}</p>
        <p><b className="mr2">Hit Points</b> {creature.hit_points} ({creature.hit_dice})</p>
        <p><b className="mr2">Speed</b> {creature.speed}</p>
        <hr className="left-sm" style={{ marginBottom: '-10px' }} /><hr className="right-sm" />
        <div className="tc ability-scores">
          <div><b>STR</b></div><div><b>DEX</b></div><div><b>CON</b></div><div><b>INT</b></div><div><b>WIS</b></div><div><b>CHA</b></div>
          <div>{creature.strength} {modifier(creature.strength)}</div>
          <div>{creature.dexterity} {modifier(creature.dexterity)}</div>
          <div>{creature.constitution} {modifier(creature.constitution)}</div>
          <div>{creature.intelligence} {modifier(creature.intelligence)}</div>
          <div>{creature.wisdom} {modifier(creature.wisdom)}</div>
          <div>{creature.charisma} {modifier(creature.charisma)}</div>
        </div>
        <hr className="left-sm" style={{ marginBottom: '-10px' }} /><hr className="right-sm" />
        {whatSkills(creature).length > 0 ? <p><b>Skills</b> {whatSkills(creature)}</p> : ''}
        <p><b>Senses</b> {creature.senses}</p>
        {creature.languages ? <p><b>Languages</b> {creature.languages}</p> : ''}
        <p><b>Challenge</b> {creature.challenge_rating}</p>
        <hr className="left" />
        {
          creature.special_abilities
            ? (
              creature.special_abilities.map((ability, i) => {
                return (<p key={i + 898989}><b><i>{ability.name}.</i></b> {ability.desc}</p>);
              })
            ) : ''
        }
        <p className="pactions">Actions</p>
        <hr className="skinny" />
        {
          creature.actions
            ? (
              creature.actions.map((action, i) => {
                return (<p key={i + 101010}><b><i>{action.name}.</i></b> {action.desc}</p>);
              })
            ) : ''
        }
        {
          creature.legendary_actions
            ? (
              <div>
                <p className="pactions">Legendary Actions</p>
                <hr className="skinny" />
                {creature.legendary_actions.map((action, i) => {
                  return (<p key={i + 6616161}><b><i>{action.name}.</i></b> {action.desc}</p>);
                })}
              </div>

            ) : ''
        }
      </div>
    )
    : (
      <div className="ccard hotem">
        <h3 className="derk tc fira" style={{ fontSize: '1.3em' }}>Select a Creature!</h3>
        <hr className="left" />
        <p className="i tc pa1 ma1 fira" style={{ fontSize: '1.1em' }}>"Zounds--I say! You, there! This! Summon this creature at once! C'mon, you--yes, YOU! Go--now--do it! Summon it--Summon. it. Summon it, summon it, summonitsummonitSUMMONITSUMMONIIIIIIIIIT!"</p>
        <hr className="left-sm" />
        <hr className="right-sm" />
        <p className="pa2 ma3">-- Mephistopheles to a startled conjuration research conclave, impatiently waving a scrap of paper on which appeared a hastily drawn image of a long-eared, yellow creature with red circles on its cheeks, as well as one line of text at the bottom reading '-chuuuuu'</p>
        <hr className="right" />
      </div>
    );
}

export default CreatureDetail;

// {
//  "index": 107,
//  "name": "Flying Snake",
//  "size": "Tiny",
//  "type": "beast",
//  "subtype": "",
//  "alignment": "unaligned",
//  "armor_class": 14,
//  "hit_points": 5,
//  "hit_dice": "2d4",
//  "speed": "30 ft., fly 60 ft., swim 30 ft.",
//  "strength": 4,
//  "dexterity": 18,
//  "constitution": 11,
//  "intelligence": 2,
//  "wisdom": 12,
//  "charisma": 5,
//  "damage_vulnerabilities": "",
//  "damage_resistances": "",
//  "damage_immunities": "",
//  "condition_immunities": "",
//  "senses": "blindsight 10 ft., passive Perception 11",
//  "languages": "",
//  "challenge_rating": "1/8",
//  "special_abilities": [{
  //  "name": "Flyby",
  //  "desc": "The snake doesn't provoke opportunity attacks when it flies out of an enemy's reach.",
  //  "attack_bonus": 0
// }],
// "actions": [{
  //  "name": "Bite",
  //  "desc": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 1 piercing damage plus 7 (3d4) poison damage.",
  //  "attack_bonus": 6,
  //  "damage_bonus": 1
// }],
// "url": "http://www.dnd5eapi.co/api/monsters/107"
// }