import React from 'react'

const FormGroup = ({divProps, labelProps, label, children, columns, ...props}) => {
  let props2 = props || {}
  let labelProps2 = labelProps || {}
  let divProps2 = divProps || {}

  props2.className = (props2.className || '') + ' form-group'

  if (columns) {
    props2.className = (props2.className || '') + ' row'
    labelProps2.className = (labelProps2.className || '') + ' col-form-label col-sm-' + columns[0]
    divProps2.className = (divProps2.className || '') + ' col-sm-' + columns[1]
  }

  return <div {...props2}>
    <label {...labelProps2}>{label}</label>
    <div {...divProps2}>
      {children}
    </div>
  </div>
}

export default FormGroup
