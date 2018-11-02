import React from 'react'
import ReactDOM from 'react-dom'

import App from '../components/App';

import style from '../styles/app.scss';

class XApp extends HTMLElement {
	constructor() {
	  super();
	  this.attachShadow({ mode: 'open' });
	}
	connectedCallback() {
		const styleTag = document.createElement('style');
		styleTag.innerHTML = style;
		this.shadowRoot.appendChild(styleTag);

		ReactDOM.render(<App />, this.shadowRoot);
	}
	
}
	
export default XApp;