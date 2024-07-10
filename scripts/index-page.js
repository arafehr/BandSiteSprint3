// const { default: axios } = require("axios");

// comment API:
const commentAPI =
  "https://project-1-api.herokuapp.com/comments?api_key=0f383f02-d3bd-4c8d-9bee-b53825c23122";

// Comments Section
const commentContainer = document.querySelector(
  "#comment-section__card-container"
);

// get comments from API
const getComments = () => {
  axios
    .get(commentAPI)
    .then((result) => {
      commentContainer.innerHTML = "";

      const commentContent = result.data.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );

      commentContent.forEach((element) => {
        displayComments(element);
      });
    })
    .catch((err) => console.log(err));
};

const displayComments = (obj) => {
  const cardEl = document.createElement("article");
  cardEl.classList.add("comment-card");

  const commentName = document.createElement("h3");
  commentName.classList.add("comment-card__name");
  commentName.innerText = obj.name;

  const commentAvatar = document.createElement("figure");
  commentAvatar.classList.add("comment-card__avatar");

  const commentDate = document.createElement("p");
  commentDate.classList.add("comment-card__date");
  commentDate.innerText = new Date(Number(obj.timestamp)).toLocaleDateString();

  const commentText = document.createElement("p");
  commentText.classList.add("comment-card__text");
  commentText.innerText = obj.comment;

  cardEl.appendChild(commentName);
  cardEl.appendChild(commentAvatar);
  cardEl.appendChild(commentDate);
  cardEl.appendChild(commentText);
  commentContainer.appendChild(cardEl);
};

const handleCommentSubmit = (event) => {
  event.preventDefault();

  const postComments = (obj) => {
    axios
      .post(commentAPI, {
        name: event.target.name.value,
        comment: event.target.comment.value,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const refreshCommentContainer = () => {
    setTimeout(getComments, 500);
  };

  refreshCommentContainer();
  postComments();
  formEl.reset();
};

const formEl = document.querySelector("#comment-form");
formEl.addEventListener("submit", handleCommentSubmit);

getComments();
