import Style from './style';

class NavBar extends HTMLElement {
  static get observedAttributes() {
    return ['img'];
  }

  constructor() {
    super();
    this.fragment = document.createDocumentFragment();
    this.element = document.createElement('div');
    this.element.classList.add('NavBar');
  }

  connectedCallback() {
    let shadowRoot = this.attachShadow({
      mode: 'open'
    });

    this.fragment.appendChild(this.element);
    shadowRoot.appendChild(this.fragment);
    shadowRoot.adoptedStyleSheets = [Style.NavBarStyle];

    this.element.innerHTML = this.getTemplate();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
  }

  getTemplate() {
    return `
      <div class="NavBar-wrapper">
        <img class="NavBar-Logo" src='${this.img}'/>
        WanderLust
      </div>
      <div class="NavBar-Items"><slot/></div>
    `;
  }
};

customElements.define('nav-bar', NavBar);