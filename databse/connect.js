var mongoose = require('mongoose');

const mlabURI = 'mongodb://127.0.0.1:27017/myapp'

// const dbName = 'user-api';

const con = mongoose.connect(mlabURI);

module.exports = con;


/*
  struct
    root: index file, ....
    view: UI: 1 vai file: 
    model: chua model cua ung dung
    controller: [router/...] api - 1 it logic
        ==> MVC ==> doc cai nay tren google
    request => server : check auth/author/ validate data ==> middleware
    //  getUser/ getProfile, getListCrush ==> service
      model: user ==> userService: lam may cai lien quan den user/ crud
    // sendmail, push notification, verify sms(OTP) connect third party ==> commonService
    // ** helper: 
    // ** 1 db: migr, sheet data: databaseConnect


*/