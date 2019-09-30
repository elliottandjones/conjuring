import React from "react";
import SpellItem from "./SpellItem";

const SpellList = props => {
  return (
    <div className="spell-list">
      {Object.keys(props.spells).map((obj, i) => {
        return (
          <SpellItem
            key={props.spells[i].index}
            spell={props.spells[i]}
            onSpellSelect={props.onSpellSelect}
          />
        );
      })}
      <footer id="footer">
        &copy; 2019 <a href="http://elliottandjones.com/">Elliott Jones</a>
      </footer>
    </div>
  );
};

export default SpellList;
