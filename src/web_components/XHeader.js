import style from '../styles/header.scss';

class XHeader extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({
			mode: 'open'
		});
	}
	connectedCallback() {
		const header = document.createElement('header');
		header.className = 'appLogo';
		header.innerHTML = '<slot>Default</slot>';
		this.shadowRoot.appendChild(header);
		const styleTag = document.createElement("style");
		styleTag.innerHTML = style;
		this.shadowRoot.appendChild(styleTag);
	}
}

export default XHeader;