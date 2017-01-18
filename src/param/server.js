import { createServer } from 'service-mocker/server';

const server = createServer();
const router = server.router;

const posts = {
  101: {
    id: 101,
    title: 'Today I met a beautiful girl',
    comments: [101, 102],
  },
  102: {
    id: 102,
    title: 'I still miss her',
    comments: [103],
  },
};

const comments = {
  101: {
    id: 101,
    content: 'Really?',
  },
  102: {
    id: 102,
    content: 'hhh',
  },
  103: {
    id: 103,
    content: 'Just go to find her!',
  },
};

router.get('/posts/:postId', (req, res) => {
  const post = posts[req.params.postId];
  if (!post) {
    return res.status(404).json({
      error: { message: 'Post not found!' },
    });
  }

  return res.json(Object.assign({}, post, {
    comments: post.comments.map(id => comments[id]),
  }));
});

router.get('/posts/:postId/comments/:commentId', (req, res) => {
  const post = posts[req.params.postId];
  if (!post) {
    return res.status(404).json({
      error: { message: 'Post not found!' },
    });
  }

  const commentId = parseInt(req.params.commentId, 10);
  if (post.comments.indexOf(commentId) === -1) {
    return res.status(404).json({
      error: { message: 'Comment not found!' },
    });
  }

  return res.json(comments[commentId]);
});
