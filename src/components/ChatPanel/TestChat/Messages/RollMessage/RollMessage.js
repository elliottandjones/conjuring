import React from 'react';

import { rollAttack, rollDamage, getTotalDamage } from "./roll";

import './RollMessage.css';

// const MessageItem = ({ message: { text, user }, name }) => {
const RollMessage = ({user, message: {creatureName, action}, name, createdAt}) => {

  let isSentByCurrentUser = false;
  let isCrit = false;

	const trimmedName = name.trim().toLowerCase();

	if (user === trimmedName) {
		isSentByCurrentUser = true;
  }
  
  const getAttackRoll = () => {
    let d20 = rollAttack();
    console.log(d20);
    console.log(typeof d20);
    let bonus = action.attack_bonus;
    console.log(bonus);
    console.log(typeof bonus);
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
      // console.log(i);
      damageString += ` + ${i}`;
    }
    damageString += ` = ${getTotalDamage(damageArray)}`;
    console.log(damageString);
    // console.log(typeof damageString);
    return damageString;
  };

  const thisAttackRoll = getAttackRoll();
  const thisDamageRoll = getDamageRoll();

	return (
		<div className={`messageContainer colorWhite ${isSentByCurrentUser ? "justifyEnd" : "justifyStart"}`}>
			<p className={`sentText ${isSentByCurrentUser ? "pr2" : "pl2"}`}>{isSentByCurrentUser ? trimmedName : user} at {createdAt}</p>
			<div className={`messageBox ${isSentByCurrentUser ? "you" : "others"}`}>
				<p className="messageText">{creatureName}</p>
				<p className="messageText">
					<b>{action.name}</b>: {action.desc}
				</p>
				{action.attack_bonus && action.damage_bonus && action.damage_dice ? (
					<React.Fragment>
						<p className={`messageText ${isCrit && "BA"}`}>Attack: {isCrit ? thisAttackRoll + " Critical Hit!" : thisAttackRoll}</p>
						<p className={`messageText ${isCrit && "BA"}`}>Damage: {thisDamageRoll}</p>
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