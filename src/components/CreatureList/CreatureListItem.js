import React from 'react';
// ({ creature, isDisplaying, modifier }) =>
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

  whatSkills = (creature) => {
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
    return (mod >= 0 ? ` (+${mod})` : ` (${mod})`);
  }

  render() {
    const { creature } = this.props;
    const { isExpanded, height } = this.state;
    const currentHeight = isExpanded ? height : 0;
    return (
      <div className={`ma1 pa1 creature-item ${isExpanded ? 'inset creature-ex' : 'outset'}`}>
        <div className={`fira derk ${isExpanded ? 'name-expanded' : 'name-initial tc'}`} onClick={(e) => this.onToggle(e)}>
          <span className="name">{creature.name} {creature.challenge_rating}</span>
        </div>
        <div className={`item-collapse ${isExpanded ? 'is-expanded' : ''}`} style={{ height: currentHeight }} >
          <div className="item-body dib pa2 ccard hotem" ref={this.creatureDetailRef}>
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
              <div>{creature.strength} {this.calculateModifier(creature.strength)}</div>
              <div>{creature.dexterity} {this.calculateModifier(creature.dexterity)}</div>
              <div>{creature.constitution} {this.calculateModifier(creature.constitution)}</div>
              <div>{creature.intelligence} {this.calculateModifier(creature.intelligence)}</div>
              <div>{creature.wisdom} {this.calculateModifier(creature.wisdom)}</div>
              <div>{creature.charisma} {this.calculateModifier(creature.charisma)}</div>
            </div>
            <hr className="left-sm" style={{ marginBottom: '-10px' }} /><hr className="right-sm" />
            {this.whatSkills(creature).length > 0 ? <p><b>Skills</b> {this.whatSkills(creature)}</p> : ''}
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
//------------------LOL----------------------------------
// return isDisplaying !== false
// ? (...)
// : (
//   <div className="ccard hotem">
//     <h3 className="derk tc fira" style={{ fontSize: '1.1em' }}>Select a Creature!</h3>
//     <hr className="left" />
//     <p className="i tc pa1 ma1 fira">"Zounds--I say! You, there! This! Summon this creature at once! C'mon, you--yes, YOU! Go--now--do it! Summon it--Summon. it. Summon it, summon it, summonitsummonitSUMMONITSUMMONIIIIIIIIIT!"</p>
//     <hr className="left-sm" />
//     <hr className="right-sm" />
//     <p className="pa2 ma3">-- Mephistopheles to a startled conjuration research conclave, impatiently waving a scrap of paper on which appeared a hastily drawn image of a long-eared, yellow creature with red circles on its cheeks, as well as one line of text at the bottom reading '-chuuuuu'</p>
//     <hr className="right" />
//   </div>
// )