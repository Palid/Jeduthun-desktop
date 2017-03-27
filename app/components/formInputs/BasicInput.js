import React from 'react'
import classnames from 'classnames'

const BasicInputComponent = props => { return (
  <div className={classnames('basic-input', props.wrapperClass)}>
    {(props.label
      ? <label htmlFor={props.name}>{props.label}</label>
      : '' 
    )}
    {(props.type === 'text' &&
      <input
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
      />
    )}
    {(props.type === 'select' &&
      <select
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      >
        {
          props.options.map(function(option, i) {
            return (
              <option
                key={i}
                value={option.value}
                label={option.label}
              >{option.label}</option>
            ) 
          })
        }
      </select>
    )}
  </div>
)}

BasicInputComponent.propTypes = {
  label: React.PropTypes.string,
  wrapperClass: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
}

export default BasicInputComponent