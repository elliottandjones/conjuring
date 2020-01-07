import React from "react";
// import useChat from "../../hooks/useChat";
import { rollAttack } from '../ChatPanel/Chat/Messages/RollMessage/roll';
import {CTX} from '../../Store';

// action.attack_bonus, action.damage_bonus, action.damage_dice

// const CreatureAction = ({action, creatureName, displayAction, isExpanded, chatOpen, onOpenChatPanel}) => {
const CreatureAction = (props) => {
  // const {name, room, sendRollMessage} = useChat();
  const {sendRollMessage} = React.useContext(CTX);
  
  const handleClick = (e) => {
    let att = rollAttack();
    console.log('ATTACK ROLL: ' + att + ' + ' + props.action.attack_bonus + ' = ' + (att + props.action.attack_bonus));
    
    if (!props.chatOpen) {
      props.onOpenChatPanel(e);
      // alert("ATTACK ROLL: " + rollAttack() + " + " + action.attack_bonus);
      // alert("To not have to see these alerts everytime you click a monster action, join a chat room. No email or any other personal info required.");
    } else {
      sendRollMessage(e, props.creatureName, props.action );
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