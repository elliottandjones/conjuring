import React from 'react';
import CreatureItem from './CreatureItem';

const CreatureList = ({creatures, displayAction}) => {
  return (
    <div className="creature-list">
      {
        Object.keys(creatures).map((obj, i) => {
          return <CreatureItem key={creatures[i].index} creature={creatures[i]} displayAction={displayAction} />;
        })
      }
    </div>
  );

}

export default CreatureList;
