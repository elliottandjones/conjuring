import React from "react";
import SpellListItem from "./SpellListItem";

const SpellList = props => {
  return (
    <div className="spell-list">
      {Object.keys(props.spells).map((obj, i) => {
        return (
          <SpellListItem
            key={props.spells[i].index}
            spell={props.spells[i]}
            onSpellSelect={props.onSpellSelect}
          />
        );
      })}
      <footer id="footer">
        &copy; 2019 <a href="http://elliottandjones.com/" style={{textDecoration: "none"}}>Elliott Jones</a>
      </footer>
    </div>
  );
};

export default SpellList;
/*<p className="tc ma1 pa1">Make sure to *Deselect* (at the bottom) the previously selected spells before trying to *Select* another spell or use the filters in the top bar!</p>*/
