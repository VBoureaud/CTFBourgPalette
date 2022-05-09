import React from 'react';
import { Typography } from "antd";
const { Title } = Typography;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
  } as React.CSSProperties,
  header: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    //background: "rgba(89, 89, 89, 0.74) none repeat scroll 0% 0%",
    padding: 0,
  } as React.CSSProperties,
  headerContainer: {
    padding: '10px',
    boxSizing: 'border-box',
    margin: 'auto',
    display: "flex",
    height: '100%',
    justifyContent: "space-between",
    alignItems: "center",
    //fontFamily: "Roboto, sans-serif",
  } as React.CSSProperties,
  rightHeader: {
    display: 'flex',
    alignItems: 'center'
  } as React.CSSProperties,
  btnBox: {
    position: 'relative',
    top: '12px',
  } as React.CSSProperties
};

type NavBarType = {
  onClick?: Function;
};

function NavBar(props: NavBarType) {
	return (
		<div style={styles.header}>
      <div style={styles.headerContainer}>
        <span style={{ display: "flex", flexDirection: 'row', alignItems: 'center', lineHeight: '15px' }}>
          <Title style={{ color: 'white', margin: '5px', fontSize: '13px', textShadow: '1px 1px #7b4b00', fontStyle: 'italic' }}>CTFBourgPalette</Title>
        </span>
        <div onClick={() => props && props.onClick && props.onClick()} style={styles.rightHeader}>
          <p className="btnBox nes-btn is-primary" style={{ padding: '0 10px' }}>
            <span style={{ color: 'white', fontSize: '16px' }}>Menu</span>
          </p>
        </div>
      </div>
    </div>
	)
}

export default NavBar;