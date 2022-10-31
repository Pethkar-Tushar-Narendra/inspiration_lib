import React from 'react';

function HomeScreen() {
  var date = new Date();
  var CurrentDate = date.getMonth();

  return (
    <h1>
      HomeScreen HomeScreen{'  '}
      {CurrentDate}
    </h1>
  );
}

export default HomeScreen;
