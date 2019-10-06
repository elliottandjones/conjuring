import React from "react";

const CreatureAction = ({action, name, displayAction, isExpanded}) => {
  // const tabbable = !isExpanded ? -1 : 0;
  return (
		<p>
			<button 
        className="action-btn"
        onClick={(e) => displayAction(e, action, name)}
        tabIndex={!isExpanded ? -1 : 0}
      >
				<b><i>{action.name}.</i></b>
			</button>
			{action.desc}
		</p>
	);
};

export default CreatureAction;