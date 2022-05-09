import React from 'react';

import { MailOutlined } from '@ant-design/icons';

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

type PhoneMailType = {
  onClick?: Function;
};
type PhoneMailTiledType = {
  onClick?: Function;
};

function PhoneMail(props: PhoneMailType) {
	return (
		<div style={styles.content}>
    </div>
	)
}

export const PhoneMailTiled = (props: PhoneMailTiledType) => {
  return (
    <div style={styles.tiled}>
      <MailOutlined style={{ fontSize: '35px', marginBottom: '2px' }} />
      <p>MAIL</p>
    </div>
  )
}

export default PhoneMail;