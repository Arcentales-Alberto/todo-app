import { App } from './App';
import { Database } from './db';
import { SERVER_PORT } from './config';

class Index {

  static init() {
    Database.connect();
    App.create().listen(SERVER_PORT);
  }
}

Index.init();

