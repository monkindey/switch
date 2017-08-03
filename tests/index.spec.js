/* eslint-disable no-undef */
import Switch from '../index';
import React from 'react';
import { mount } from 'enzyme';

describe('rc-switch', () => {
  let switcher;
  beforeEach(() => {
    switcher = mount(<Switch />);
  });

  it('works', () => {
    expect(switcher.state().checked).toBe(false);
    switcher.simulate('click');
    expect(switcher.state().checked).toBe(true);
  });

  it('should be checked upon right key and unchecked on left key', () => {
    expect(switcher.state().checked).toBe(false);
    switcher.simulate('keydown', { keyCode: 39 });
    expect(switcher.state().checked).toBe(true);
    switcher.simulate('keydown', { keyCode: 37 });
    expect(switcher.state().checked).toBe(false);
  });

  it('should toggle upon space and enter key', () => {
    expect(switcher.state().checked).toBe(false);
    switcher.simulate('keydown', { keyCode: 32 });
    expect(switcher.state().checked).toBe(true);
    switcher.simulate('keydown', { keyCode: 13 });
    expect(switcher.state().checked).toBe(false);
  });

  it('should change from an initial checked state of true to false on click', () => {
    const wrapper = mount(<Switch defaultChecked />);
    expect(wrapper.state().checked).toBe(true);
    wrapper.simulate('click');
    expect(wrapper.state().checked).toBe(false);
  });

  it('should support onClick', () => {
    const onClick = jest.fn();
    const wrapper = mount(<Switch onClick={onClick} />);
    wrapper.simulate('click');
    expect(onClick).toBeCalledWith(true);
    expect(onClick.mock.calls.length).toBe(1);
    wrapper.simulate('click');
    expect(onClick).toBeCalledWith(false);
    expect(onClick.mock.calls.length).toBe(2);
  });

  it('should not toggle when clicked in a disabled state', () => {
    const onChange = jest.fn();
    const wrapper = mount(<Switch disabled checked onChange={onChange} />);
    expect(wrapper.state().checked).toBe(true);
    wrapper.simulate('click');
    expect(wrapper.state().checked).toBe(true);
    expect(onChange.mock.calls.length).toBe(0);
  });

  it('should have equal children when pass children by own api or React\'s children', () => {
    const components = [
      <Switch prefixCls="test" checkedChildren="开" unCheckedChildren="关" />,
      <Switch prefixCls="test">
        {checked => (checked ? '开' : '关')}
      </Switch>
    ];

    components.forEach(component => {
      const onChange = jest.fn();
      const wrapper = mount(component);
      const innerWrapper = wrapper.find('.test-inner');
      expect(innerWrapper.html().trim()).toEqual(
        `<span class=\"test-inner\">关</span>`
      );
      wrapper.simulate('click');
      expect(innerWrapper.html().trim()).toEqual(
        `<span class=\"test-inner\">开</span>`
      );
    });
  });
});
