
/* Create all graph cards */

const gallery = document.getElementById("gallery");

function displayGraphs() {
    gallery.innerHTML = "";

    graphs.forEach(function (graph, index) {
        const card = document.createElement("article");
        card.className = "graph-card";

        if (index === 0) {
            card.classList.add("first-card");
            card.innerHTML = `
                <img src="${graph.image}" alt="${graph.title}">
            `;
        } else {
            card.innerHTML = `
                <div class="research-layout">
                    <div class="graph-image">
                        <img src="${graph.image}" alt="${graph.title}">
                    </div>
                    <div class="research-notes">
                        ${graph.notes}
                    </div>
                </div>
            `;
        }

        const actions = document.createElement("div");
        actions.className = "card-actions";

        const enlargeButton = document.createElement("button");
        enlargeButton.className = "card-button";
        enlargeButton.textContent = "Enlarge Graph";

        enlargeButton.addEventListener("click", function (event) {
            event.stopPropagation();
            openViewer(index, false);
        });

        actions.appendChild(enlargeButton);

        if (graph.code.trim() !== "") {
            const codeButton = document.createElement("button");
            codeButton.className = "card-button code-button";
            codeButton.textContent = "View Code";

            codeButton.addEventListener("click", function (event) {
                event.stopPropagation();
                openViewer(index, true);
            });

            actions.appendChild(codeButton);
        }

        card.appendChild(actions);

        card.addEventListener("click", function () {
            openViewer(index, false);
        });

        gallery.appendChild(card);
    });
}

/* Viewer elements */

const viewer = document.getElementById("viewer");
const viewerTitle = document.getElementById("viewerTitle");
const largeGraph = document.getElementById("largeGraph");
const viewerNotes = document.getElementById("viewerNotes");
const viewerResearch = document.getElementById("viewerResearch");
const closeButton = document.getElementById("closeButton");
const viewCodeButton = document.getElementById("viewCodeButton");
const codePanel = document.getElementById("codePanel");
const pythonCode = document.getElementById("pythonCode");
const copyButton = document.getElementById("copyButton");

/* Open enlarged graph */

function openViewer(index, showCode) {
    const graph = graphs[index];

    viewerTitle.textContent = graph.title;
    largeGraph.src = graph.image;
    largeGraph.alt = graph.title;

    viewerNotes.innerHTML = graph.notes;
    viewerNotes.hidden = index === 0;

    viewerResearch.style.gridTemplateColumns =
        index === 0
            ? "1fr"
            : "minmax(0, 1.4fr) minmax(0, 0.8fr)";

    pythonCode.textContent = graph.code;

    if (graph.code.trim() === "") {
        viewCodeButton.hidden = true;
        codePanel.hidden = true;
    } else {
        viewCodeButton.hidden = false;
        codePanel.hidden = !showCode;
    }

    viewCodeButton.textContent = codePanel.hidden
        ? "View Code"
        : "Hide Code";

    viewer.classList.add("active");
    viewer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

/* Close viewer */

function closeViewer() {
    viewer.classList.remove("active");
    viewer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    codePanel.hidden = true;
}

closeButton.addEventListener("click", closeViewer);

viewer.addEventListener("click", function (event) {
    if (event.target === viewer) {
        closeViewer();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeViewer();
    }
});

/* Show or hide Python code */

viewCodeButton.addEventListener("click", function () {
    codePanel.hidden = !codePanel.hidden;

    viewCodeButton.textContent = codePanel.hidden
        ? "View Code"
        : "Hide Code";

    if (!codePanel.hidden) {
        codePanel.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    }
});

/* Copy code */

copyButton.addEventListener("click", async function () {
    try {
        await navigator.clipboard.writeText(
            pythonCode.textContent
        );

        copyButton.textContent = "Copied!";

        setTimeout(function () {
            copyButton.textContent = "Copy Code";
        }, 1500);

    } catch (error) {
        const textArea = document.createElement("textarea");
        textArea.value = pythonCode.textContent;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        textArea.remove();

        copyButton.textContent = "Copied!";

        setTimeout(function () {
            copyButton.textContent = "Copy Code";
        }, 1500);
    }
});

/* Display all graphs */

displayGraphs();
