import React from 'react';

const styles = {
  phone: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    width: '100%',
    minWidth: '270px',
    maxWidth: '330px',
    height: '90vh',
    maxHeight: '600px',
  } as React.CSSProperties,
  lineHorizontal: {
  	background: 'black',
  	height: '3%',
  	width: '95%',
  	margin: 'auto',
  } as React.CSSProperties,
  containVertical: {
  	background: "white",
  	display: 'flex',
  	justifyContent: 'space-between',
  	height: '100%',
  } as React.CSSProperties,
  lineVertical: {
  	background: 'black',
  	width: '5%',
  	height: '100%',
  } as React.CSSProperties,
  containScreen: {
  	display: 'flex',
  	alignItems: 'center',
  	height: '100%',
  	width: '100%',
    maxWidth: '273px',
		flexDirection: 'column',
  } as React.CSSProperties,
  soundBar: {
  	margin: 'auto',
  	background: 'black',
  	width: '50%',
  	height: '3%',
  } as React.CSSProperties,
  screen: {
  	color: 'white',
  	padding: '2%',
  	boxSizing: 'border-box',
  	background: 'black',
  	width: '93%',
  	height: '78%',
  } as React.CSSProperties,
  button: {
  	margin: '4% 0',
  	background: 'black',
  	width: '10%',
  	height: '5%',
  } as React.CSSProperties,
};

type PixelPhoneType = {
  children?: any;
};

function PixelPhone(props: PixelPhoneType) {
	return (
		<div style={styles.phone}>
    	<div style={styles.lineHorizontal}></div>
    	<div style={styles.containVertical}>
    		<div style={styles.lineVertical}></div>
    		<div style={styles.containScreen}>
    			<div style={styles.soundBar}></div>
    			<div style={styles.screen}>
    				{props.children}
    			</div>
    			<div style={styles.button}></div>
    		</div>
    		<div style={styles.lineVertical}></div>
    	</div>
    	<div style={styles.lineHorizontal}></div>
    </div>
	)
}

export default PixelPhone;