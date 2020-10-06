import Style from './style';

class NavItem extends HTMLElement {
  static get observedAttributes() {
    return ['id'];
  }

  constructor() {
    super();
    this.fragment = document.createDocumentFragment();
    this.element = document.createElement('div');
    this.element.classList.add('Nav-item');
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });

    this.fragment.appendChild(this.element);
    shadowRoot.appendChild(this.fragment);
    shadowRoot.adoptedStyleSheets = [Style.NavItemStyle];

    this.element.innerHTML = this.getTemplate();
    this.addListeners();
  }

  addListeners() {
    this.element.addEventListener('click', this.onClick);
  }

  onClick = () => {
    this.dispatchEvent(new CustomEvent('navItemClicked', {
      detail: this.id
    }));
  }

  getTemplate() {
    return `<slot/>`
  }
}

customElements.define('nav-item', NavItem);