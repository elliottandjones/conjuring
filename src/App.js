import React, { Component } from 'react';
import CreatureList from './components/CreatureList/CreatureList';
import SearchBox from './components/SearchBox/SearchBox';
import Select from './components/Select/Select';
import SpellList from './components/SpellList/SpellList';
import Checkboxes from './components/Checkboxes/Checkboxes';
import RadioButtons from './components/RadioButtons/RadioButtons';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { DB_CONFIG } from './config';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.app = firebase.initializeApp(DB_CONFIG);
    this.creaturesDB = this.app.database().ref().child('creatures');
    this.spellsDB = this.app.database().ref().child('spells');
    this.state = {
      creatures: [],
      spells: [],
      searchfield: '',
      typeOptions: [
        { key: 'aberration', name: 'aberration' },
        { key: 'beast', name: 'beast' },
        { key: 'celestial', name: 'celestial' },
        { key: 'construct', name: 'construct' },
        { key: 'dragon', name: 'dragon' },
        { key: 'elemental', name: 'elemental' },
        { key: 'fey', name: 'fey' },
        { key: 'fiend', name: 'fiend' },
        { key: 'demon', name: 'demon' },
        { key: 'devil', name: 'devil' },
        { key: 'giant', name: 'giant' },
        { key: 'humanoid', name: 'humanoid' },
        { key: 'monstrosity', name: 'monstrosity' },
        { key: 'ooze', name: 'ooze' },
        { key: 'plant', name: 'plant' },
        { key: 'undead', name: 'undead' }
      ],
      crOptions: [
        { value: 'CR', name: 'CR' },
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
        { value: 'burrow', name: 'speed' },
        { value: 'climb', name: 'speed' },
        { value: 'swim', name: 'speed' },
        { value: 'fly', name: 'speed' },
        { value: 'no swim/fly', name: 'speed' },
        { value: 'no fly', name: 'speed' }
      ],
      sizeOptions: [
        { value: 'Tiny', name: 'size' },
        { value: 'Small', name: 'size' },
        { value: 'Medium', name: 'size' },
        { value: 'Large', name: 'size' },
        { value: 'Huge', name: 'size' },
        { value: 'Gargantuan', name: 'size' }
      ],
      spellSelected: false,
      typeValues: {
        aberration: false,
        beast: false,
        celestial: false,
        construct: false,
        dragon: false,
        elemental: false,
        fey: false,
        fiend: false,
        demon: false,
        devil: false,
        giant: false,
        humanoid: false,
        monstrosity: false,
        ooze: false,
        plant: false,
        undead: false
      },
      crValue: '',
      speedValue: '',
      sizeValue: '',
      spellObject: {},
      spellFilter: false,
      speedLegend: 'Speed',
      sizeLegend: 'Size',
      typePicked: true,
      showFavorites: false
    };
    this.onTypeChange = this.onTypeChange.bind(this);
  }

  componentDidMount() {
    this.creaturesDB.on('value', snapshot => {
      this.setState({
        creatures: snapshot.val()
      });
    });
    this.spellsDB.on('value', snapshot => {
      this.setState({
        spells: snapshot.val()
      });
    });
  }
  onFilterByOther(e) {
    e.preventDefault();
    if (this.state.spellFilter === true) {
      this.setState({
        spellFilter: false
      });
    }
  }
  onFilterBySpell(e) {
    e.preventDefault();
    if (this.state.spellFilter === false) {
      this.setState({
        spellFilter: true
      });
    }
  }

  onTypeChange = (event) => {
    this.setState({
      typeValues: {
        ...this.state.typeValues,
        [event.target.name]: event.target.checked
      }
    });
  }
  
  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  }
  onSpellSelect = (spell) => {
    spell.name ? this.setState({ spellSelected: true }) : this.setState({ spellSelected: false });
    this.setState({ spellObject: spell });
  }
  onCRSelect = (event) => {
    this.setState({ crValue: event.target.value });
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

  formatCR(string) {
    if (string.length < 3) {
      return parseInt(string);
    }
    const split = string.split('/');
    return (parseInt(split[0]) / parseInt(split[1]));
  }

  render() {
    const {
      creatures, spells, spellFilter, spellObject, spellSelected, searchfield,
      crOptions, speedOptions, sizeOptions,
      typeOptions, typeValues, crValue, speedValue, sizeValue,
      speedLegend, sizeLegend
    } = this.state;

    let filteredCreatures = creatures.filter(creature => {
      return creature.name.toLowerCase().includes(searchfield.toLowerCase());
    });

    if (Object.values(typeValues).some(i => i === true)) {
      let typePicks = Object.entries(typeValues).filter(([key, value]) => {
        console.log("it is ", value, " that ", key, " is checked");
        return value === true;
      });
      let picks = typePicks.map(types => types[0]);
      let typeFiltered = [];
      for(let pick of picks) {
        let tempArr = [];
        if (pick === 'demon' || pick === 'devil') {
          tempArr = filteredCreatures.filter(creature => {
            return creature.subtype.toLowerCase() === pick;
          })
        } else {
          tempArr = filteredCreatures.filter(creature => {
            return creature.type.toLowerCase() === pick;
          });
        }
        picks.length > 1 ? typeFiltered = typeFiltered.concat(tempArr) : typeFiltered = tempArr;
      }
      filteredCreatures = typeFiltered;
    }
    // if (typeValues && typeValues !== 'Type') {
    //   (typeValues.key.toLowerCase() === 'demon' || typeValues.key.toLowerCase() === 'devil')
    //     ? filteredCreatures = filteredCreatures.filter(creature => {
    //       return creature.subtype.toLowerCase().includes(typeValues.key.toLowerCase());
    //     })
    //     : filteredCreatures = filteredCreatures.filter(creature => {
    //       return creature.type.toLowerCase().includes(typeValues.key.toLowerCase());
    //     });
    // }
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
    if (crValue && crValue !== 'CR') {
      filteredCreatures = filteredCreatures.filter(creature => {
        return creature.challenge_rating === crValue;
      });
    }
    if (spellSelected) {
      filteredCreatures = this.filterBySpell(filteredCreatures, spellObject);
    }

    return (
      <div className="App">
        <div className="top-bar">
          <div className="bar-container">
            <div className="app-title pl1 ma1">
              <h1 className="mt1 mb1" style={{ fontSize: '2.2em' }}>
                <span style={{ whiteSpace: 'none' }}>
                  Conju<img className="icon" alt="icon" src="/favicon.ico" />ing
                </span>
              </h1>
            </div>
            <SearchBox searchfield={searchfield} searchChange={this.onSearchChange} />
          </div>
        </div>
        <CreatureList creatures={filteredCreatures} />
        <div className="tabs mb1 mt1">
          <button onClick={(e) => {this.onFilterByOther(e);}} className={`${!spellFilter ? 'tablinks' : 'o-50 tablinks'}`}>
            Filter by...
          </button>
          <button onClick={(e) => {this.onFilterBySpell(e);}} className={`${spellFilter ? 'tablinks' : 'o-50 tablinks'}`}>
            Filter by Spell
          </button>
          {
            spellFilter === false ?
              <div className="filters-panel">
                <Select className="cr" value={crValue} options={crOptions} onChange={this.onCRSelect} />
                <Checkboxes className="type" options={typeOptions} values={typeValues} onChange={this.onTypeChange} />
                <RadioButtons className="speed" text={speedLegend} options={speedOptions} onChange={this.onSpeedSelect} />
                <RadioButtons className="size" text={sizeLegend} options={sizeOptions} onChange={this.onSizeSelect} />
                <footer className="tc mt4">&copy; 2019 Elliott Jones</footer>
              </div> // ! figure this footer shit out
              : <SpellList spells={spells} onSpellSelect={this.onSpellSelect} />
          }
        </div>
      </div>
    );
  }
}

export default App;
////<SpellList spells={spells} onSpellSelect={this.onSpellSelect} />
////<Select value={typeValues} options={typeOptions} onSelectChange={this.onTypeSelect} isDisabled={spellSelected} />
////<Select value={crValue} options={crOptions} onSelectChange={this.onCRSelect} isDisabled={spellSelected} />
////<Select value={speedValue} options={speedOptions} onSelectChange={this.onSpeedSelect} isDisabled={spellSelected} />
////<Select value={sizeValue} options={sizeOptions} onSelectChange={this.onSizeSelect} isDisabled={spellSelected} />