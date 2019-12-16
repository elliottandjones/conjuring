import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { DB_CONFIG } from './config';

import Loader from './components/Loader/Loader';
import CreatureList from './components/CreatureList/CreatureList';
import SpellList from './components/SpellList/SpellList';
import SearchBox from './components/SearchBox/SearchBox';
import Select from './components/Select/Select';
import Checkboxes from './components/Checkboxes/Checkboxes';
import RadioButtons from './components/RadioButtons/RadioButtons';
import ChatPanel from './components/ChatPanel/ChatPanel';
// import Store from './Store';
// import ChatPanel from './components/ChatPanel/ChatContainer';

import './App.css';


const initialTypeValues = {
  aberration: false,
  beast: false,
  celestial: false,
  construct: false,
  dragon: false,
  elemental: false,
  fey: false,
  fiend: false,
  giant: false,
  humanoid: false,
  monstrosity: false,
  ooze: false,
  plant: false,
  undead: false
};
class App extends React.Component {
  constructor() {
    super();
    this.app = firebase.initializeApp(DB_CONFIG);
    this.creaturesDB = this.app.database().ref().child('creatures');
    this.spellsDB = this.app.database().ref().child('spells');
    this.state = {
      loading: true,
			creatures: [],
			spells: [],
			searchfield: "",
			crOptions: [
				{ name: "Any CR" },
				{ name: "0" },
				{ name: "1/8" },
				{ name: "1/4" },
				{ name: "1/2" },
				{ name: "1" },
				{ name: "2" },
				{ name: "3" },
				{ name: "4" },
				{ name: "5" },
				{ name: "6" },
				{ name: "7" },
				{ name: "8" },
				{ name: "9" },
				{ name: "10" },
				{ name: "11" },
				{ name: "12" },
				{ name: "13" },
				{ name: "14" },
				{ name: "15" },
				{ name: "16" },
				{ name: "17" },
				{ name: "18" },
				{ name: "19" },
				{ name: "20" },
				{ name: "21" },
				{ name: "22" },
				{ name: "23" },
				{ name: "24" },
				{ name: "30" }
			],
			speedOptions: [
				{ value: "burrow", name: "speed" },
				{ value: "climb", name: "speed" },
				{ value: "swim", name: "speed" },
				{ value: "fly", name: "speed" },
				{ value: "no swim/fly", name: "speed" },
				{ value: "no fly", name: "speed" }
			],
			sizeOptions: [
				{ value: "Tiny", name: "size" },
				{ value: "Small", name: "size" },
				{ value: "Medium", name: "size" },
				{ value: "Large", name: "size" },
				{ value: "Huge", name: "size" },
				{ value: "Gargantuan", name: "size" }
			],
			spellSelected: false,
			typeValues: initialTypeValues,
			crValue: "",
			speedValue: "",
			sizeValue: "",
			spellObject: {},
			spellFilter: false,
			speedLegend: "Speed",
			sizeLegend: "Size",
      typePicked: true,
      chatOpen: false,
      connected: false,
      // socket: null
		};
    this.onTypeChange = this.onTypeChange.bind(this);
  }

  // Firebase data is retrieved by attaching an 
  // * asynchronous listener to a firebase.database.Reference. 
  // The listener is triggered once for the initial state of 
  // the data and again anytime the data changes.

  // componentDidMount() {
  //   this.spellsDB.once('value', snapshot => this.setState({ spells: snapshot.val() }));

  //   this.creaturesDB.once('value', snapshot => this.setState({ creatures: snapshot.val() }))
  //     .then(() => this.setState({ loading:false }))
  //     .catch(err => {throw new Error('High level error'+err.message)})
  //     .catch(err => console.log(err));
  //   // this.initSocket();
  // }
  async componentDidMount() {
    const s = await this.spellsDB.once('value', snapshot => this.setState({spells: snapshot.val()}));

    const c = await this.creaturesDB.once('value', snapshot => this.setState({creatures: snapshot.val()}));

    if(s & c) {
      this.setState({ loading:false })
    } else {
      console.log('ERROR in componentDidMount async/await')
    }
      // .then(() => this.setState({ loading:false }))
      // .catch(err => {throw new Error('High level error'+err.message)})
      // .catch(err => console.log(err));
    // this.initSocket();
  }

