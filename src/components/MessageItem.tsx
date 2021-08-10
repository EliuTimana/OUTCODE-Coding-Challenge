import * as React from "react";
import {Card, CardContent, Typography} from "@material-ui/core";
import {Message} from "../models";
import styled from "styled-components";

export interface MessageProps extends Message {
    onClear?: () => {};
}

const StyledCard = styled(Card)`
  margin: 5px;
  background-color: ${(props) => props.color};
`

export const MessageItem = ({message, priority, onClear}: MessageProps) => {
    const getBackgroundColor = () => {
        switch (priority) {
            case 1:
                return '#F56236';
            case 2:
                return '#FCE788';
            case 3:
                return '#88FCA3';
        }
    }
    return <StyledCard color={getBackgroundColor()}>
        <CardContent>
            <Typography variant={"body2"} component={"p"}>{message}</Typography>
        </CardContent>
    </StyledCard>
}