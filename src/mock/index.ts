import { createServer } from 'miragejs';

import data from './data.json';

createServer({
  routes() {
    this.namespace = 'api';

    this.get('/posts', (schema, request) => {
      let query = request.queryParams;
      if(query?.categories){
        let filtered = data.posts.filter((post) => post.categories.some((cg)=> query.categories == cg.name))
        return {
          posts: filtered ?? []
        }
      }
      return data;
    });

    this.get('/posts/:id', (schema, request) => {
      let id = request.params.id
      return data.posts.find((post) => post.id == id) ?? {};
    });
  },
});

