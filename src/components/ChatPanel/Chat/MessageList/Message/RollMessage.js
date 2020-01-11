import { useDidMount } from '@withvoid/melting-pot';
import React from 'react';
import './Message.css';
import { getTotalDamage, rollAttack, rollDamage } from "./roll";

// const MessageItem = ({ message: { text, user }, name }) => {
const RollMessage = ({message: {name, creatureName, action, createdAt}, clientName}) => {
  const [isCrit, setIsCrit] = React.useState(false);
  const [attackRoll, setAttackRoll] = React.useState([]);
  const [damageRoll, setDamageRoll] = React.useState('');

  
  let isCurrentUser = false;
  // let isCrit = false;
  
	const trimmedClientName = clientName.trim();
  
	if (name === trimmedClientName) {
    isCurrentUser = true;
  }
  useDidMount(() => {
    console.log(`createdAt: ${createdAt}, user: ${name}, clientName: ${clientName}`);
    setAttackRoll(getAttackRoll());
    setDamageRoll(getDamageRoll());
    // return () => {
    // };
  });
  
  const getAttackRoll = () => {
    const d20 = rollAttack();
    console.log("d20: ", d20);
    console.log("d20 TYPE: ", typeof d20);
    const bonus = action.attack_bonus;
    console.log("bonus: ", bonus);
    console.log("bonus TYPE: ", typeof bonus);
    if(d20 === 20) {
      setIsCrit(true);
    }
    console.log(`${d20} ${bonus >= 0 && "+"} ${bonus} = ${d20 + bonus}`);
    return [d20, bonus]; // array of numbers
  }

  const getDamageRoll = () => {
    const damageArray = rollDamage(action.damage_dice, action.damage_bonus, isCrit);
    if(damageArray.length === 1) {
      return damageArray[0].toString();
    }
    let damageString = '';
    console.log(damageArray);
    for(let i = 0; i < damageArray.length;i++) {
      // console.log(i);
      damageString += ` + ${damageArray[i]}`;
    }
    damageString += ` = ${getTotalDamage(damageArray)}`;
    console.log(damageString);
    console.log(damageArray);
    console.log("damagestring TYPE: ",typeof damageString);
    return damageString;
  };

  // const thisAttackRoll = getAttackRoll();
  // const thisDamageRoll = getDamageRoll();

	return (
		<div className={`messageContainer colorWhite ${isCurrentUser ? "justifyEnd" : "justifyStart"}`}>
			<p className={`sent-text ${isCurrentUser ? "pr3" : "pl3"}`}>{isCurrentUser ? trimmedClientName : name} at {createdAt}</p>
			<div className={`message-box ${isCurrentUser ? "you" : "others"}`}>
				<h4 className="message-text">{creatureName}</h4>
				<p className="message-text">
					<b>{action.name}</b>: {action.desc}
				</p>
				{action.attack_bonus && action.damage_bonus ? (
					<React.Fragment>
						<p className="message-text">
							Attack: <span className={`${isCrit && "ba"}`}>{attackRoll[0]}</span> + {attackRoll[1]} = <strong>{attackRoll[0] + attackRoll[1]}</strong>
							{isCrit && <em>Critical Hit! Yaaaaaas!</em>}
						</p>
						<p className={`message-text ${isCrit && "ba"}`}>Damage: {damageRoll}</p>
					</React.Fragment>
				) : (
					<p style={{ fontSize: "0.8em" }}>
						<strong>This action has no associated attack/damage rolls. ¯\_(ツ)_/¯</strong>
					</p>
				)}
			</div>
		</div>
	);
};

export default RollMessage;