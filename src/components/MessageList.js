import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Api from '../api'
import {MessageColumn} from "./MessageColumn";
import styled from "styled-components";
import {uniqueId} from "lodash";

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

const Column = styled.div`
  flex: 1;
`

const StyledButton = styled(Button)`
  background-color: #88FCA3 !important;
  color: black;
`

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
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
    messages.unshift({...message, id: uniqueId()})
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
      <StyledButton
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
        {isApiStarted ? 'STOP' : 'START'}
      </StyledButton>
    )
  }

  handleDelete = (id) => {
    this.setState({
      messages: this.state.messages.filter(m => m.id != id)
    });
  }

  render() {
    return (
      <div>
        <ButtonsContainer>
          {this.renderButton()}
          <StyledButton variant="contained">CLEAR</StyledButton>
        </ButtonsContainer>
        <Row>
          <Column>
            <MessageColumn messages={this.state.messages.filter(m=>m.priority===1)} type={1} onDelete={id=> this.handleDelete(id)}/>
          </Column>
          <Column>
            <MessageColumn messages={this.state.messages.filter(m=>m.priority===2)} type={2} onDelete={id=> this.handleDelete(id)}/>
          </Column>
          <Column>
            <MessageColumn messages={this.state.messages.filter(m=>m.priority===3)} type={3} onDelete={id=> this.handleDelete(id)}/>
          </Column>
        </Row>
      </div>
    )
  }
}

export default MessageList
