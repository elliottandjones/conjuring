import React from 'react';
import CreatureListItem from './CreatureListItem';

const CreatureList = (props) => {
  const creatures = props.creatures;
  return (
    <div className="creature-list" style={{ overflowY: 'scroll', width: '100%' }}>
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


// <div
//  key={creatures[i].index + 19}
//  onClick={() => { props.onCreatureSelect(creatures[i]) }}
// >
//  <CreatureListItem key={creatures[i].index} creature={creatures[i]} />
// </div>

// <p className="mt1 mb1 derk fira">{creatures[i].name}</p>
// {
  // creatures[i].subtype
  //   ? <p className="mt1 mb1">
  //     {creatures[i].type} ({creatures[i].subtype}) | CR  {creatures[i].challenge_rating} | {creatures[i].size}
  //   </p>
//    : <p className="mt1 mb1">{creatures[i].type} | CR  {creatures[i].challenge_rating} | {creatures[i].size}</p>
// }
