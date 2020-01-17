import { useDidMount } from '@withvoid/melting-pot';
import React from 'react';
import './Message.css';
import { getTotalDamage, rollAttack, rollDamage } from "./roll";

const RollMessage = ({message: {name, creatureName, action, createdAt}, clientName}) => {
  const [attackRoll, setAttackRoll] = React.useState([]);
	const [damageRoll, setDamageRoll] = React.useState('');
	const [isCrit, setIsCrit] = React.useState(false);
	// let crit = false;
  const clientUsername = clientName.trim();
  const isCurrentUser = name === clientUsername ? true : false;
	
  useDidMount(() => {
    console.log(`createdAt: ${createdAt}, user: ${name}, clientName: ${clientName}`);
		setAttackRoll(getAttackRoll());
		setTimeout(() => {
			setDamageRoll(getDamageRoll());
		}, 1000);
    // return () => {};
  });
  
  const getAttackRoll = () => {
    const d20 = rollAttack();
    // console.log("d20 TYPE: ", typeof d20);
    // const bonus = action.attack_bonus;
    // console.log("bonus TYPE: ", typeof bonus);
    if(d20 === 20 || d20 === '20') {
			setIsCrit(true);
			// crit = true;
    }
    console.log(`${d20} ${action.attack_bonus >= 0 && "+"} ${action.attack_bonus} = ${d20 + action.attack_bonus}`);
    return [d20, action.attack_bonus]; // array of numbers
  }
// ! MAKE THIS WORK LIKE THE ATTACK ROCK, YA DINGUS!!!
  const getDamageRoll = () => {
    const damageArray = rollDamage(action.damage_dice, action.damage_bonus, isCrit);
    if(damageArray.length === 1) {
      return damageArray[0].toString();
    }
		let damageString = damageArray[0].toString();
    console.log(damageArray);
    for(let i = 1; i < damageArray.length;i++) {
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
		<div className={`message-container mt1 pl2 pr2 ${isCurrentUser ? "justify-end" : "justify-start"}`}>
			{
				isCurrentUser ?
					<div className="pa2 mt2" style={{display: 'inline-block'}}>
						<i className="sender-name mb2">{clientUsername}</i>
						<span className="time">{createdAt}</span>
					</div> : null
			}
			<div className={`message-box ${isCurrentUser ? "you" : "others"}`}>
				<p className="message-text"><b>{creatureName}</b></p>
				<p className="message-text">
					<b>{action.name}</b>: {action.desc}
				</p>
				{
					action.attack_bonus ?
						<React.Fragment>
							<p className="message-text">
								Attack: <span className={`${isCrit && "ba"}`}>{attackRoll[0]}</span> + {attackRoll[1]} = <strong>{attackRoll[0] + attackRoll[1]}</strong>
								{isCrit && <em>Critical Hit! Yaaaaaas!</em>}
							</p>
							<p className={`message-text ${isCrit && "ba"}`}>Damage: {isCrit && action.damage_bonus ? (parseInt(damageRoll)-action.damage_bonus)*2 + action.damage_bonus : (isCrit && !action.damage_bonus ? parseInt(damageRoll) * 2 : damageRoll)}</p>
						</React.Fragment>
						:	<p><b>This action has no associated attack/damage rolls. ¯\_(ツ)_/¯</b></p>
				}
			</div>
			{
				!isCurrentUser ?
					<div className="pa2 mt2" style={{display: 'inline-block'}}>
						<i className="sender-name mb2">{name}</i>
						<span className="time">{createdAt}</span>
					</div> : null
			}
		</div>
	);
};

export default RollMessage;
