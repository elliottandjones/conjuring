import React, { Component } from 'react';
import CreatureDetail from './components/Detail/CreatureDetail';
import CreatureList from './components/CreatureList/CreatureList';
import SearchBox from './components/SearchBox/SearchBox';
import Select from './components/Select/Select';
import SpellList from './components/SpellList/SpellList';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      Creatures: [],
      Spells: [],
      searchfield: '',
      typeOptions: [
        { value: 'Type', name: 'Type' },
        { value: 'aberration', name: 'Aberration' },
        { value: 'beast', name: 'Beast' },
        { value: 'celestial', name: 'Celestial' },
        { value: 'construct', name: 'Construct' },
        { value: 'dragon', name: 'Dragon' },
        { value: 'elemental', name: 'Elemental' },
        { value: 'fey', name: 'Fey' },
        { value: 'fiend', name: 'Fiend' },
        { value: 'demon', name: 'Demon' },
        { value: 'devil', name: 'Devil' },
        { value: 'giant', name: 'Giant' },
        { value: 'humanoid', name: 'Humanoid' },
        { value: 'monstrosity', name: 'Monstrosity' },
        { value: 'ooze', name: 'Ooze' },
        { value: 'plant', name: 'Plant' },
        { value: 'undead', name: 'Undead' }
      ],
      crMinOptions: [
        { value: 'CR(min)', name: 'CR (min)' },
        { value: '0', name: '0' },
        { value: '1/8', name: '1/8' },
        { value: '1/4', name: '1/4' },
        { value: '1/2', name: '1/2' },
        { value: '1', name: '1' },
        { value: '2', name: '2' },
        { value: '3', name: '3' },
        { value: '4', name: '4' },
        { value: '5', name: '5' },
        { value: '6', name: '6' },
        { value: '7', name: '7' },
        { value: '8', name: '8' },
        { value: '9', name: '9' },
        { value: '10', name: '10' },
        { value: '11', name: '11' },
        { value: '12', name: '12' },
        { value: '13', name: '13' },
        { value: '14', name: '14' },
        { value: '15', name: '15' },
        { value: '16', name: '16' }
      ],
      crMaxOptions: [
        { value: 'CR (max)', name: 'CR (max)' },
        { value: '0', name: '0' },
        { value: '1/8', name: '1/8' },
        { value: '1/4', name: '1/4' },
        { value: '1/2', name: '1/2' },
        { value: '1', name: '1' },
        { value: '2', name: '2' },
        { value: '3', name: '3' },
        { value: '4', name: '4' },
        { value: '5', name: '5' },
        { value: '6', name: '6' },
        { value: '7', name: '7' },
        { value: '8', name: '8' },
        { value: '9', name: '9' },
        { value: '10', name: '10' },
        { value: '11', name: '11' },
        { value: '12', name: '12' },
        { value: '13', name: '13' },
        { value: '14', name: '14' },
        { value: '15', name: '15' },
        { value: '16', name: '16' },
        { value: '17', name: '17' },
        { value: '18', name: '18' },
        { value: '19', name: '19' },
        { value: '20', name: '20' },
        { value: '21', name: '21' },
        { value: '22', name: '22' },
        { value: '23', name: '23' },
        { value: '24', name: '24' },
        { value: '30', name: '30' }
      ],
      speedOptions: [
        { value: 'Speed', name: 'Speed' },
        { value: 'burrow', name: 'Burrow' },
        { value: 'climb', name: 'Climb' },
        { value: 'swim', name: 'Swim' },
        { value: 'fly', name: 'Fly' },
        { value: 'no swim/fly', name: 'No Swim/Fly' },
        { value: 'no fly', name: 'No Fly' }
      ],
      sizeOptions: [
        { value: 'Size', name: 'Size' },
        { value: 'Tiny', name: 'Tiny' },
        { value: 'Small', name: 'Small' },
        { value: 'Medium', name: 'Medium' },
        { value: 'Large', name: 'Large' },
        { value: 'Huge', name: 'Huge' },
        { value: 'Gargantuan', name: 'Gargantuan' }
      ],
      isCreatureSelected: false,
      isSpellSelected: false,
      typeValue: '',
      crMinValue: '',
      crMaxValue: '',
      speedValue: '',
      sizeValue: '',
      creatureObject: {},
      spellObject: {}
    }
  }

  componentDidMount() {
    this.loadCreatures();
    this.loadSpells();
  }

  loadCreatures() {
    fetch('http://localhost:3000/creatures')
      .then(response => response.json())
      .then(creatures => {
        this.setState({ Creatures: creatures });
      });
  }
  loadSpells() {
    fetch('http://localhost:3000/spells')
      .then(response => response.json())
      .then(spells => {
        this.setState({ Spells: spells });
      });
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  }
  onSpellSelect = (spell) => {
    spell.name ? this.setState({ isSpellSelected: true }) : this.setState({ isSpellSelected: false });
    this.setState({ spellObject: spell });
  }
  onCreatureSelect = (creature) => {
    if (creature.name) {
      this.setState({ isCreatureSelected: true });
    }
    this.setState({ creatureObject: creature });
  }
  onTypeSelect = (event) => {
    this.setState({ typeValue: event.target.value });
  }
  onCRMinSelect = (event) => {
    this.setState({ crMinValue: event.target.value });
  }
  onCRMaxSelect = (event) => {
    this.setState({ crMaxValue: event.target.value });
  }
  onSpeedSelect = (event) => {
    this.setState({ speedValue: event.target.value });
  }
  onSizeSelect = (event) => {
    this.setState({ sizeValue: event.target.value });
  }

  filterBySpell(critters, spell) {
    if (spell.particular_creatures) {
      critters = critters.filter(creature => {
        return spell.particular_creatures.indexOf(creature.name) > -1;
      });
    } else {
      if (spell.creature_types[0] === 'demon' || spell.creature_types[0] === 'devil') {
        critters = critters.filter(creature => {
          return creature.subtype.includes(spell.creature_types[0]);
        });
      } else {
        critters = critters.filter(creature => {
          return spell.creature_types.indexOf(creature.type) > -1;
        });
      }
      if (spell.name !== 'Polymorph' && spell.name !== 'Awaken') {
        critters = critters.filter(creature => {
          return this.formatCR(creature.challenge_rating) >= this.formatCR(spell.creature_crs[0])
            && this.formatCR(creature.challenge_rating) <= this.formatCR(spell.creature_crs[1]);
        });
      }
      if (spell.creature_sizes) {
        critters = critters.filter(creature => {
          return creature.size.toLowerCase() === spell.creature_sizes[0].toLowerCase()
            || creature.size.toLowerCase() === spell.creature_sizes[1].toLowerCase();
        });
      }
    }
    return critters;
  }

  calculateModifier(score) {
    let mod = score - 10;
    if (mod % 2 !== 0)
      mod -= 1;
    mod /= 2;
    return (mod >= 0 ? ` (+${mod})` : ` (${mod})`);
  }
  formatCR(string) {
    if (string.length < 3) {
      return parseInt(string);
    }
    const split = string.split('/');
    return (parseInt(split[0]) / parseInt(split[1]));
  }

  render() {
    const { Creatures, Spells, searchfield, typeValue, crMinValue, crMaxValue, speedValue, sizeValue, spellObject } = this.state;
    let filteredCreatures = Creatures.filter(creature => {
      return creature.name.toLowerCase().includes(searchfield.toLowerCase());
    });

    if (typeValue && typeValue !== 'Type') {
      (typeValue.toLowerCase() === 'demon' || typeValue.toLowerCase() === 'devil')
        ? filteredCreatures = filteredCreatures.filter(creature => {
          return creature.subtype.toLowerCase().includes(typeValue.toLowerCase());
        })
        : filteredCreatures = filteredCreatures.filter(creature => {
          return creature.type.toLowerCase().includes(typeValue.toLowerCase());
        });
    }
    if (speedValue && speedValue !== 'Speed') {
      speedValue.toLowerCase().includes('no')
        ? (speedValue.toLowerCase().includes('swim')
          ? filteredCreatures = filteredCreatures.filter(creature => {
            return (
              !(creature.speed.toLowerCase().includes('swim'))
              && !(creature.speed.toLowerCase().includes('fly'))
            );
          })
          : filteredCreatures = filteredCreatures.filter(creature => {
            return !(creature.speed.toLowerCase().includes('fly'));
          }))
        : (filteredCreatures = filteredCreatures.filter(creature => {
          return creature.speed.toLowerCase().includes(speedValue.toLowerCase());
        }))
    }
    if (sizeValue && sizeValue !== 'Size') {
      filteredCreatures = filteredCreatures.filter(creature => {
        return creature.size.toLowerCase() === sizeValue.toLowerCase();
      });
    }
    if (crMinValue && crMinValue !== 'CR (min)') {
      filteredCreatures = filteredCreatures.filter(creature => {
        return this.formatCR(creature.challenge_rating) >= this.formatCR(crMinValue);
      });
    }
    if (crMaxValue && crMaxValue !== 'CR (max)') {
      filteredCreatures = filteredCreatures.filter(creature => {
        return this.formatCR(creature.challenge_rating) <= this.formatCR(crMaxValue);
      });
    }
    if (this.state.isSpellSelected) {
      filteredCreatures = this.filterBySpell(filteredCreatures, spellObject);
    }

    return (
      <div className="App">
        <div className="top-bar pl2 pt2 ma1">
          <h1 className="mt1 mb1" style={{ fontSize: '3em' }}>
            <span style={{ whiteSpace: 'none' }}>
              <span style={{ fontSize: '.7em' }}>re:</span>Conju<img className="icon" alt="icon" src="/favicon.ico" />ing
            </span>
          </h1>
        </div>
        <SearchBox searchfield={searchfield} searchChange={this.onSearchChange} />
        <Select
          value={typeValue}
          options={this.state.typeOptions}
          onSelectChange={this.onTypeSelect}
          isDisabled={this.state.isSpellSelected}
        />
        <Select
          value={crMinValue}
          options={this.state.crMinOptions}
          onSelectChange={this.onCRMinSelect}
          isDisabled={this.state.isSpellSelected}
        />
        <Select
          value={crMaxValue}
          options={this.state.crMaxOptions}
          onSelectChange={this.onCRMaxSelect}
          isDisabled={this.state.isSpellSelected}
        />
        <Select
          value={speedValue}
          options={this.state.speedOptions}
          onSelectChange={this.onSpeedSelect}
          isDisabled={this.state.isSpellSelected}
        />
        <Select
          value={sizeValue}
          options={this.state.sizeOptions}
          onSelectChange={this.onSizeSelect}
          isDisabled={this.state.isSpellSelected}
        />
        <CreatureDetail
          creature={this.state.creatureObject}
          modifier={this.calculateModifier}
          isDisplaying={this.state.isCreatureSelected}
        />
        <CreatureList
          creatures={filteredCreatures}
          onCreatureSelect={this.onCreatureSelect}
          value={this.state.creatureObject}
        />
        <SpellList
          spells={Spells}
          onSpellSelect={this.onSpellSelect}
          spellObject={spellObject}
        />
      </div>
    );
  }
}

export default App;
