import { useContext } from 'react'
import { CTX } from '../../Store'

// const CreatureAction = ({action, creatureName, displayAction, isExpanded, chatOpen, onOpenChatPanel}) => {
const CreatureAction = (props) => {
  const { sendRoll } = useContext(CTX)

  const handleClick = (e) => {
    let att = Math.floor(Math.random() * 20 + 1)
    if (!props.chatOpen) {
      props.onOpenChatPanel(e)
      console.log('ATTACK ROLL: ' + att + ' + ' + props.action.attack_bonus + ' = ' + (att + props.action.attack_bonus))
      alert(
        'To avoid seeing this alert everytime you click a monster action, join a chat room. No personal info required. Just let the rest of your party know the name of your room so they can join it.'
      )
    } else {
      sendRoll(e, props.creatureName, props.action)
    }
  }

  return (
    <p>
      <button className="action-btn" onClick={(e) => handleClick(e)} tabIndex={!props.isExpanded ? -1 : 0}>
        <b>
          <i>{props.action.name}.</i>
        </b>
      </button>
      {props.action.desc}
    </p>
  )
}

export default CreatureAction
