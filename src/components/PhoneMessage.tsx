import React from 'react';

import { MessageOutlined } from '@ant-design/icons';

const styles = {
  tiled: {
    width: '100%',
    height: '100%',
    //background: 'blue',
    background: 'grey',
    display: 'flex',
    flexDirection: 'column',
  } as React.CSSProperties,
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
  } as React.CSSProperties,
};

type PhoneMessageType = {
  onClick?: Function;
};
type PhoneMessageTiledType = {
  onClick?: Function;
};

function PhoneMessage(props: PhoneMessageType) {
	return (
		<div style={styles.content}>
    </div>
	)
}

export const PhoneMessageTiled = (props: PhoneMessageTiledType) => {
  return (
    <div style={styles.tiled}>
      <MessageOutlined style={{ fontSize: '35px', marginBottom: '2px' }} />
      <p>SMS</p>
    </div>
  )
}

export default PhoneMessage;