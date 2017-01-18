import { createClient } from 'service-mocker/client';

const client = createClient('server.js');

client.ready.then(initApp);

function initApp() {
  const postContent = document.getElementById('post');
  const commentContent = document.getElementById('comment');

  async function getPost() {
    const postId = document.getElementById('postIdInput').value;
    const response = await fetch(`/posts/${postId}`);
    const result = await response.json();
    postContent.innerHTML = `<pre>${JSON.stringify(result, null, 2)}</pre>`;
  }

  async function getComment() {
    const commentId = document.getElementById('commentIdInput').value;
    const response = await fetch(`/posts/101/comments/${commentId}`);
    const result = await response.json();
    commentContent.innerHTML = `<pre>${JSON.stringify(result, null, 2)}</pre>`;
  }

  document.getElementById('getPostButton').addEventListener('click', getPost);
  document.getElementById('getCommentButton').addEventListener('click', getComment);
}
