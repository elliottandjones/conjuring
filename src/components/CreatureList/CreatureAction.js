import React from "react";
import { CTX } from "../../Store";
import { rollAttack } from '../../Roll';

// action.attack_bonus, action.damage_bonus, action.damage_dice

// const CreatureAction = ({action, creatureName, displayAction, isExpanded}) => {
const CreatureAction = ({action, creatureName, isExpanded}) => {
  const socket = React.useContext(CTX);

  const sendRollMessage = (e, action, creatureName) => {
    e.preventDefault();

    if(!socket) {
      console.log("SOCKET VALUE from CTX: ERROR!!!");
      console.log('ATTACK ROLL: ' + rollAttack() + ' + ' + action.attack_bonus);
      alert(rollAttack());
      alert("To not have to see these alerts everytime you click a monster action, join a chat room. No email or any other personal info required.");
    } else {
      console.log(socket.id);
      if (action) {
        socket.emit("sendRollMessage", { creatureName, action });
      }
      
    }
  };

	
  return (
		<p>
			<button 
        className="action-btn"
        onClick={(e) => sendRollMessage(e, action, creatureName)}
        // onClick={(e) => displayAction(e, action, creatureName)}
        tabIndex={!isExpanded ? -1 : 0}
      >
				<b><i>{action.name}.</i></b>
			</button>
			{action.desc}
		</p>
	);
};

export default CreatureAction;