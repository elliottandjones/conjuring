import React from 'react';
import CreatureItem from './CreatureItem';

const CreatureList = ({creatures, chatOpen, onOpenChatPanel}) => {
  return (
    <div className="creature-list">
      {
        Object.keys(creatures).map((obj, i) => {
          return (
            <CreatureItem
              key={creatures[i].index} 
              creature={creatures[i]} 
              chatOpen={chatOpen} 
              onOpenChatPanel={onOpenChatPanel}
              />
          );
        })
      }
    </div>
  );

}

export default CreatureList;
