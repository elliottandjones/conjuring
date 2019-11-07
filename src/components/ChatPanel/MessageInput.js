import React from 'react';

export default class MessageInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      isTyping: false
    };
  }
  
  componentWillUnmount() {
    this.stopCheckingIfTyping();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.sendMessage();
    this.setState({message:""});
  }

  sendMessage = () => {
    this.props.sendMessage(this.state.message);
  }
  
  sendTyping = () => {
    this.lastUpdateTime = Date.now();
    if (!this.state.isTyping) {
      this.setState({isTyping:true});
      this.props.sendTyping(true);
      this.checkIfTyping();
    }
  }

  // begin interval that checks if user is typing
  checkIfTyping = () => {
    console.log("Typing...");
    this.typingInterval = setInterval(() => {
      if ((Date.now() - this.lastUpdateTime) > 500) {
        this.setState({isTyping:false});
        this.stopCheckingIfTyping();
      }
    }, 500);
  }
  // stops interval from checking if user is typing
  stopCheckingIfTyping = () => {
    console.log("ya stopped typing...");
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
      this.props.sendTyping(false);
    }
  }
  render() {
    const { message } = this.state;
    return (
      <div id="chat-in" className="compose">
        <form onSubmit={this.handleSubmit}>
          <input
            // onChange={e => props.onTextValueChange(e)}
            onChange={e => this.setState({message: e.target.value})}
            type="text"
            name="message"
            placeholder="Message"
            // value={props.textValue}
            value={message}
            required
            autoComplete={"off"}
            onKeyUp={(e) => { e.keyCode !== 13 && this.sendTyping()}}
          />
          <button 
            type="submit"
            className="send"
            disabled={message.length < 1}
          >Send</button>
        </form>
      </div>
    );
  }
}
// <form onSubmit={props.sendMessage}></form>