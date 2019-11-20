import React from 'react';
import './MessageItem.css';
import { rollAttack, rollDamage, getTotalDamage } from "../../../Roll";

// const MessageItem = ({ message: { text, user }, name }) => {
const RollMessageItem = ({message: {text: {creatureName, action}, user}, name}) => {
  let isSentByCurrentUser = false;
  let isCrit = false;

	const trimmedName = name.trim().toLowerCase();

	if (user === trimmedName) {
		isSentByCurrentUser = true;
  }
  
  const getAttackRoll = () => {
    let d20 = rollAttack();
    let bonus = action.attack_bonus;
    // let string = `${d20} ${bonus >= 0 && "+"} ${bonus} = ${d20 + bonus}`;
    if(d20 == 20) {
      isCrit = true;
    }
    return `${d20} ${bonus >= 0 && "+"} ${bonus} = ${d20 + bonus}`;
  }

  const getDamageRoll = () => {
    const damageArray = rollDamage(action.damage_dice, action.damage_bonus, isCrit);
    console.log(damageArray);
    let damageString = damageArray[0].toString();
    for(let el of damageArray) {
      damageString += ` + ${el}`;
    }
    damageString += ` = ${getTotalDamage(damageArray)}`;
    console.log(damageString);
    return damageString;
  };

	return (
		<div className={`message-container color-white ${isSentByCurrentUser ? "justify-end" : "justify-start"}`}>
			<p className={`sent-text ${isSentByCurrentUser ? "pr2" : "pl2"}`}>{isSentByCurrentUser ? trimmedName : user}</p>
			<div className={`message-box ${isSentByCurrentUser ? "you" : "others"}`}>
				<p className="message-text">{creatureName}</p>
				<p className="message-text">
					<span>{action.name}</span>: {action.desc}
				</p>
				{action.attack_bonus && action.damage_bonus && action.damage_dice ? (
					<React.Fragment>
						<p className={`message-text ${isCrit && "ba"}`}>Attack: {isCrit ? getAttackRoll + " Critical Hit!" : getAttackRoll}</p>
						<p className={`message-text ${isCrit && "ba"}`}>Damage: {getDamageRoll}</p>
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

export default RollMessageItem;