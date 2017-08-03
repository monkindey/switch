import '../assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import Switch from 'rc-switch';

function onChange(value) {
  console.log(`switch checked: ${value}`); // eslint-disable-line
}

class Demo extends React.Component {
  state = {
    disabled: false,
    switchTo: 1
  };

  toggle = () => {
    this.setState({
      disabled: !this.state.disabled
    });
  };

  onChange = checked => {
    this.setState({
      switchTo: checked ? 1 : 2
    });
  };

  render() {
    return (
      <div style={{ margin: 20 }}>
        <Switch onChange={this.onChange} defaultChecked={true}>
          {checked => (checked ? '1' : '2')}
        </Switch>

        <div style={{ margin: 20 }}>
          {this.state.switchTo === 1
            ? <div>
                <h4>Use Children</h4>
                <Switch onChange={onChange} disabled={this.state.disabled}>
                  {checked => (checked ? '开' : '关')}
                </Switch>
              </div>
            : <div>
                <h4>Use API</h4>
                <Switch
                  onChange={onChange}
                  disabled={this.state.disabled}
                  checkedChildren={'开'}
                  unCheckedChildren={'关'}
                />
              </div>}
          <div style={{ marginTop: 20 }}>
            <button onClick={this.toggle}>toggle disabled</button>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
