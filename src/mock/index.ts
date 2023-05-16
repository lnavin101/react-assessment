import { createServer } from 'miragejs';

import data from './data.json';

createServer({
  routes() {
    this.namespace = 'api';

    this.get('/posts', () => {
      return data;
    });

    this.get('/posts/:id', (schema, request) => {
      let id = request.params.id
      return data.posts.find((post) => post.id == id) ?? {};
    });
  },
});

