import React from 'react';
import './MessageItem.css';
import { rollAttack, rollDamage, getTotalDamage } from "./Roll";

// const MessageItem = ({ message: { text, user }, name }) => {
const RollMessageItem = ({message: {user="inkeeper", text: {creatureName, action}}, name, time}) => {
  let isSentByCurrentUser = false;
  let isCrit = false;

	const trimmedName = name.trim().toLowerCase();

	if (user === trimmedName) {
		isSentByCurrentUser = true;
  }
  //die face-1  html code:  &#9856;
  //die face-2  html code:  &#9857;
  //die face-3  html code:  &#9858;
  //die face-4  html code:  &#9859;
  //die face-5  html code:  &#9860;
  //die face-6  html code:  &#9861;
  const getAttackRoll = () => {
    let d20 = rollAttack();
    let bonus = action.attack_bonus;
    if(d20 === 20) {
      isCrit = true;
    }
    return `${d20} ${bonus >= 0 && "+"} ${bonus} = ${d20 + bonus}`;
  }

  const getDamageRoll = () => {
    const damageArray = rollDamage(action.damage_dice, action.damage_bonus, isCrit);
    console.log(damageArray);
    let damageString = damageArray[0].toString();
    for(var i of damageArray) {
      console.log(i);
      damageString += ` + ${i}`;
    }
    damageString += ` = ${getTotalDamage(damageArray)}`;
    console.log(damageString);
    return damageString;
  };

	return (
		<div className={`message-container color-white ${isSentByCurrentUser ? "justify-end" : "justify-start"}`}>
			<p className={`sent-text ${isSentByCurrentUser ? "pr2" : "pl2"}`}>{isSentByCurrentUser ? trimmedName : user} at {time}</p>
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