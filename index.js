
const postsContainer = document.getElementById("posts");


window.addEventListener("DOMContentLoaded", loadPosts);

async function loadPosts() {
  try {

    const res = await fetch("https://jsonplaceholder.typicode.com/posts");

    
    const posts = await res.json();

    
    postsContainer.innerHTML = posts
    .reverse()
    .slice(0,9)
    .map(post => `
      <div style="border: 2px solid white; margin: 10px; padding: 10px; border-radius: 12px;">
        <h3>${post.title}</h3>
        <p>${post.body}</p>
      </div>
    `).join(""); 
  } catch (error) {
    postsContainer.innerHTML = `<p style="color: red;">Error loading posts: ${error.message}</p>`;
  }
}


const postForm = document.getElementById("postForm");

postForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        body: body,
        userId: 1
      })
    });

    const data = await res.json();
    alert("Post added with ID: " + data.id);

    prependPostToPage(savedPost);

    function prependPostToPage(post) {
      const postDiv = document.createElement("div");
      postDiv.style.border = "2px solid white";
      postDiv.style.margin = "10px";
      postDiv.style.padding = "10px";
      postDiv.style.borderRadius = "12px";
      postDiv.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
    
      // Add at the top of the container
      postsContainer.prepend(postDiv);
    }
    

    // Optional: reload posts
    loadPosts();

    postForm.reset();
  } catch (err) {
    alert("Failed to post: " + err.message);
  }
});