  onOpenChatPanel = (e) => {
    e.preventDefault();
    if (!this.state.chatOpen) {
      this.setState({ chatOpen: true});
    }
    if (this.state.spellFilter) {
      this.setState({ spellFilter: false });
    }
  }
  onFilterByAttribute = (e) => {
    e.preventDefault();
    if (this.state.spellFilter) {
      this.setState({ spellFilter: false });
    }
    if (this.state.chatOpen) {
      this.setState({ chatOpen: false });
    }
  }
  onFilterBySpell = (e) => {
    e.preventDefault();
    if (!this.state.spellFilter) {
      this.setState({ spellFilter: true });
    }
    if (this.state.chatOpen) {
      this.setState({ chatOpen: false });
    }
    if (Object.values(this.state.typeValues).some(i => i === true)) {
      this.setState({ typeValues: initialTypeValues });
    }
    if (this.state.crValue) {
      this.setState({ crValue: '' });
    }
    if (this.state.sizeValue) {
      this.setState({ sizeValue: '' });
    }
    if (this.state.speedValue) {
      this.setState({ speedValue: '' });
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
  // onActionTaken = (event) => {
  //   event.preventDefault();
  //   this.setState({ action: event.target.value });
  // }
  // displayAction = (event, action, creatureName) => {
  //   event.preventDefault();
  //   // const socket = React.useContext(CTX);
  //   // console.log(socket.id);
    
  //   if (action && creatureName) {
      
  //     // socket.emit('sendRollMessage', {action, creatureName}, name)
  //     // this.displayInChat(action, creatureName);
  //     // alert(`NAME: ${creatureName}, ACTION.NAME: ${action.name}, ACTION.DESC: ${action.desc}`);
  //     console.log('NAME: ', creatureName);
  //     console.log('ACTION.NAME: ', action.name);
  //     console.log('ACTION.DESC: ', action.desc);
  //     return [creatureName, action];
  //   }
  // }

  // displayInChat = (action, creatureName) => {

  // }

  filterBySpell = (critters, spell) => {
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

  formatCR = (str) => {
    if (str && !str.includes('/')) {
      return parseInt(str);
    }
    const split = str.split('/');
    return (parseInt(split[0]) / parseInt(split[1]));
  }

  render() {
    const {
      creatures, spells, spellFilter, spellObject, spellSelected, searchfield,
      crOptions, speedOptions, sizeOptions,
      typeValues, crValue, speedValue, sizeValue,
      speedLegend, sizeLegend, chatOpen, 
      // socket
    } = this.state;

    // filter by name
    let filteredCreatures = creatures.filter(creature => {
      return creature.name.toLowerCase().includes(searchfield.toLowerCase());
    });
    // filter by types
    if (Object.values(typeValues).some(i => i === true)) {
      let typePicks = [];
      let typeArr = [];
      typePicks = Object.entries(typeValues).filter(([key, value]) => {
        return value === true;
      });
      let picks = typePicks.map(types => types[0]);
      if (picks && picks.length > 1) {
        // eslint-disable-next-line
        for(let pick of picks) {
          let tempArr = [];
          tempArr = filteredCreatures.filter(creature => {
            return creature.type.toLowerCase() === pick;
          });
          typeArr = typeArr.concat(tempArr);
        }
      } else {
        typeArr = filteredCreatures.filter(creature => {
          return creature.type.toLowerCase() === picks[0];
        });
      }
      filteredCreatures = typeArr;
    }
    /* filter by speed,
    * 'on' is the event.target.value of radiobutton when 
    * (1) an input of type='radio' isn't given a value explicitly or from props
    * && 
    * (2) event.target.checked=true 
    * This will be the case when the 'All' option is checked, which is the default case
    */
    if (speedValue && speedValue !== 'on') {
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
        }));
    }
    // filter by size, see previous comment for explanation of testing againt 'on'
    if (sizeValue && sizeValue !== 'on') {
      filteredCreatures = filteredCreatures.filter(creature => {
        return creature.size.toLowerCase() === sizeValue.toLowerCase();
      });
    }
    // filter by challenge rating
    if (crValue && crValue !== 'CR' && crValue !== 'Any CR') {
      filteredCreatures = filteredCreatures.filter(creature => {
        return creature.challenge_rating === crValue;
      });
    }
    // filter by spell
    if (spellSelected) {
      filteredCreatures = this.filterBySpell(filteredCreatures, spellObject);
    }
    
    return (
      <div className="App">
        <div className="top-bar">
          <div className="bar-container">
            <div className="app-title pl1 ma1" title="a Reference App for Dungeons & Dragons (5e SRD)">
              <h1 className="mt1 mb1" style={{ fontSize: '2.2em' }}>
                <span id="app-title-span" style={{ whiteSpace: 'none' }}>
                  Conju<img className="icon" alt="icon" src="/favicon.ico" />ing
                </span> <a href="https://github.com/Elliohknow/conjuring" id="source-link">source</a>
              </h1>
            </div>
            <SearchBox searchfield={searchfield} searchChange={this.onSearchChange} />
          </div>
        </div>
        <div className="tabs mb1 mt1">
          <button
            className={`tab ${(spellFilter || chatOpen) && 'o-50'}`}
            onClick={(e) => {this.onFilterByAttribute(e); this.onSpellSelect({});}} 
            tabIndex="0"
          ><span>By Attribute</span>
          </button>
          <button 
            className={`tab ${(!spellFilter || chatOpen) && 'o-50'}`}
            onClick={(e) => {this.onFilterBySpell(e);}}
            tabIndex="0"
          ><span>By Spell</span>
          </button>
          <button 
            className={`tab ${(spellFilter || !chatOpen) && 'o-50'}`}
            onClick={(e) => {this.onOpenChatPanel(e);}}
            tabIndex="0"
          ><span>Party Chat</span>
          </button>
        </div>
        {
          !spellFilter && !chatOpen ?
            <div className="filters-wrapper">
              <div className="cr-and-type">
                <Select className="cr" value={crValue} options={crOptions} onChange={this.onCRSelect} />
                <Checkboxes className="type" options={typeValues} onChange={this.onTypeChange} />
              </div>
              <div className="speed-and-size">
                <RadioButtons className="speed" text={speedLegend} options={speedOptions} onChange={this.onSpeedSelect} />
                <RadioButtons className="size" text={sizeLegend} options={sizeOptions} onChange={this.onSizeSelect} />
                <footer id="footer">
                  &copy; 2019 <a href="http://elliottandjones.com/" style={{ textDecoration: "none" }}>Elliott Jones</a>
                </footer>
              </div>
            </div>
            : (spellFilter ? <SpellList spells={spells} onSpellSelect={this.onSpellSelect} /> 
              : (chatOpen && <ChatPanel />))
        }
        {
          this.state.loading ?
            <Loader />
            : <CreatureList creatures={filteredCreatures} chatOpen={chatOpen} onOpenChatPanel={this.onOpenChatPanel} />
        }
      </div>
    );
  }
}

export default App;