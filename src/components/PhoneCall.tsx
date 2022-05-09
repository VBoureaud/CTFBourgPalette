import React from 'react';

import { PhoneOutlined } from '@ant-design/icons';

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

type PhoneCallType = {
  onClick?: Function;
};
type PhoneCallTiledType = {
  onClick?: Function;
};

function PhoneCall(props: PhoneCallType) {
	return (
		<div style={styles.content}>
    </div>
	)
}

export const PhoneCallTiled = (props: PhoneCallTiledType) => {
  return (
    <div style={styles.tiled}>
      <PhoneOutlined style={{ fontSize: '35px', marginBottom: '2px' }} />
      <p>CALL</p>
    </div>
  )
}

export default PhoneCall;