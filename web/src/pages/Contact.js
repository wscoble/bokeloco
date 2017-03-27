import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import Toggle from 'material-ui/Toggle'
import Paper from 'material-ui/Paper'
import injectAws from '../services/injectAws'

// assets

import './Contact.css'

// sender

const send = (lambda, form) => (
  new Promise((resolve, reject) => {
    let params = {
      FunctionName: process.env.REACT_APP_LAMBDA_MESSAGE_SEND_FUNCTION_NAME,
      Payload: JSON.stringify(form)
    }
    lambda.invoke(params, (err, data) => {
      if (err) reject(err)
      console.log(data)
    })
  })
)

// component

class Contact extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      phone: '',
      doCall: false,
      message: '',
      isValid: false
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let nameIsValid = this.state.name !== ''
    let emailIsValid = this.state.email !== ''
    let messageIsValid = this.state.message !== ''

    let isValid = nameIsValid && emailIsValid && messageIsValid

    if (this.state.isValid !== isValid) {
      this.setState({isValid: isValid})
    }
  }

  resetState() {
    this.setState({
      name: '',
      email: '',
      phone: '',
      doCall: false,
      message: '',
      isValid: false
    })
  }

  send() {
    let { lambda } = this.props
    console.log(this.state)
  }

  render() {
    return (
      <Paper style={{maxWidth: '600px', margin: '0 auto', padding: '1em', marginTop: '1em', marginBottom: '1em'}}>
        <h2>Contact Me</h2>
        <TextField
          style={{width: "100%"}}
          onChange={(e) => this.setState({name: e.target.value})}
          value={this.state.name}
          floatingLabelText="Name" />
        <TextField
          style={{width: "100%"}}
          onChange={(e) => this.setState({email: e.target.value})}
          value={this.state.email}
          floatingLabelText="Email" />
        <TextField
          style={{width: "100%"}}
          onChange={(e) => this.setState({phone: e.target.value})}
          value={this.state.phone}
          floatingLabelText="Phone Number" />
        <Toggle
          labelPosition="right"
          labelStyle={{fontSize: '0.9em', fontWeight: 100}}
          onToggle={(e, value) => this.setState({doCall: value})}
          toggled={this.state.doCall}
          disabled={this.state.phone === ''}
          label="Want me to call you?" />
        <br />
        <TextField
          style={{width: "100%"}}
          onChange={(e) => this.setState({message: e.target.value})}
          value={this.state.message}
          floatingLabelText="Message"
          multiLine={true} />
        <br />
        <FlatButton
          style={{padding: '0 20px', margin: '0 10px', color: '#675a48'}}
          onClick={() => this.resetState()}
          rippleColor='#fbe923'>Clear</FlatButton>
        <FlatButton
          style={{padding: '0 20px', margin: '0 10px', color: '#675a48'}}
          rippleColor='#fbe923'
          disabled={!this.state.isValid}
          onClick={() => this.send()}>Send</FlatButton>
      </Paper>
    )
  }
}

export default injectAws(Contact)
