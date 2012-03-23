load 'application'

before 'load post', ->
    Post.find params.id, (err, post) =>
        if err
            redirect path_to.posts
        else
            @post = post
            next()
, only: ['show', 'edit', 'update', 'destroy']

action 'new', ->
    @post = new Post
    @title = 'New post'
    render()

action 'create', ->
    Post.create body.Post, (err, post) =>
        if err
            flash 'error', 'Post can not be created'
            @post = post
            @title = 'New post'
            render 'new'
        else
            flash 'info', 'Post created'
            redirect path_to.posts

action 'index', ->
    Post.all (err, posts) =>
        @posts = posts
        @title = 'Posts index'
        render()

action 'show', ->
    @title = 'Post show'
    render()

action 'edit', ->
    @title = 'Post edit'
    render()

action 'update', ->
    @post.updateAttributes body.Post, (err) =>
        if !err
            flash 'info', 'Post updated'
            redirect path_to.post(@post)
        else
            flash 'error', 'Post can not be updated'
            @title = 'Edit post details'
            render 'edit'

action 'destroy', ->
    @post.destroy (error) ->
        if error
            flash 'error', 'Can not destroy post'
        else
            flash 'info', 'Post successfully removed'
        send "'" + path_to.posts + "'"

