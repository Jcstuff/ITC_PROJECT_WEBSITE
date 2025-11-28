document.getElementById("globalSearch").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();

        const keyword = this.value.toLowerCase().trim();
        const cards = document.querySelectorAll("#cardContainer .card");

        cards.forEach(card => {
            const text = card.innerText.toLowerCase();
            card.style.display = text.includes(keyword) || keyword === "" ? "block" : "none";
        });
    }
});


function highlight(element, keyword) {
    if (element.hasChildNodes()) {
        element.childNodes.forEach(child => highlight(child, keyword));
    } else if (element.nodeType === Node.TEXT_NODE) {

        const text = element.textContent;
        const index = text.toLowerCase().indexOf(keyword);

        if (index !== -1) {
            const span = document.createElement("span");
            span.innerHTML =
                text.substring(0, index) +
                `<mark>${text.substring(index, index + keyword.length)}</mark>` +
                text.substring(index + keyword.length);

            element.replaceWith(span);
        }
    }
}
function removeHighlights() {
    document.querySelectorAll("mark").forEach(mark => {
        mark.replaceWith(mark.textContent);
    });
}

//easteregg

document.addEventListener("DOMContentLoaded", () => {
    const EASTEREGGS = document.querySelector('.EASTEREGG');
    const input = document.getElementById("globalSearch");
    
    document.getElementById("globalSearch").addEventListener("keydown", function (event) {
        if (event.key === "Enter"){
        if (input.value.trim() === "steven") {
            event.preventDefault();
            EASTEREGGS.style.backgroundImage = "url('steven.png')";
          
        }else if(input.value.trim() === "gerald") {
            event.preventDefault();
            EASTEREGGS.style.backgroundImage = "url('gerald.jpg')";
            EASTEREGGS.style.backgroundSize = "cover";
            EASTEREGGS.style.backgroundRepeat = "no-repeat";
            EASTEREGGS.style.backgroundPosition = "center";
        } else if (input.value.trim() === "nasser") {
            event.preventDefault();
            EASTEREGGS.style.backgroundImage = "url('nasser.png')";
        } else if (input.value.trim() === "celi") {
            event.preventDefault(); 
            EASTEREGGS.style.backgroundImage = "url('celi.jpg')";
            EASTEREGGS.style.backgroundSize = "cover";
            EASTEREGGS.style.backgroundRepeat = "no-repeat";
            EASTEREGGS.style.backgroundPosition = "center";
        } else if (input.value.trim() === "vaughn") {
            event.preventDefault(); 
            EASTEREGGS.style.backgroundImage = "url('vaughn.jpg')";
            EASTEREGGS.style.backgroundSize = "cover";
            EASTEREGGS.style.backgroundRepeat = "no-repeat";
            EASTEREGGS.style.backgroundPosition = "center";
        } else if (input.value.trim() === "jc") {
            event.preventDefault(); 
            EASTEREGGS.style.backgroundImage = "url('jc.png')";
            EASTEREGGS.style.backgroundSize = "cover";
            EASTEREGGS.style.backgroundRepeat = "no-repeat";
            EASTEREGGS.style.backgroundPosition = "center";
        } else if (input.value.trim() === "brent") {
            event.preventDefault(); 
            EASTEREGGS.style.backgroundImage = "url('brent.png')";
            EASTEREGGS.style.backgroundSize = "cover";
            EASTEREGGS.style.backgroundRepeat = "no-repeat";
            EASTEREGGS.style.backgroundPosition = "center";
        }
    }
    });
});
