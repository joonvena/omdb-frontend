/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';

const infinityScoller = () => {
  const [bottom, setBottom] = React.useState(false);

  React.useEffect(() => {
    function handleScroll() {
      const isBottom =
        window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
      console.log(isBottom);
      setBottom(isBottom);
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return bottom;
};

export default infinityScoller;
