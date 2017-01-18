import { createClient } from 'service-mocker/client';
import { Logger } from 'utils';

const client = createClient('server.js');

client.ready.then(initApp);

function initApp() {
  const postLogger = new Logger();
  const commentLogger = new Logger();

  postLogger.appendTo(document.getElementById('post'));
  commentLogger.appendTo(document.getElementById('comment'));

  async function getPost() {
    postLogger.clear();
    const postId = document.getElementById('postIdInput').value;
    const response = await fetch(`/posts/${postId}`);
    postLogger.log(await response.json());
  }

  async function getComment() {
    commentLogger.clear();
    const commentId = document.getElementById('commentIdInput').value;
    const response = await fetch(`/posts/101/comments/${commentId}`);
    commentLogger.log(await response.json());
  }

  document.getElementById('getPostButton').addEventListener('click', getPost);
  document.getElementById('getCommentButton').addEventListener('click', getComment);
}
