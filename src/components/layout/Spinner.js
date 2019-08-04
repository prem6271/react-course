import React, { Fragment } from 'react';
import spinner from './spinner.gif';

// return the spinner image

const Spinner = () =>
    <Fragment>
      <img src={spinner} alt="Loading..." style={{ width: '200px', margin: 'auto', display: 'block'}} />
    </Fragment>

export default Spinner;
