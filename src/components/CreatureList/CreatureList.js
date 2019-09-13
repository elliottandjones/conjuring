import React from 'react';
// import CreatureListItem from './CreatureListItem';
import CreatureListItem from './CreatureItem';

const CreatureList = (props) => {
  const creatures = props.creatures;
  return (
    <div className="creature-list">
      {
        Object.keys(creatures).map((obj, i) => {
          return (
            <CreatureListItem key={creatures[i].index} creature={creatures[i]} />
          );
        })}
    </div>
  );

}

export default CreatureList;
