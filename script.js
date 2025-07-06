let posts = [];

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("create-btn").addEventListener("click", createPost);
  document.getElementById("search-input").addEventListener("input", searchPosts);
});

function createPost() {
  const user = document.getElementById("username").value.trim() || "Anonymous";
  const text = document.getElementById("post-text").value.trim();
  if (!text) return alert("Please enter some post text.");
  posts.push({ username: user, text, time: new Date().toLocaleString(), likes: 0, replies: [] });
  document.getElementById("post-text").value = "";
  displayPosts(posts);
}

function displayPosts(arr) {
  const container = document.getElementById("display-posts");
  container.innerHTML = "";
  arr.forEach((p, i) => {
    const postDiv = document.createElement("div");
    postDiv.className = "post";
    postDiv.innerHTML = `
      <div class="post-header">
        <span><img class="avatar" src="https://lh3.googleusercontent.com/ogw/AF2bZyggRi9blaadGqOQ085c40jlsiyW4AK_PBZMxvh_BjBoDQ" alt="avatar"> @${p.username}</span>
        <span>${p.time}</span>
      </div>
      <div class="post-content">${p.text}</div>
      <div class="actions">
        <button onclick="likePost(${i})">Like (${p.likes})</button>
        <button onclick="replyPost(${i})">Reply</button>
        <button onclick="deletePost(${i})">Delete</button>
      </div>
    `;
    container.appendChild(postDiv);
  });
}

function likePost(i) {
  posts[i].likes++;
  displayPosts(posts);
}

function deletePost(i) {
  posts.splice(i, 1);
  displayPosts(posts);
}

function replyPost(i) {
  const text = prompt("Reply text?");
  if (!text) return alert("Reply cannot be empty.");
  const user = prompt("Username (optional)") || "Anonymous";
  posts[i].replies.push({ username: user, text, time: new Date().toLocaleString(), likes: 0 });
  displayPosts(posts);
}

function searchPosts() {
  const q = document.getElementById("search-input").value.toLowerCase();
  if (!q) return displayPosts(posts);
  const found = posts.filter(p => p.text.toLowerCase().includes(q));
  document.getElementById("display-posts").innerHTML = found.length
    ? ""
    : `<p>No posts found for "${q}".</p>`;
  if (found.length) displayPosts(found);
}
