import React from "react";

const Form = () => {
  return (
		<div class="centered-form">
			<div class="centered-form__box">
				<h1>Join</h1>
				<form action="/chat.html">
					<label>Display name</label>
					<input type="text" name="username" placeholder="Display name" required />
					<label>Room</label>
					<input type="text" name="room" placeholder="Room" required />
					<button>Join</button>
				</form>
			</div>
		</div>
	);
};

export default Form;