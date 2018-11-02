import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import EditPanel from '../EditPanel';

configure({ adapter: new Adapter() });

describe('Item', () => {

  it('renders without crashing', () => {
    mount(<EditPanel />);
  });

  it('renders correctly', () => {
    const itemSuggestions = [
      {id: 1, name: 'ITEM 1', cost: 1},
      {id: 2, name: 'ITEM 2', cost: 2}
    ]
    const tree = renderer
      .create(<EditPanel itemSuggestions={itemSuggestions} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('addItem', () => {

    let addItem, element;

    beforeEach(() => {
      addItem = jest.fn();
      element = shallow(<EditPanel addItem={addItem} />);
      element.setState({ itemInput: 'Apple', costInput: '10' });
    });
    
    it('calls parent prop addItem', () =>{
      element.instance().addItem('EVENT');
      expect(addItem).toHaveBeenCalledTimes(1);
      expect(addItem.mock.calls[0][0]).toBe('EVENT');
      expect(addItem.mock.calls[0][1]).toEqual({ label: 'Apple', cost: '10' });
    })

    it('calls clears input state', () =>{
      element.instance().addItem('EVENT');
      expect(element.state('itemInput')).toBe('');
      expect(element.state('costInput')).toBe('');
    })

    it('does nothing if itemError exists', () =>{
      element.setState({ itemError: 'ERROR' });
      element.instance().addItem('EVENT');
      expect(addItem).toHaveBeenCalledTimes(0);
    })

    it('does nothing if costError exists', () =>{
      element.setState({ costError: 'ERROR' });
      element.instance().addItem('EVENT');
      expect(addItem).toHaveBeenCalledTimes(0);
    })
  });

  describe('onPriceChange', () => {
    it('sets the price state to whats in the input', () =>{
      const keyEvent = {
        target: {
          value: 'abc'
        }
      }
      const element = shallow(<EditPanel />);
      expect(element.state('costInput')).toBe('');
      element.instance().onPriceChange(keyEvent);
      expect(element.state('costInput')).toBe('abc');
    })

    it('works as a controlled input', () =>{
      const element = mount(<EditPanel />);
      const changeEvent = {target: {name: "costInput", value: "abc"}};
      expect(element.state('costInput')).toBe('');
      element.find('input#costInput').simulate('change', changeEvent);
      expect(element.state('costInput')).toBe('abc');
    });
  });

  describe('onItemChange', () => {
    it('sets the item state to whats in the input', () =>{
      const keyEvent = {
        target: {
          value: 'abc'
        }
      }
      const element = shallow(<EditPanel />);
      expect(element.state('itemInput')).toBe('');
      element.instance().onItemChange(keyEvent);
      expect(element.state('itemInput')).toBe('abc');
    })

    it('works as a controlled input', () =>{
      const element = mount(<EditPanel />);
      const changeEvent = {target: {name: "itemInput", value: "abc"}};
      expect(element.state('itemInput')).toBe('');
      element.find('input#itemInput').simulate('change', changeEvent);
      expect(element.state('itemInput')).toBe('abc');
    });
  });

  describe('getSuggestions', () => {
    let getSuggestions, element;

    beforeEach(() => {
      getSuggestions = jest.fn();
      element = shallow(<EditPanel getSuggestions={getSuggestions} />);
    });

    it('calls getSuggestions when a character is typed', () =>{
      const keyEvent = {
        key: 'a'
      }
      element.instance().getSuggestions(keyEvent);
      expect(getSuggestions).toHaveBeenCalledTimes(1);
    });
    

    it('should not be called when its not a character code', () =>{
      const keyEvent = {
        key: 'Shift'
      }
      element.instance().getSuggestions(keyEvent);
      expect(getSuggestions).toHaveBeenCalledTimes(0);
    });

    it('should be called when backspace is typed', () =>{
      const keyEvent = {
        key: 'Backspace'
      }
      element.instance().getSuggestions(keyEvent);
      expect(getSuggestions).toHaveBeenCalledTimes(0);
    });
  });

  describe('onItemBlur', () => {

    it('should be triggered on blur', () =>{
      const element = mount(<EditPanel />);
      element.find('input#itemInput').simulate('blur');
      expect(element.state('itemError')).toBe('Invalid item!');
    });

    it('should generate an error if the item name is not valid', () =>{
      const element = shallow(<EditPanel />);
      element.instance().onItemBlur();
      expect(element.state('itemError')).toBe('Invalid item!');
    });

    it('should NOT generate an error if the item name is  valid', () =>{
      const element = shallow(<EditPanel />);
      element.setState({itemInput : 'abc'});
      element.instance().onItemBlur();
      expect(element.state('itemError')).toBe('');
    });
  });

  describe('onPriceBlur', () => {
    it('should be triggered on blur', () =>{
      const element = mount(<EditPanel />);
      element.find('input#costInput').simulate('blur');
      expect(element.state('costError')).toBe('Invalid price!');
    });

    it('should generate an error if the price is not valid', () =>{
      const element = shallow(<EditPanel />);
      element.instance().onPriceBlur();
      expect(element.state('costError')).toBe('Invalid price!');
    });

    it('should NOT generate an error if the price is valid', () =>{
      const element = shallow(<EditPanel />);
      element.setState({costInput : '1'});
      element.instance().onPriceBlur();
      expect(element.state('costError')).toBe('');
    });
  });

  describe('isValidItem', () => {
    let element;

    beforeEach(() => {
      element = shallow(<EditPanel />);
    });

    it('should return true for any string', () => {
      expect(element.instance().isValidItem('abc')).toBe(true);
    });

    it('should return false for blank string', () => {
      expect(element.instance().isValidItem('')).toBe(false);
    });

    it('should return false for not strings', () => {
      expect(element.instance().isValidItem([])).toBe(false);
    });
  });

  describe('isValidPrice', () => {
    let element;

    beforeEach(() => {
      element = shallow(<EditPanel />);
    });

    it('should return true for any number', () => {
      expect(element.instance().isValidPrice('123')).toBe(true);
    });

    it('should return false for blank value', () => {
      expect(element.instance().isValidPrice('')).toBe(false);
    });

    it('should return false for not numbers', () => {
      expect(element.instance().isValidPrice('asd')).toBe(false);
    });    
  });

  describe('selectItem', () => {
    let element, itemSelected, selectedItem;

    beforeEach(() => {
      itemSelected = jest.fn();
      element = shallow(<EditPanel itemSelected={itemSelected} />);
      selectedItem = element.instance().selectItem({id: 1, name: 'Test', cost: '123'});
    });
    it('should set the state of selected item', () => {
      expect(element.state('itemInput')).toBe('');
      expect(element.state('costInput')).toBe('');
      selectedItem('CLICK EVENT');
      expect(element.state('itemInput')).toBe('Test');
      expect(element.state('costInput')).toBe('123');
    });

    it('should call the callback from props', () => {
      selectedItem('CLICK EVENT');
      expect(itemSelected).toHaveBeenCalledTimes(1);
      expect(itemSelected.mock.calls[0][0]).toBe('CLICK EVENT');
      expect(itemSelected.mock.calls[0][1]).toEqual({id: 1, name: 'Test', cost: '123'});
    });

    it('should be triggered on click', () => {
      element = mount(<EditPanel itemSelected={itemSelected} itemSuggestions={[{id: 1, name: 'Test', cost: '123'}, {id: 2, name: 'Test2', cost: '234'}]} />);
      const suggestions = element.find('.inputSuggestions li');
      expect(suggestions.length).toBe(2);
      suggestions.at(1).simulate('click');
      expect(itemSelected).toHaveBeenCalledTimes(1);
      expect(itemSelected.mock.calls[0][1]).toEqual({id: 2, name: 'Test2', cost: '234'});
    });

  });

});
