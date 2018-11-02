import React from 'react';

class Item extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			quantity: 1
		}	
	}
	
	increment = () => this.setState((prevState) => ({ quantity: prevState.quantity + 1 }))

	decrement = () => this.setState((prevState) => ({ quantity: prevState.quantity > 1 ? prevState.quantity - 1 : 0 }))
	
	render() {
		return (
			<div className="item">

				<span className="itemLabel">{this.props.label}</span>
				<span className="itemQuantity">{this.state.quantity} x</span>
				<span className="itemCost">{`$${Number.parseFloat(this.props.cost).toFixed(2)}`}</span>
				<span className="totalCost">{`$${Number.parseFloat(this.state.quantity * this.props.cost).toFixed(2)}`}</span>
				<span className="itemControls">
					<x-button onClick={this.increment} name='increment' label='+' />
					<x-button onClick={this.decrement} name='decrement' label='-' />
				</span>
			</div>
		);
	}
}

export default Item;