Package.describe({
  name: 'discussions2',
  summary: 'Reddit like discussions and voting'
});

Package.on_use(function (api) {
  
  api.use('templating', 'client');
  api.use('ui', 'client');
  api.use('deps', 'client');
  api.use('less', 'client');
  api.use('collection2', ['client', 'server']);
  api.use('minimongo', ['client', 'server']);
  
  api.add_files('lib/selectize.less', 'client');
  api.add_files('client.js', 'client');
  
  api.add_files('discussion2.js', ['client', 'server']);
  api.add_files('methods.js', ['client', 'server']);
  api.add_files('collections/collections.js', ['client', 'server']);
  api.add_files('collections/server.js', 'server');
  
  api.add_files('views/post/post.html', 'client');
  api.add_files('views/post/post.js', 'client');
  api.add_files('views/post/post.less', 'client');
  api.add_files('views/posts/posts.html', 'client');
  api.add_files('views/posts/posts.js', 'client');
  api.add_files('views/posts/posts.less', 'client');
  api.add_files('views/post/post_new.html', 'client');
  api.add_files('views/post/post_new.js', 'client');
  api.add_files('views/post/post_new.less', 'client');
  api.add_files('views/shared.html', 'client');
  api.add_files('views/shared.js', 'client');


  api.export('Tags');
  api.export('Posts');
  api.export('extendTags');
  
});
