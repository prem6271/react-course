import React from 'react';

const Alert = ({alert}) =>
    <div className={`alert alert-{alert.type}}`}>
      <i className='fas fa-info-circle' /> {alert.message}
    </div>

export default Alert;
