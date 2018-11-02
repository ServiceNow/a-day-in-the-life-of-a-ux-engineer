import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Button from '../Button';

configure({ adapter: new Adapter() });

describe('Button', () => {

  it('renders without crashing', () => {
    mount(<Button />);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(<Button name="test" label="TEST" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when disabled', () => {
    const tree = renderer
      .create(<Button name="test" label="TEST" disabled="disabled" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('onClick', () => {

    it('calls prop onClick if passed in', () => {
      const clickHandler = jest.fn();
      const element = mount(<Button name="test" label="TEST" onClick={clickHandler}/>);
      element.find('button').simulate('click');
      expect(clickHandler).toHaveBeenCalledTimes(1);
    });

    it('doesnt blow up if onClick is not a function', () => {
      const element = mount(<Button name="test" label="TEST" onClick="asd"/>);
      element.find('button').simulate('click');
      expect(element.find('button').length).toBe(1);
    });
  });
});
