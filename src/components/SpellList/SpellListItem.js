import React from 'react';

class SpellListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      isApplied: false
    };
    this.spellBodyRef = React.createRef();
  }

  onToggle(e) {
    e.preventDefault();
    this.setState({
      isExpanded: !(this.state.isExpanded),
      height: this.spellBodyRef.clientHeight
    });
  }
  onApplyToggle(e) {
    e.preventDefault();
    this.setState({ isApplied: !(this.state.isApplied) });
  }

  formatLevel = (level) => {
    if (level === 1) { return 'st'; }
    else if (level === 2) { return 'nd'; }
    else if (level === 3) { return 'rd'; }
    else { return 'th'; }
  }

  render() {
    const { spell, onSpellSelect } = this.props;
    const { isExpanded, isApplied, height } = this.state;
    const currentHeight = isExpanded ? height : 0;
    const buttonText = isApplied ? 'Deselect this Spell' : "Select this Spell";
    const lvl = this.formatLevel(spell.level);
    return (
      <div className="pa1 ma1 spell-item">
        <div className={`mt1 mb1 fira derk ${isExpanded ? 'name-expanded' : 'name-initial tc groww'}`} onClick={(e) => this.onToggle(e)}>
          <span>{spell.name}</span>
        </div>
        <div className={`item-collapse ${isExpanded ? 'is-expanded bg-opac' : ''}`} style={{ height: currentHeight }} >
          <div className="item-body" ref={this.spellBodyRef}>
            {
              spell.ritual
                ? <p style={{ marginTop: '0' }}><i>{spell.level}{lvl}-level {spell.school.name.toLowerCase()} (ritual)</i></p>
                : <p style={{ marginTop: '0' }}><i>{spell.level}{lvl}-level {spell.school.name.toLowerCase()}</i></p>
            }
            <hr />
            <p><b>Casting Time:</b> {spell.casting_time}</p>
            <p><b>Range:</b> {spell.range}</p>
            {
              spell.components.slice(-1) !== "M"
                ? <p><b>Components:</b> {spell.components}</p>
                : <p><b>Components:</b> {spell.components} ({spell.material})</p>
            }
            {
              spell.concentration
                ? <p><b>Duration:</b> Concentration, {spell.duration.toLowerCase()}</p>
                : <p><b>Duration:</b> {spell.duration.toLowerCase()}</p>
            }
            <hr />
            {
              spell.description.map(para => {
                return para.startsWith('-')
                  ? <li key={para}>{para.slice(1)}</li>
                  : <p key={para}>{para}</p>
              })
            }
            {
              spell.higher_level
                ? <p><b><i>At Higher Levels.</i></b> {spell.higher_level}</p>
                : ''
            }
            <hr />
            <p className="o-60">Classes: {spell.classes}</p>

            <button
              className={`filter-toggle select ${isApplied ? 'dn' : 'db '}`}
              type="submit"
              onClick={(e) => { this.onApplyToggle(e); onSpellSelect(spell); }}
            >{buttonText}
            </button>
            <button
              className={`filter-toggle deselect ${isApplied ? 'db ' : 'dn'}`}
              type="submit"
              onClick={(e) => { this.onApplyToggle(e); onSpellSelect({}); }}
            >{buttonText}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SpellListItem;

// <button className="unfilter-btn" type="submit" onClick={() => { }} ></button>