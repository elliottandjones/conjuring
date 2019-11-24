import React, { useRef } from 'react';
import CreatureAction from './CreatureAction';
import { useToggleHeight } from '../../hooks/useToggle';
import './CreatureItem.css';

export default function CreatureItem({creature, chatOpen, onOpenChatPanel}) {
  const heightRef = useRef(null);
  const [isExpanded, height, toggleExpand] = useToggleHeight([false, heightRef]);

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

  const calculateModifier = (score) => {
    let mod = score - 10;
    if (mod % 2 !== 0)
      mod -= 1;
    mod /= 2;
    return (mod >= 0 ? ` (+${mod})` : ` (${mod})`);
  }
  
  const currentHeight = isExpanded ? height : 0;

  return (
    <div className={`ma1 pa1 creature-item ${isExpanded ? 'inset creature-ex' : 'outset'}`}>
      <div className={`derk ${isExpanded ? 'name-expanded' : 'name-initial tc'}`} onClick={(e) => toggleExpand(e)}>
        <span className="name">{creature.name}</span> <span style={isExpanded ? { display: 'none'} :{}}> - </span>
        <span>{creature.challenge_rating}</span> 
        {(creature.subtype === 'devil' || creature.subtype === 'demon') && <span className="subtype"> <i> ({creature.subtype})</i></span>}
      </div>
      <div className={`item-collapse ${isExpanded && 'is-expanded'}`} style={{ height: currentHeight }} aria-expanded={isExpanded} aria-hidden={!isExpanded}>
        <div className="item-body dib pa2 ccard hotem" ref={heightRef} aria-expanded={isExpanded} aria-hidden={!isExpanded}>
          {
            creature.subtype
              ? <p className="i ma1">{creature.size} {creature.type} ({creature.subtype}), {creature.alignment}</p>
              : <p className="i ma1">{creature.size} {creature.type}, {creature.alignment}</p>
          }
          <i className="to-right mb1 mt1"></i>
          <p><b className="mr2">Armor Class</b> {creature.armor_class}</p>
          <p><b className="mr2">Hit Points</b> {creature.hit_points} ({creature.hit_dice})</p>
          <p><b className="mr2">Speed</b> {creature.speed}</p>
          <div className="from-center"><i>.</i></div>
          <div className="tc ability-scores">
            <div><b>STR</b></div><div><b>DEX</b></div><div><b>CON</b></div><div><b>INT</b></div><div><b>WIS</b></div><div><b>CHA</b></div>
            <div>{creature.strength} {calculateModifier(creature.strength)}</div>
            <div>{creature.dexterity} {calculateModifier(creature.dexterity)}</div>
            <div>{creature.constitution} {calculateModifier(creature.constitution)}</div>
            <div>{creature.intelligence} {calculateModifier(creature.intelligence)}</div>
            <div>{creature.wisdom} {calculateModifier(creature.wisdom)}</div>
            <div>{creature.charisma} {calculateModifier(creature.charisma)}</div>
          </div>
          <div className="from-center"><i>.</i></div>
          {whatSkills(creature) !== "" && <p><b>Skills</b> {whatSkills(creature)}</p>}
          {creature.damage_vulnerabilities && <p><b>Damage Vulnerabilities</b> {creature.damage_vulnerabilities}</p>}
          {creature.damage_resistances && <p><b>Damage Resistances</b> {creature.damage_resistances}</p>}
          {creature.damage_immunities && <p><b>Damage Immunities</b> {creature.damage_immunities}</p>}
          {creature.condition_immunities && <p><b>Condition Immunities</b> {creature.condition_immunities}</p>}
          <p><b>Senses</b> {creature.senses}</p>
          {creature.languages && <p><b>Languages</b> {creature.languages}</p>}
          <p><b>Challenge</b> {creature.challenge_rating}</p>
          {
            creature.special_abilities &&
              <React.Fragment>
                <i className="to-right mt1 mb1"></i>
                {creature.special_abilities.map((item, i) => (<p key={`special_${i}`}><b><i>{item.name}.</i></b> {item.desc}</p>))}
              </React.Fragment>
          }
          <p className="pactions">Actions</p>
          <i className="to-right mt1 mb1"></i>
          {
            creature.actions ? 
              creature.actions.map((action, i) => {
                return (
                  <CreatureAction 
                    key={`action_${i}`} 
                    action={action} 
                    creatureName={creature.name} 
                    isExpanded={isExpanded} 
                    chatOpen={chatOpen}
                    onOpenChatPanel={onOpenChatPanel}
                    />
                );
              }) : <p> None, apparently. ¯\_(ツ)_/¯</p>
          }
          {
            creature.legendary_actions &&
              <React.Fragment>
                <p className="pactions" style={{textAlign: "center"}}>Legendary Actions</p>
                <div className="from-center"><i>.</i></div>
                {creature.legendary_actions.map((action, i) => {
                  return (
                    <CreatureAction 
                      key={`legendary_${i}`} 
                      action={action} 
                      creatureName={creature.name} 
                      isExpanded={isExpanded} 
                      chatOpen={chatOpen}
                      onOpenChatPanel={onOpenChatPanel}
                      />
                  );
                })}
              </React.Fragment>
          }
        </div>
      </div>
    </div>
  );
}
