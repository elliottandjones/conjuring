import React from 'react';
import CreatureItem from './CreatureItem';

const CreatureList = (props) => {
  const creatures = props.creatures;
  return (
    <div className="creature-list">
      {
        Object.keys(creatures).map((obj, i) => {
          return (
            <CreatureItem key={creatures[i].index} creature={creatures[i]} />
          );
        })}
    </div>
  );

}

export default CreatureList;
