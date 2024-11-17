import React from 'react';
import { Spin } from 'antd';

function Loader() {
  return (
     <div className='spinner-parent'>
        <Spin size='large' />  
     </div>
  );
}

export default Loader;
