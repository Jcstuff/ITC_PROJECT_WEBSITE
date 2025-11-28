// PROFILE.js

// Profile Editing Functionality - Unchanged
document.getElementById('editProfileBtn').addEventListener('click', function() {
  const editableElements = ['username', 'bio', 'address', 'contact', 'website', 'email', 'instagram', 'facebook'];
  const isEditing = this.textContent === 'Edit Profile';
  
  editableElements.forEach(id => {
    const element = document.getElementById(id);
    element.contentEditable = isEditing ? 'true' : 'false';
    if (isEditing) {
      element.style.border = '1px solid var(--accent)';
      element.style.padding = '5px';
      element.style.borderRadius = '4px';
      // Load from localStorage if available
      const saved = localStorage.getItem(id);
      if (saved) element.textContent = saved;
    } else {
      element.style.border = 'none';
      element.style.padding = '0';
      // Save to localStorage
      localStorage.setItem(id, element.textContent);
    }
  });


  if (!isEditing) {
  localStorage.setItem("PFPUSERNAME", document.getElementById('username').textContent);
  document.getElementById('PFPNAME').textContent = document.getElementById('username').textContent;
  
}

  
  this.textContent = isEditing ? 'Save Changes' : 'Edit Profile';
});

// Upload Profile Pic Button - Unchanged
document.getElementById('uploadProfilePicBtn').addEventListener('click', function() {
  document.getElementById('profilePicInput').click();
});

// Image Upload Functionality
const profilePicInput = document.getElementById('profilePicInput');
const coverPhotoInput = document.getElementById('coverPhotoInput');

// Handle Profile Picture Upload
profilePicInput.addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      // Update topbar avatar
      const avatar = document.querySelector('.avatar');
      avatar.style.backgroundImage = `url(${e.target.result})`;
      avatar.style.backgroundSize = 'cover';
      avatar.textContent = '';
      
      // Update profile page display
      const profilePicDisplay = document.getElementById('profilePicDisplay').querySelector('img');
      profilePicDisplay.src = e.target.result;
      
      // Save to localStorage
      localStorage.setItem('profilePic', e.target.result);
    };
    reader.readAsDataURL(file);
  }
});

// Handle Cover Photo Upload - Unchanged
coverPhotoInput.addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const coverElement = document.querySelector('.feed-header');
      coverElement.style.backgroundImage = `url(${e.target.result})`;
      coverElement.style.backgroundSize = 'cover';
      localStorage.setItem('coverPhoto', e.target.result);
    };
    reader.readAsDataURL(file);
  }
});

// Load saved data on page load
window.addEventListener('load', () => {
  const editableElements = ['username', 'bio', 'address', 'contact', 'website', 'email', 'instagram', 'facebook'];
  editableElements.forEach(id => {
    const saved = localStorage.getItem(id);
    if (saved) document.getElementById(id).textContent = saved;
  });
  
  // Load profile pic
  const savedPic = localStorage.getItem('profilePic');
  if (savedPic) {
    // Update topbar avatar
    const avatar = document.querySelector('.avatar');
    avatar.style.backgroundImage = `url(${savedPic})`;
    avatar.style.backgroundSize = 'cover';
    avatar.textContent = '';
    
    // Update profile page display
    const profilePicDisplay = document.getElementById('profilePicDisplay').querySelector('img');
    profilePicDisplay.src = savedPic;
  }
  
  // Load cover photo - Unchanged
  const savedCover = localStorage.getItem('coverPhoto');
  if (savedCover) {
    const coverElement = document.querySelector('.feed-header');
    coverElement.style.backgroundImage = `url(${savedCover})`;
    coverElement.style.backgroundSize = 'cover';
  }
});

// Post Actions Functionality (per card) - Unchanged
document.querySelectorAll('.card').forEach(card => {
  const likeBtn = card.querySelector('.like');
  const commentBtn = card.querySelector('#commentBtn');
  const saveBtn = card.querySelector('.save');
  const commentInput = card.querySelector('.comment-input');
  const publishCommentBtn = card.querySelector('.publish-comment');
  const commentsContainer = card.querySelector('.card-comments');
  
  // Like Button
  likeBtn.addEventListener('click', function() {
    const heart = this.querySelector('.heart');
    heart.classList.toggle('bounce');
    this.classList.toggle('liked');
    this.innerHTML = this.classList.contains('liked') ? '<span class="heart">❤️</span> Liked' : '<span class="heart">❤️</span> Like';
  });
  
  // Comment Button
  commentBtn.addEventListener('click', function() {
    commentInput.style.display = commentInput.style.display === 'flex' ? 'none' : 'flex';
  });
  
  // Publish Comment
  publishCommentBtn.addEventListener('click', function() {
    const input = commentInput.querySelector('input');
    if (input.value.trim()) {
      const comment = document.createElement('div');
      comment.className = 'comment';
      comment.innerHTML = `<strong>You:</strong> ${input.value} <span class="comment-timestamp">${new Date().toLocaleTimeString()}</span>`;
      commentsContainer.appendChild(comment);
      input.value = '';
      commentInput.style.display = 'none';
    }
  });
  
/*
  document.addEventListener("DOMContentLoaded", () => {
  saveBtn.addEventListener('click', function() {
    this.textContent = this.textContent === '🔖 Save' ? '🔖 Saved' : '🔖 Save';
    this.style.color = this.textContent === '🔖 Saved' ? 'var(--accent)' : '';
     const cardHTML = `
    <div class="card">
          <div class="media" style="background-image: url('crispy.jpg');"></div>
          <div class="content">
            <div class="meta">John Doe • 2 hours ago</div>
            <div class="title">Crispy Sinigang na Baboy</div>
            <div class="tags">
              <div class="tag">#sinigang</div>
              <div class="tag">#filipino</div>
            </div>
            <div class="actions">
              <button class="btn like"><span class="heart">❤️</span> Like</button>
              <button class="btn" id="commentBtn">💬 Comment</button>
              
            </div>
            <div class="comment-input" style="display:none;">
              <input type="text" placeholder="Say something..." class="usercomment" />
              <button type="button" class="publish-comment">Publish</button>
            </div>
            <div class="card-comments"></div>
          </div>
        </div>`;
         document.getElementById("cardContainer").insertAdjacentHTML("beforeend", cardHTML);

        attachCardFunctions();
  }); */
});

// Suggestion Actions (Follow/Join) - Unchanged
document.querySelectorAll('.suggestion .btn').forEach(button => {
  button.addEventListener('click', function() {
    this.textContent = this.textContent === 'Follow' ? 'Following' : this.textContent === 'Join' ? 'Joined' : this.textContent;
    this.style.backgroundColor = '#9F2330';
    this.disabled = true;
  });
});

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
  const usernamePFP = localStorage.getItem("PFPUSERNAME");
  document.getElementById('username').textContent = usernamePFP;
  document.getElementById('PFPNAME').textContent = usernamePFP;
  const profiled = localStorage.getItem('profilePic');
  const avatar = document.querySelector('.avatar');
      avatar.style.backgroundImage = `url(${profiled})`;
      avatar.style.backgroundSize = 'cover';
      avatar.textContent = '';

  const IMGPFP = document.querySelector('.profile-pic-display img');
      IMGPFP.style.backgroundImage = `url(${profiled})`;
      IMGPFP.style.backgroundSize = 'cover';
      IMGPFP.textContent = '';
});
