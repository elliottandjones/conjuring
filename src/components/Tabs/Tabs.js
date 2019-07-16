import React, { Component } from "react";
import SpellList from "./SpellList/SpellList";
import FilterPanel from "./FilterPanel/FilterPanel";

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spellFilter: false
    };
  }

  onToggleTab(e) {}

  render() {
    const { spellFilter } = this.state;
    // const {  } = this.props;
    return (
      <div className="tabs">
        <button className="tablinks" onClick={e => this.onToggleTab}>
          Filter by Attribute
        </button>
        <button className="tablinks" onClick={e => this.onToggleTab}>
          Filter by Spell
        </button>

        {spellFilter !== false ? <SpellList /> : <FilterPanel />}
      </div>
    );
  }
}

export default Tabs;
//<label htmlFor=""></label>
