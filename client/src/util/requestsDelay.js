const getTimer = (func, mili) => {
  let send = true;

  return (val) => {
    if (send) {
      func(val);
      send = false;

      setTimeout(() => {
        send = true;
      }, mili);
    }
  };
};

export default getTimer;
