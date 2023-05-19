import { createServer } from 'miragejs';
import { IPost } from '../components/posts/models/IPost.interface';
import { sortByDate } from '../shared/utils';

import data from './data.json';

createServer({
  routes() {
    this.namespace = 'api';

    // filter based on queryParams - category
    this.get('/posts', (schema, request) => {
      let query = request.queryParams;
      let response = data.posts;
      if(query?.categories){
        response = data.posts.filter((post) => post.categories.some((cg)=> query.categories === cg.name)) as IPost[];
      }
      return sortByDate(response);
    });

    this.get('/posts/:id', (schema, request) => {
      let id = request.params.id
      return data.posts.find((post) => post.id === id) ?? {};
    });
  },
});

