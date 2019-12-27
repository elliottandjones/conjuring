import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { rollAttack, rollDamage, getTotalDamage } from "./Roll";

import './Messages.css';
// import MessageItem from "./MessageItem";
// import RollMessageItem from './RollMessageItem';


// message: [username, text]
const MessageItem = ({text, ...args}) => {
// const MessageItem = ({username, sender, messageText}) => {
  let isSentByCurrentUser = false;
  
	const trimmedName = args[0].trim().toLowerCase();

	if (args[0] === trimmedName) {
		isSentByCurrentUser = true;
	}

	return (
		<div className={`message-container color-white ${isSentByCurrentUser ? "justify-end" : "justify-start"}`}>
			<p className={`sent-text ${isSentByCurrentUser ? "pr2" : "pl2"}`}>{isSentByCurrentUser ? trimmedName : args[0]} at {args[1]}</p>
			<div className={`message-box ${isSentByCurrentUser ? 'you':'others'}`}>
				<p className="message-text">{text}</p>
			</div>
		</div>
	);
};

// const MessageItem = ({ message: { text, user }, name }) => {
const RollMessageItem = ({message: {user="inkeeper", text: {creatureName, action}}, name, time}) => {
  let isSentByCurrentUser = false;
  let isCrit = false;

	const trimmedName = name.trim().toLowerCase();

	if (user === trimmedName) {
		isSentByCurrentUser = true;
  }
  
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

const MessageList = ({ messages, username }) => (
	<ScrollToBottom className="messages">
    <ul style={{ listStyleType: 'none' }}>
      {messages.map((message="", index) => (
        <li key={`message_item_${index}`}>
          {
            !message.isAction ?
              <MessageItem username={username} message={message} />
              : <RollMessageItem username={username} message={message} />
          }
        </li>
		  ))}
    </ul>
	</ScrollToBottom>
);

export default MessageList;

