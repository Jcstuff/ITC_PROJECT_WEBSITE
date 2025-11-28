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
