const cfg = {
  prod: (process.env.PROD === 'true'),
  port: parseInt(`${process.env.PORT}`, 10) || 3000,

}

export default cfg;
