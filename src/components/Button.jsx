import React from 'react';
import cx from 'classnames';

const Button = (props) => {

	const onClick = (e) => {
		if (typeof props.onClick === 'function')
			props.onClick(e, props.idx)
	}

	let buttonClassname = cx('button', {
		'disabled': props.disabled
	});

	return (
		<button className={buttonClassname} onClick={onClick} name={props.name} disabled={props.disabled}>{props.label}</button>
	);

}

export default Button;