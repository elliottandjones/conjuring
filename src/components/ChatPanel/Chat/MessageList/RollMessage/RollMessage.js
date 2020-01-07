import React from 'react';

import { rollAttack, rollDamage, getTotalDamage } from "./roll";

import './RollMessage.css';

// const MessageItem = ({ message: { text, user }, name }) => {
const RollMessage = ({user, message: {creatureName, action}, name, createdAt}) => {
  const [isCrit, setIsCrit] = React.useState(false);
  const [attackRoll, setAttackRoll] = React.useState();
  const [damageRoll, setDamageRoll] = React.useState();

  
  let isCurrentUser = false;
  // let isCrit = false;
  
	const trimmedName = name.trim().toLowerCase();
  
	if (user === trimmedName) {
    isCurrentUser = true;
  }
  React.useEffect(() => {
    console.log(`createdAt: ${createdAt}, user: ${user}, name: ${name}`);
    setAttackRoll(getAttackRoll());
    setDamageRoll(getDamageRoll());
    // return () => {
    // };
  }, []);
  
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
			<p className={`sentText ${isCurrentUser ? "pr3" : "pl3"}`}>{isCurrentUser ? trimmedName : user} at {createdAt}</p>
			<div className={`messageBox ${isCurrentUser ? "you" : "others"}`}>
				<h4 className="messageText">{creatureName}</h4>
				<p className="messageText">
					<b>{action.name}</b>: {action.desc}
				</p>
				{action.attack_bonus && action.damage_bonus ? (
					<React.Fragment>
						<p className={`messageText ${isCrit && "BA"}`}>Attack: {isCrit ? attackRoll + " Critical Hit!" : attackRoll}</p>
						<p className={`messageText ${isCrit && "BA"}`}>Damage: {damageRoll}</p>
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