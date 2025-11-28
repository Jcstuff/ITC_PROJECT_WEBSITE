const demoCards = [
  {
    title: 'Crispy Adobo with Garlic Rice',
    meta: '25 mins • Easy',
    img: 'adobo.jpg',
    tags: ['Filipino','Adobo','Quick'],
    ingredients: ['ADOBO WITH RICE']
  },
  {
    title: 'Vegan Pancit Canton',
    meta: '30 mins • Medium',
    img: 'pancitcanton.jpg',
    tags: ['Vegan','Noodles'],
    ingredients: ['ADOBO WITH RICE']
  },
  {
    title: 'Mango Float Parfait',
    meta: '10 mins • Easy',
    img: 'mangofloat.jpg',
    tags: ['Dessert','Mango'],
    ingredients: ['ADOBO WITH RICE']
  },
  {
    title: 'Street-style Fish Tacos',
    meta: '20 mins • Easy',
    img: 'fishtacos.jpg',
    tags: ['Streetfood','Tacos'],
    ingredients: ['ADOBO WITH RICE']
  }
];

const cardContainer = document.getElementById('cardContainer');

function loadCommentsForCard(title, container) {
    const comments = JSON.parse(localStorage.getItem(`comments_${title}`)) || [];
    container.innerHTML = '<h4>Comments</h4>';
    if (comments.length === 0) {
        container.innerHTML += '<p>No comments yet.</p>';
        return;
    }
    comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';
        commentDiv.innerHTML = `
            <p><strong>${comment.username}:</strong> ${comment.text}</p>
            <span class="comment-timestamp">${new Date(comment.timestamp).toLocaleString()}</span>
        `;
        container.appendChild(commentDiv);
    });
}

function saveCommentForCard(title, text) {
    const username = localStorage.getItem('PFPUSERNAME') || 'Anonymous';
    const comments = JSON.parse(localStorage.getItem(`comments_${title}`)) || [];
    const newComment = {
        username: username,
        text: text,
        timestamp: new Date().toISOString()
    };
    comments.push(newComment);
    localStorage.setItem(`comments_${title}`, JSON.stringify(comments));
}

function createCard(data){
  const el = document.createElement('article');
  el.className='card';
  el.innerHTML = `
  <div class="media" style="background-image:url('${data.img}')" role="img" aria-label="${data.title}"></div>
    <div class="content">
  <div class="card-inner">
    <div class="meta"><div class="muted">${data.meta}</div><div class="muted">by <strong>Chef J</strong></div></div>
    <h3 class="title">${data.title}</h3>
    <div class="tags">${data.tags.map(t=>`<div class="tag">${t}</div>`).join('')}</div>
    <div class="actions">
      <button class="btn like" aria-pressed="false" title="Like this recipe">❤️ <span class="muted">3</span></button>
      <button class="btn comment-btn" title="Comment">💬 <span class="muted">4</span></button>
      <button class="btn save" title="Save">🔖</button>
    </div>
  </div>
</div>
  `;

  // Add comments section to the card
  const commentsContainer = document.createElement('div');
  commentsContainer.className = 'card-comments';
  loadCommentsForCard(data.title, commentsContainer);
  el.appendChild(commentsContainer);

  // Add comment input section
  const commentInput = document.createElement('div');
  commentInput.className = 'comment-input';
  commentInput.innerHTML = `
    <input type="text" placeholder="Say something..." class="usercomment" />
    <button type="button" class="publish-comment">Publish</button>
  `;
  el.appendChild(commentInput);

  // Interactions
  const likeBtn = el.querySelector('.like');
  likeBtn.addEventListener('click',()=>{
    const span = likeBtn.querySelector('span');
    let count = parseInt(span.textContent);
    const pressed = likeBtn.getAttribute('aria-pressed') === 'true';
    likeBtn.setAttribute('aria-pressed', String(!pressed));
    likeBtn.classList.toggle('liked');
    span.textContent = pressed ? (count-1) : (count+1);
    const heart = likeBtn;
    heart.classList.add('bounce');
    setTimeout(()=>heart.classList.remove('bounce'),200);
  });

  // Comment button toggle
  const commentBtn = el.querySelector('.comment-btn');
  commentBtn.addEventListener('click', () => {
    commentInput.style.display = commentInput.style.display === 'flex' ? 'none' : 'flex';
    if (commentInput.style.display === 'flex') {
      loadCommentsForCard(data.title, commentsContainer);
    }
  });

  // Publish comment
  const publishBtn = commentInput.querySelector('.publish-comment');
  const input = commentInput.querySelector('.usercomment');
  input.addEventListener('input', () => {
    publishBtn.disabled = input.value.trim() === '';
    publishBtn.classList.toggle('able', input.value.trim() !== '');
  });
  publishBtn.addEventListener('click', () => {
    const commentText = input.value.trim();
    if (commentText) {
      saveCommentForCard(data.title, commentText);
      input.value = '';
      publishBtn.disabled = true;
      publishBtn.classList.remove('able');
      loadCommentsForCard(data.title, commentsContainer);
    }
  });

  el.addEventListener("click", (e) => {
    // prevent button clicks from opening modal
    if (e.target.closest(".btn") || e.target.closest(".comment-input")) return;
    openViewer(data);
  });

  return el;
}

