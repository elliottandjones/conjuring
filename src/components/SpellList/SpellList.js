import React from 'react';
import SpellListItem from './SpellListItem';

const SpellList = (props) => {
  return (
    <div className="spell-list" style={{ overflowY: 'scroll', width: '100%' }}>
      {
        Object.keys(props.spells).map((obj, i) => {
          return (
            <SpellListItem
              key={props.spells[i].index}
              spell={props.spells[i]}
              spellObject={props.spellObject}
              onSpellSelect={props.onSpellSelect}
            />
          );
        })
      }
      <p className="tc ma1 pa1">Make sure to *Deselect* (at the bottom) the previously selected spells before trying to *Select* another spell or use the filters in the top bar!</p>
    </div>
  );

}

export default SpellList;
// this.onToggle = this.onToggle.bind(this);
// { spells, onSpellPick, value, action }
// onClick = {() => { props.onSpellPick(spells[i]) }}