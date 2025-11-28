const logoutbut = document.getElementById('LOGOUTDIV');

logoutbut.addEventListener("click", function(e){
    e.stopPropagation(); 
    localStorage.setItem("PFPUSERNAME", ""); 
    document.getElementById('PFPNAME').textContent = ""; 

    const avatar = document.querySelector('.avatar');
    avatar.style.backgroundImage = "url('https://via.placeholder.com/120x120/85193C/FFFFFF?text=Profile+Pic')";
    avatar.style.backgroundSize = 'cover';
    avatar.textContent = '';

    alert("LOGGED OUT!");
});