// populate feed
demoCards.forEach(c=>cardContainer.appendChild(createCard(c)));

// Modal interactions
const backdrop = document.getElementById('modalBackdrop');
const openModal = document.getElementById('openModal');
const cancelBtn = document.getElementById('cancelBtn');
const postForm = document.getElementById('postForm');
const imageInput = document.getElementById('postImage');
const imagePreview = document.getElementById('imagePreview');
const quickCreate = document.getElementById('quickCreate');

function open(){
  backdrop.style.display='flex';
  // trap focus: move focus to first input
  document.getElementById('postTitle').focus();
  document.body.style.overflow='hidden';
}
function close(){
  backdrop.style.display='none';
  document.body.style.overflow='auto';
  // clear form
  postForm.reset();
  imagePreview.style.backgroundImage='';
  imagePreview.textContent='No image';
}

openModal.addEventListener('click',open);
quickCreate.addEventListener('click',open);
cancelBtn.addEventListener('click',close);
backdrop.addEventListener('click',(e)=>{if(e.target===backdrop) close();});

const imageUrlInput = document.getElementById('postImage');
const imageFileInput = document.getElementById('postImageFile');

// Preview when typing URL
imageUrlInput.addEventListener('input', () => {
  const url = imageUrlInput.value.trim();
  if (!url) {
    imagePreview.style.backgroundImage = '';
    imagePreview.textContent = 'No image';
    return;
  }
  imagePreview.style.backgroundImage = `url('${url}')`;
  imagePreview.textContent = '';
});

// Preview when selecting file
imageFileInput.addEventListener('change', () => {
  const file = imageFileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    imagePreview.style.backgroundImage = `url('${e.target.result}')`;
    imagePreview.textContent = '';

    // Put base64 into URL input for saving
    imageUrlInput.value = e.target.result;
  };
  reader.readAsDataURL(file);
});

// publish
postForm.addEventListener('submit',()=>{
  const title = document.getElementById('postTitle').value || 'Untitled';
  const ingredients = document.getElementById('postIngredients').value.split('\n').filter(Boolean);
  const steps = document.getElementById('postSteps').value || '';
  const tags = (document.getElementById('postTags').value || '').split(',').map(t=>t.trim()).filter(Boolean);
  const img = document.getElementById('postImage').value || 'https://images.unsplash.com/photo-1512058564366-c9e3b9f3b0f3?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=2';

  const cardData = {title,meta: (ingredients.length? ingredients.length + ' items • Custom' : 'Quick'), img, tags: tags.length?tags:['Homemade']};
  const newCard = createCard(cardData);
  cardContainer.prepend(newCard);
  close();
});

// small: global search suggestion (very lightweight)
const globalSearch = document.getElementById('globalSearch');
globalSearch.addEventListener('input', (e)=>{
  const q = e.target.value.trim().toLowerCase();
  if(q.length<2) return;
  // naive highlight: scroll to first matching card
  const cards = Array.from(cardContainer.querySelectorAll('.card'));
  const found = cards.find(c=> c.querySelector('.title').textContent.toLowerCase().includes(q));
  if(found) found.scrollIntoView({behavior:'smooth',block:'center'});
});

