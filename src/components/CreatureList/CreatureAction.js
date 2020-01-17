import React from "react";
import { CTX } from '../../Store';

// const CreatureAction = ({action, creatureName, displayAction, isExpanded, chatOpen, onOpenChatPanel}) => {
const CreatureAction = (props) => {
  const {sendRoll} = React.useContext(CTX);
  
  const handleClick = (e) => {
		let att = Math.floor(Math.random() * 20 + 1);
    if (!props.chatOpen) {
      props.onOpenChatPanel(e);
      console.log('ATTACK ROLL: ' + att + ' + ' + props.action.attack_bonus + ' = ' + (att + props.action.attack_bonus));
      alert("To avoid seeing this alert everytime you click a monster action, join a chat room. No personal info required. I'll be adding default user/room functionality in the future. But right now, you see, I must rest.");
    } else {
      sendRoll(e, props.creatureName, props.action);
      // clearRollState();
    }
  };
	
  return (
		<p>
			<button 
        className="action-btn"
        onClick={(e) => handleClick(e)}
        tabIndex={!props.isExpanded ? -1 : 0}
      >
				<b><i>{props.action.name}.</i></b>
			</button>
			{props.action.desc}
		</p>
	);
};

export default CreatureAction;