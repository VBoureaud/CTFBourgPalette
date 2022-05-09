import React from 'react';

import { ContactsOutlined } from '@ant-design/icons';

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

type PhoneContactType = {
  onClick?: Function;
};
type PhoneContactTiledType = {
  onClick?: Function;
};

function PhoneContact(props: PhoneContactType) {
	return (
		<div style={styles.content}>
    </div>
	)
}

export const PhoneContactTiled = (props: PhoneContactTiledType) => {
  return (
    <div style={styles.tiled}>
      <ContactsOutlined style={{ fontSize: '35px', marginBottom: '2px' }} />
      <p>CONTACT</p>
    </div>
  )
}

export default PhoneContact;