// keyboard shortcut: press "n" to open composer
window.addEventListener('keydown', (e)=>{ if(e.key==='n' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) open(); });

// Post Viewer Modal
const viewModal = document.getElementById('viewModal');
const viewImage = document.getElementById('viewImage');
const viewTitle = document.getElementById('viewTitle');
const viewMeta = document.getElementById('viewMeta');
const viewTags = document.getElementById('viewTags');
const closeView = document.getElementById('closeView');
const usercomment = document.querySelector('.usercomment');
const publishBtn = document.querySelector('#publish');

usercomment.addEventListener('input', (e) => {
  if(e.currentTarget.value !== ""){
    publishBtn.removeAttribute("disabled");
    publishBtn.classList.add("able");
  } else{
    publishBtn.setAttribute("disabled","disabled");
    publishBtn.classList.remove("able");
  }
});

function openViewer(data) {
  viewImage.style.backgroundImage = `url('${data.img}')`;
  viewTitle.textContent = data.title;
  viewMeta.textContent = data.meta;
  viewTags.innerHTML = data.tags.map(t => `<div class="tag">${t}</div>`).join('');

  // Load comments for this post in the modal
  loadCommentsForCard(data.title, document.getElementById('comments-container'));

  viewModal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

closeView.addEventListener('click', () => {
  viewModal.style.display = 'none';
  document.body.style.overflow = 'auto';
});

viewModal.addEventListener('click', (e) => {
  if (e.target === viewModal) {
    viewModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// Function to load comments for the current item (based on title) - Updated to use the same function
function loadComments() {
    const title = document.getElementById('viewTitle').textContent;
    loadCommentsForCard(title, document.getElementById('comments-container'));
}

// Function to save a new comment - Updated to use the same function
function saveComment(text) {
    const title = document.getElementById('viewTitle').textContent;
    saveCommentForCard(title, text);
}

// Event listener for comment button to toggle comment section
document.getElementById('commentBtn').addEventListener('click', function() {
    const commentInput = document.querySelector('.comment-input');
    commentInput.style.display = commentInput.style.display === 'none' ? 'block' : 'none';
    if (commentInput.style.display === 'block') {
        loadComments(); // Load comments when opening the section
    }
});

// Event listener for post comment button
document.getElementById('publish').addEventListener('click', function() {
    const input = document.querySelector('.usercomment');
    const commentText = input.value.trim();
    if (commentText) {
        saveComment(commentText);
        input.value = ''; // Clear the input
        loadComments(); // Reload comments to display the new one
        publishBtn.setAttribute("disabled", "disabled"); // Disable after posting
        publishBtn.classList.remove("able");
        // Update the card's comments
        const title = document.getElementById('viewTitle').textContent;
        const cards = Array.from(cardContainer.querySelectorAll('.card'));
        const card = cards.find(c => c.querySelector('.title').textContent === title);
        if (card) {
            const commentsContainer = card.querySelector('.card-comments');
            loadCommentsForCard(title, commentsContainer);
        }
    } else {
        alert('Please write a comment before posting.');
    }
});

const currentUser = localStorage.getItem('PFPUSERNAME');

if (currentUser) {
    document.getElementById('PFPNAME').innerHTML = currentUser;
}

const LOGOUT = document.getElementById('LOGOUTDIV');
const feed = document.getElementById('feed');
const profile = document.getElementById('PROFILE');
const setting = document.getElementById('SETTINGS');

feed.onclick = function () {
  window.location.href = "HOME.html";
}

profile.onclick = function () {
  window.location.href = "PROFILE.html";
}

setting.onclick = function () {
  window.location.href = "SETTINGS.html";
}

LOGOUT.onclick = function(){
  window.location.href = "LOGIN.html";
}

document.addEventListener('DOMContentLoaded', function() {
  const profiled = localStorage.getItem('profilePic');
  const avatar = document.querySelector('.avatar');
      avatar.style.backgroundImage = `url(${profiled})`;
      avatar.style.backgroundSize = 'cover';
      avatar.textContent = '';
});

