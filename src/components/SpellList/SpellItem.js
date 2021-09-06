import React, { useRef } from 'react'
import { useToggle, useToggleHeight } from '../../hooks/useToggle'
import './SpellItem.css'

const SpellItem = ({ spell, onSpellSelect }) => {
  const heightRef = useRef(null)
  const [isExpanded, height, toggleExpand] = useToggleHeight([false, heightRef])
  const [isToggled, toggle] = useToggle(false)

  const formatLevel = level => {
    if (level === 1) {
      return 'st'
    } else if (level === 2) {
      return 'nd'
    } else if (level === 3) {
      return 'rd'
    } else {
      return 'th'
    }
  }
  // const selectThisSpell = () => {
  //   if (isToggled === false) {
  //     onSpellSelect(spell);
  //   } else {
  //     onSpellSelect({});
  //   }
  // };

  const currentHeight = isExpanded ? height : 0
  const buttonText = isToggled ? 'Deselect this Spell' : 'Select this Spell'
  const lvl = formatLevel(spell.level)

  return (
    <div className={`pa1 ma1 spell-item ${isExpanded ? 'inset spell-ex' : 'outset'}`}>
      <div
        className={`mt1 mb1 derk ${isExpanded ? 'name-expanded' : 'name-initial tc'}`}
        onClick={e => toggleExpand(e)}
      >
        <span className="name">
          {spell.name} {spell?.is_homebrew && '(Homebrew)'}
        </span>
      </div>
      <div
        className={`item-collapse ${isExpanded && 'is-expanded bg-opac'}`}
        style={{ height: currentHeight }}
        aria-expanded={isExpanded}
        aria-hidden={!isExpanded}
      >
        <div className="item-body" ref={heightRef}>
          <p style={{ marginTop: '0' }}>
            <i>
              {spell.level}
              {lvl}-level {spell.school.name} {spell.ritual && <span> (ritual)</span>}
            </i>
          </p>
          <hr />
          <p>
            <b>Casting Time:</b> {spell.casting_time}
          </p>
          <p>
            <b>Range:</b> {spell.range}
          </p>
          <p>
            <b>Components:</b> {spell.components}{' '}
            {spell.components.slice(-1) === 'M' && <span> ({spell.material}) </span>}
          </p>
          <p>
            <b>Duration:</b> {spell.concentration && <span>Concentration, </span>} {spell.duration}
          </p>
          <hr />
          {spell.description.map(para =>
            para.startsWith('-') ? <li key={para}>{para.slice(1)}</li> : <p key={para}>{para}</p>
          )}
          {spell.higher_level && (
            <p>
              <b>
                <i>At Higher Levels.</i>
              </b>{' '}
              {spell.higher_level}
            </p>
          )}
          <hr />
          <p className="o-80">Classes: {spell.classes}</p>
          <button
            className={`filter-toggle db ${isToggled ? 'selected' : 'unselected'}`}
            type="submit"
            onClick={e => {
              // filter against toggleState before updating the ui
              isToggled === false ? onSpellSelect(spell) : onSpellSelect({})
              toggle(e)
            }}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SpellItem
