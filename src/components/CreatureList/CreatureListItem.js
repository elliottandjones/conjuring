import React from 'react';
import './CreatureListItem.css';
class CreatureListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isExpanded: false };
    this.creatureDetailRef = React.createRef();
  }

  onToggle(e) {
    e.preventDefault();
    this.setState({
      isExpanded: !(this.state.isExpanded),
      height: this.creatureDetailRef.clientHeight
    });
  }

  whatSkills(creature) {
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

  calculateModifier(score) {
    let mod = score - 10;
    if (mod % 2 !== 0)
      mod -= 1;
    mod /= 2;
    return (mod >= 0 ? ` (+${mod})` : ` (${mod})`); // Only need to add '+' prefix, not '-'
  }

  render() {
    const { creature } = this.props;
    const { isExpanded, height } = this.state;
    const currentHeight = isExpanded ? height : 0;
    return (
      <div className={`ma1 pa1 creature-item ${isExpanded ? 'inset creature-ex' : 'outset'}`}>
        <div className={`derk ${isExpanded ? 'name-expanded' : 'name-initial tc'}`} onClick={(e) => this.onToggle(e)}>
          <span className="name">{creature.name}</span> - <span>{creature.challenge_rating}</span> 
          {(creature.subtype === 'devil' || creature.subtype === 'demon') && <span className="subtype"> <i> ({creature.subtype})</i></span>}
        </div>
        <div className={`item-collapse ${isExpanded ? 'is-expanded' : ''}`} style={{ height: currentHeight }} >
          <div className="item-body dib pa2 ccard hotem" ref={this.creatureDetailRef}>
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
              <div>{creature.strength} {this.calculateModifier(creature.strength)}</div>
              <div>{creature.dexterity} {this.calculateModifier(creature.dexterity)}</div>
              <div>{creature.constitution} {this.calculateModifier(creature.constitution)}</div>
              <div>{creature.intelligence} {this.calculateModifier(creature.intelligence)}</div>
              <div>{creature.wisdom} {this.calculateModifier(creature.wisdom)}</div>
              <div>{creature.charisma} {this.calculateModifier(creature.charisma)}</div>
            </div>
            <div className="from-center"><i>.</i></div>
            {this.whatSkills(creature) !== "" ? <p><b>Skills</b> {this.whatSkills(creature)}</p> : ''}
            {creature.damage_vulnerabilities && <p><b>Damage Vulnerabilities</b> {creature.damage_vulnerabilities}</p>}
            {creature.damage_resistances && <p><b>Damage Resistances</b> {creature.damage_resistances}</p>}
            {creature.damage_immunities && <p><b>Damage Immunities</b> {creature.damage_immunities}</p>}
            {creature.condition_immunities && <p><b>Condition Immunities</b> {creature.condition_immunities}</p>}
            <p><b>Senses</b> {creature.senses}</p>
            {creature.languages ? <p><b>Languages</b> {creature.languages}</p> : ''}
            <p><b>Challenge</b> {creature.challenge_rating}</p>
            <i className="to-right mt1 mb1"></i>
            {
              creature.special_abilities
                ? (
                  creature.special_abilities.map((ability, i) => {
                    return (<p key={i + 898989}><b><i>{ability.name}.</i></b> {ability.desc}</p>);
                  })
                ) : ''
            }
            <p className="pactions">Actions</p>
            <div className="from-center"><i>.</i></div>
            {/* <hr className="skinny" /> */}
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
                    <div className="from-center"><i>.</i></div>
                    {/* <hr className="skinny" /> */}
                    {creature.legendary_actions.map((action, i) => {
                      return (<p key={i + 6616161}><b><i>{action.name}.</i></b> {action.desc}</p>);
                    })}
                  </div>
                ) : ''
            }
          </div>
        </div>
      </div>
    );
  }

}

export default CreatureListItem;

// * Favorite Button without icon yet
//  <button
//   className={`filter-toggle select ${isFav ? 'dn' : 'db '}`}
//   type="submit"
//   onClick={(e) => { this.onFavToggle(e); onCreatureIsFav(creature); }}
// >{buttonText}
// </button>
//   <button
//     className={`filter-toggle deselect ${isFav ? 'db ' : 'dn'}`}
//     type="submit"
//     onClick={(e) => { this.onFavToggle(e); onCreatureIsFav({}); }}
//   >{buttonText}
//   </button>
