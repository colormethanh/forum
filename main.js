// your code here
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

var form = document.getElementById("form");
var postsContainer = document.getElementById("posts-container");

var createPostContentRowElement = function(message, author, id){
  var postContentRow = document.createElement("div")
  postContentRow.setAttribute("class", "row post-content");

  var postMessageColumn = document.createElement("div")
  postMessageColumn.setAttribute("class", "col-12 post-message");
  postMessageColumn.innerHTML = message;

  var postAuthorColumn = document.createElement("div")
  postAuthorColumn.setAttribute("class", "col-12 post-author");
  postAuthorColumn.innerHTML = `Posted By: <strong> ${author} </strong>`
  postContentRow.appendChild(postMessageColumn);
  postContentRow.appendChild(postAuthorColumn);

  return postContentRow;
}

var createPostOptionsRowElement = function (upVotes, downVotes) {
  var postOptionsRow = document.createElement("div")
  postOptionsRow.setAttribute("class", "row post-options justify-content-between");
  
  var likeBtnColumn = document.createElement("div")
  likeBtnColumn.setAttribute("class", "col-sm-8");
  
  var likeBtn = document.createElement("button");
  likeBtn.setAttribute("class", "btn btn-success like-btn me-2");
  var likeBtnIcon = document.createElement("i");
  likeBtnIcon.setAttribute("class", "bi bi-hand-thumbs-up");
  likeBtn.appendChild(likeBtnIcon);
  likeBtn.innerHTML += " " + upVotes;
  likeBtnColumn.appendChild(likeBtn);

  var dislikeBtn = document.createElement("button");
  dislikeBtn.setAttribute("class", "btn btn-danger dislike-btn");
  var dislikeBtnIcon = document.createElement("i");
  dislikeBtnIcon.setAttribute("class", "bi bi-hand-thumbs-down");
  dislikeBtn.appendChild(dislikeBtnIcon);
  dislikeBtn.innerHTML += " " + downVotes;
  likeBtnColumn.appendChild(dislikeBtn);
  

  var deleteBtnColumn = document.createElement("div")
  deleteBtnColumn.setAttribute("class", "col-sm-4");
  var deleteBtn = document.createElement("a");
  deleteBtn.innerHTML = "Delete Post"
  deleteBtn.setAttribute("class", "delete-btn");
  deleteBtnColumn.appendChild(deleteBtn);

  postOptionsRow.appendChild(likeBtnColumn);
  postOptionsRow.appendChild(deleteBtnColumn);

  return postOptionsRow;
}

var createPostElement = function(post){
  
  var postElement = document.createElement("div")
  postElement.setAttribute("class", "row post-element mb-1");

  var postElementInner = document.createElement("div")
  postElementInner.setAttribute("class", "col-12 post-element-inner");
  
  var postContentRow = createPostContentRowElement(post.message, post.author, post.id);
  var postOptionsRow = createPostOptionsRowElement(post.upVotes, post.downVotes);

  // Post divider
  var postDivider = document.createElement("hr");
  postDivider.setAttribute("class", "mt-2 mb-2");

  // putting it all together
  postElementInner.appendChild(postContentRow);
  postElementInner.appendChild(postOptionsRow);

  postElement.appendChild(postElementInner);
  postElement.appendChild(postDivider);

  return postElement
}


var addPostToLocalStorage = function (message, author) {
  var postsData = JSON.parse(localStorage.getItem("PARSITYFORUM"))
  debugger
  if (!postsData) {
    localStorage.setItem("PARSITYFORUM", JSON.stringify({"posts": []}))
    var postsData = JSON.parse(localStorage.getItem("PARSITYFORUM"))
  }

  var newPost = {"id":uuidv4(), "author": author, "message": message, "upVotes": 0, "downVotes": 0}

  postsData.posts.push(newPost);
  localStorage.setItem("PARSITYFORUM", JSON.stringify(postsData));
  return newPost
}

var clearPosts = function(){
  var postElements = document.getElementsByClassName("post-element");
  console.log(postElements)
}

var populatePosts = function(){
  var postsData = JSON.parse(localStorage.getItem("PARSITYFORUM"))
  if (!postsData) return;

  var postsArray = postsData.posts;

  var postElements = postsArray.map(post => {
    return createPostElement(post)
  })
  
  postElements.forEach(post => {
    postsContainer.appendChild(post);
  });

}



form.addEventListener("submit", (e) => {
  e.preventDefault();
  var user = document.getElementById("name");
  var message = document.getElementById("message");
  if (message.value == "" || user.value == ""){
    return alert("Make sure none of the post fields aren't empty")
  }
  
  let newPost = addPostToLocalStorage(message.value, user.value);
  let newPostElement = createPostElement(newPost);
  console.log(newPost)
  postsContainer.appendChild(newPostElement)
  user.value = ""
  message.value = ""
})




populatePosts();