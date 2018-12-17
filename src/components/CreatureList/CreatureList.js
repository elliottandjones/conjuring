import React from 'react';

const CreatureList = (props) => {
  const creatures = props.creatures;
  return (
    <div className="creature-list" style={{ overflowY: 'scroll', width: '100%' }}>
      {Object.keys(creatures).map((obj, i) => {
        return (
          <div
            className="creature-item tc groww pa1 ma1"
            key={creatures[i].index}
            onClick={() => { props.onCreatureSelect(creatures[i]) }}
          >
            <p className="mt1 mb1 derk fira">{creatures[i].name}</p>
            {
              creatures[i].subtype
                ? <p className="mt1 mb1">
                  {creatures[i].type} ({creatures[i].subtype}) | CR  {creatures[i].challenge_rating} | {creatures[i].size}
                </p>
                : <p className="mt1 mb1">{creatures[i].type} | CR  {creatures[i].challenge_rating} | {creatures[i].size}</p>
            }
          </div>
        );
      })}
    </div>
  );

}

export default CreatureList;