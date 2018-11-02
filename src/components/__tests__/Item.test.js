import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Item from '../Item';

configure({ adapter: new Adapter() });

describe('Item', () => {
  it('renders without crashing', () => {
    mount(<Item />);
  });
  it('renders correctly', () => {
	const tree = renderer
	  .create(<Item label="Apple" cost="0.50" />)
	  .toJSON();
	expect(tree).toMatchSnapshot();
  });

  describe('increment', () => {
    it('should increment state when called', () => {
      let element = shallow(<Item />);
      expect(element.state('quantity')).toBe(1);
      element.instance().increment();
      expect(element.state('quantity')).toBe(2);
      element.instance().increment();
      expect(element.state('quantity')).toBe(3);
    });

    it('gets triggered correctly by the button click', () => {
      let element = mount(<Item />);
      let incrementButton = element.find('x-button[name="increment"]');
      expect(element.state('quantity')).toBe(1);
      expect(incrementButton.length).toBe(1);
      incrementButton.simulate('click');
      expect(element.state('quantity')).toBe(2);
    })
  });

  describe('decrement', () => {
    it('should decrement state when called', () => {
      let element = shallow(<Item />);
      expect(element.state('quantity')).toBe(1);
      element.instance().decrement();
      expect(element.state('quantity')).toBe(0);
      element.instance().decrement();
      expect(element.state('quantity')).toBe(0);
      element.setState({quantity: -1});
      element.instance().decrement();
      expect(element.state('quantity')).toBe(0);
    });

    it('gets triggered correctly by the button click', () => {
      let element = mount(<Item />);
      let decrementButton = element.find('x-button[name="decrement"]');
      expect(element.state('quantity')).toBe(1);
      expect(decrementButton.length).toBe(1);
      decrementButton.simulate('click');
      expect(element.state('quantity')).toBe(0);
    })
  });


  describe('render', () => {
    it('should render correctly', () => {
      let element = mount(<Item cost="1" label="Delicious Item"/>);
      let itemLabel = element.find('.itemLabel');
      expect(itemLabel.length).toBe(1);
      expect(itemLabel.getDOMNode().innerHTML).toBe("Delicious Item");

      let itemQuantity = element.find('.itemQuantity');
      expect(itemQuantity.length).toBe(1);
      expect(itemQuantity.getDOMNode().innerHTML).toBe("1 x");

      let itemCost = element.find('.itemCost');
      expect(itemCost.length).toBe(1);
      expect(itemCost.getDOMNode().innerHTML).toBe("$1.00");

      let totalCost = element.find('.totalCost');
      expect(totalCost.length).toBe(1);
      expect(totalCost.getDOMNode().innerHTML).toBe("$1.00");
    
    });

    it('should render correctly after increment', () => {
      let element = mount(<Item cost="1" label="Delicious Item"/>);

      let itemQuantity = element.find('.itemQuantity');
      expect(itemQuantity.length).toBe(1);
      expect(itemQuantity.getDOMNode().innerHTML).toBe("1 x");

      let itemCost = element.find('.itemCost');
      expect(itemCost.length).toBe(1);
      expect(itemCost.getDOMNode().innerHTML).toBe("$1.00");

      let totalCost = element.find('.totalCost');
      expect(totalCost.length).toBe(1);
      expect(totalCost.getDOMNode().innerHTML).toBe("$1.00");

      let incrementButton = element.find('x-button[name="increment"]');
      expect(incrementButton.length).toBe(1);
      incrementButton.simulate('click');

      expect(itemQuantity.getDOMNode().innerHTML).toBe("2 x");
      expect(itemCost.getDOMNode().innerHTML).toBe("$1.00");
      expect(totalCost.getDOMNode().innerHTML).toBe("$2.00");
    
    });

    it('should render correctly after decrement', () => {
      let element = mount(<Item cost="1" label="Delicious Item"/>);

      let itemQuantity = element.find('.itemQuantity');
      expect(itemQuantity.length).toBe(1);
      expect(itemQuantity.getDOMNode().innerHTML).toBe("1 x");

      let itemCost = element.find('.itemCost');
      expect(itemCost.length).toBe(1);
      expect(itemCost.getDOMNode().innerHTML).toBe("$1.00");

      let totalCost = element.find('.totalCost');
      expect(totalCost.length).toBe(1);
      expect(totalCost.getDOMNode().innerHTML).toBe("$1.00");

      let decrementButton = element.find('x-button[name="decrement"]');
      expect(decrementButton.length).toBe(1);
      decrementButton.simulate('click');

      expect(itemQuantity.getDOMNode().innerHTML).toBe("0 x");
      expect(itemCost.getDOMNode().innerHTML).toBe("$1.00");
      expect(totalCost.getDOMNode().innerHTML).toBe("$0.00");
    
    });

  });
  
});
