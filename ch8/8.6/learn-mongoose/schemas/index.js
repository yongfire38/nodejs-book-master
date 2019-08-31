const mongoose = require('mongoose');

module.exports = () => {
  const connect = () => {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true);
    }
    mongoose.connect('mongodb+srv://yongfire38:phj1143915!@cluster0-gylqx.mongodb.net/test?retryWrites=true&w=majority', 
    {useNewUrlParser: true})
    .then(() =>{
      console.log('mongoDB 연결이 정상적으로 처리되었습니다.');
    })
    .catch((err) => {
      console.log('mongoDB 연결 실패.'+ err);
    });
  };
  connect();
  mongoose.connection.on('error', (error) => {
    console.error('몽고디비 연결 에러', error);
  });
  mongoose.connection.on('disconnected', () => {
    console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
    connect();
  });

  require('./user');
  require('./comment');
};
