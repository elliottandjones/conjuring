import React from "react";
// import useChat from "../../hooks/useChat";
import { rollAttack } from '../ChatPanel/Messages/Roll';
import {CTX} from '../../Store';

// action.attack_bonus, action.damage_bonus, action.damage_dice

// const CreatureAction = ({action, creatureName, displayAction, isExpanded}) => {
const CreatureAction = ({action, creatureName, isExpanded, chatOpen, onOpenChatPanel}) => {
  // const {name, room, sendRollMessage} = useChat();
  const context = React.useContext(CTX);
  const handleClick = (e) => {
    e.preventDefault();
    console.log('ATTACK ROLL: ' + rollAttack() + ' + ' + action.attack_bonus);
    
    if ((context.room === "" || context.name === "") && !chatOpen) {
      onOpenChatPanel(e);
      alert("ATTACK ROLL: " + rollAttack() + " + " + action.attack_bonus);
      alert("To not have to see these alerts everytime you click a monster action, join a chat room. No email or any other personal info required.");
    } else {
      return context.sendRollMessage({ creatureName, action });
    }
  };

	
  return (
		<p>
			<button 
        className="action-btn"
        onClick={(e) => handleClick(e)}
        tabIndex={!isExpanded ? -1 : 0}
      >
				<b><i>{action.name}.</i></b>
			</button>
			{action.desc}
		</p>
	);
};

export default CreatureAction;