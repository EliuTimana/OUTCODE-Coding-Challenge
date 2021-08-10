import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Api from '../api'
import {MessageColumn} from "./MessageColumn";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

const Column = styled.div`
  flex: 1;
`

class MessageList extends Component {
  constructor(...args) {
    super(...args)
    this.state = {
      messages: [],
    }
  }

  api = new Api({
    messageCallback: (message) => {
      this.messageCallback(message)
    },
  })

  componentDidMount() {
    this.api.start()
  }

  messageCallback(message) {
    const { messages } = this.state
    messages.unshift(message)
    this.setState({
      messages: [
        ...messages.slice()
      ],
    }, () => {
      // Included to support initial direction. Please remove upon completion
    })
  }

  renderButton() {
    const isApiStarted = this.api.isStarted()
    return (
      <Button
        variant="contained"
        onClick={() => {
          if (isApiStarted) {
            this.api.stop()
          } else {
            this.api.start()
          }
          this.forceUpdate()
        }}
      >
        {isApiStarted ? 'Stop Messages' : 'Start Messages'}
      </Button>
    )
  }

  render() {
    return (
      <div>
        {this.renderButton()}
        <Row>
          <Column>
            <MessageColumn messages={this.state.messages.filter(m=>m.priority===1)} type={1}/>
          </Column>
          <Column>
            <MessageColumn messages={this.state.messages.filter(m=>m.priority===2)} type={2}/>
          </Column>
          <Column>
            <MessageColumn messages={this.state.messages.filter(m=>m.priority===3)} type={3}/>
          </Column>
        </Row>
      </div>
    )
  }
}

export default MessageList
