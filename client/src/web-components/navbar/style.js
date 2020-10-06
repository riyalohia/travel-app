const NavBar = `
  :host .NavBar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 20px;
    padding-right: 20px;
    flex-grow: 1;
    border-bottom: 1px solid #ededed;
    overflow: visible;
    box-shadow: 0 0px 3px rgba(0, 0, 0, 0.08);
    position: relative;
    z-index: 400;
    height: 50px;
  }

  .NavBar-wrapper {
    display: flex;
    align-items: center;
  }

  .NavBar-Items {
    display: flex;
  }

  .NavBar-Logo {
    height: 40px;
    width: 40px;
    margin-right: 8px;
  }
`;

const NavItem = `
  :host {
    display: inline-block;
    line-height: 20px;
    margin: 0;
    padding: 0;
    margin-right: 30px;
    text-align: left;
    vertical-align: middle;
    padding: 13px 0;
  }

  :host(:hover) {
    cursor: pointer;
    color: #0070dd;
    background: transparent;
  }
`;

const NavBarStyle = new CSSStyleSheet();
NavBarStyle.replace(NavBar);

const NavItemStyle = new CSSStyleSheet();
NavItemStyle.replace(NavItem);

export default { NavBarStyle, NavItemStyle };