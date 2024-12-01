import React from 'react';

const Logo = ({ data }) => {
  return (
    <div>
      {data?.logo ? (
        <img
          src={`${data.logo}`}
          alt="Logo"
          style={{ width: '100%', height: 'auto' }}
        />
      ) : <></>}
    </div>
  );
};

export default Logo;
