import React from 'react'
import './Message.css'

const RollMessage = ({ message: { name, creatureName, action, rolls, createdAt }, clientName }) => {
  // const [rolls, setRolls] = React.useState({att:0, dmg:[], isCrit:false});
  const isCurrentUser = name === clientName.trim() ? true : false

  // const getRolls = () => {
  // 	let isCrit = false;
  // 	const att = rollAttack();
  // 	if(att === 20 || att === '20') {
  // 		isCrit = true;
  // 	}
  // 	const dmg = rollDamage(action.damage_dice, action.damage_bonus, isCrit);
  // 	// console.log("{att, dmg, isCrit}: ",{att: att, dmg: dmg, isCrit: isCrit})
  // 	return { att: att, dmg: dmg, isCrit: isCrit }; // { number, array, boolean }
  // }
  const getTotalDamage = array => {
    let total = 0
    array.map(el => (total += el))
    return total // number
  }

  // React.useEffect(() => {
  // 	setRolls(getRolls());
  // }, []);

  return (
    <div className={`message-container mt1 pl2 pr2 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      {isCurrentUser ? (
        <div className="meta-msg pa1 mt2">
          <i className="sender-name mb2">{clientName}</i>
          <span className="time">{createdAt}</span>
        </div>
      ) : null}
      <div className={`message-box ${isCurrentUser ? 'you' : 'others'}`}>
        <p className="message-text">
          <b>{creatureName}</b>
        </p>
        <p className="message-text">
          <b>{action.name}</b>: {action.desc}
        </p>
        {!action.damage_bonus && !action.damage_dice ? (
          <p>
            <b>This action has no associated attack/damage rolls. ¯\_(ツ)_/¯</b>
          </p>
        ) : (
          <React.Fragment>
            <p className={`message-text ${rolls.isCrit && 'ba'}`}>
              Attack: <span title="attack roll (1d20)">{rolls.att}</span> +{' '}
              <span title="attack bonus">{action.attack_bonus}</span> ={' '}
              <strong title="Total attack">{rolls.att + action.attack_bonus}</strong>{' '}
              {rolls.isCrit && <em>Critical Hit! Yaaaaaas!</em>}
            </p>
            <p className={`message-text ${rolls.isCrit && 'ba'}`}>
              Damage:{' '}
              {rolls.dmg.map((value, index) =>
                index === rolls.dmg.length - 1 ? (
                  <span key={`dmg_bonus_${index}`} title="damage bonus">
                    {value >= 0 ? value : `(${value})`}
                  </span>
                ) : (
                  <span key={`dmg_dice_${index}`} title={`${action.damage_dice}`}>
                    {value} +{' '}
                  </span>
                )
              )}{' '}
              = <strong title="total damage">{getTotalDamage(rolls.dmg)}</strong>
            </p>
          </React.Fragment>
        )}
      </div>
      {!isCurrentUser ? (
        <div className="meta-msg pa1 mt2">
          <i className="sender-name mb2">{name}</i>
          <span className="time">{createdAt}</span>
        </div>
      ) : null}
    </div>
  )
}

export default RollMessage
// !action.damage_bonus && !action.damage_dice ?
// 						<p><b>This action has no associated attack/damage rolls. ¯\_(ツ)_/¯</b></p>
// 						: <React.Fragment>
// 							<p className="message-text">
// 								Attack: <span className={`${isCrit && "ba"}`}>{attackRoll[0]}</span> + {attackRoll[1]} = <strong>{attackRoll[0] + attackRoll[1]}</strong>
// 								{isCrit && <em>Critical Hit! Yaaaaaas!</em>}
// 							</p>
// 							<p className={`message-text ${isCrit && "ba"}`}>Damage: {isCrit && action.damage_bonus ? (parseInt(damageRoll)-action.damage_bonus)*2 + action.damage_bonus : (isCrit && !action.damage_bonus ? parseInt(damageRoll) * 2 : damageRoll)}</p>
// 						</React.Fragment>
