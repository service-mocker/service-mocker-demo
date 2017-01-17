import { createClient } from 'service-mocker/client';

const client = createClient('server.js');

client.ready.then(initApp);

function initApp() {
  const postContent = document.getElementById('post');
  const commentContent = document.getElementById('comment');

  function getPost() {
    const postId = document.getElementById('postIdInput').value;
    fetch(`/posts/${postId}`)
    .then(response => response.json())
    .then(res => {
      if (res.error) {
        postContent.innerHTML = res.error.message;
      } else {
        postContent.innerHTML = `<pre>${JSON.stringify(res, null, 2)}</pre>`;
      }
    });
  }

  function getComment() {
    const commentId = document.getElementById('commentIdInput').value;
    fetch(`/posts/101/comments/${commentId}`)
    .then(response => response.json())
    .then(res => {
      if (res.error) {
        commentContent.innerHTML = res.error.message;
      } else {
        commentContent.innerHTML = `<pre>${JSON.stringify(res, null, 2)}</pre>`;
      }
    });
  }

  document.getElementById('getPostButton').onclick = getPost;
  document.getElementById('getCommentButton').onclick = getComment;
}
