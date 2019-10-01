import React from "react";

const CreatureAction = ({action, name, displayAction}) => {
  return (
		<p>
			<button className="action-btn" onClick={(e) => displayAction(e, action, name)}>
				<b><i>{action.name}.</i></b>
			</button>
			{action.desc}
		</p>
	);
};

export default CreatureAction;