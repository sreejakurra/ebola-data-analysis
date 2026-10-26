
const graphs = [
    {
        title: "Graph 1",
        image: "graphs/graph1.jpg",
        notes: "This graph gives an overview of the Ebola dataset and helps us understand the available data.",
        research: "The initial overview helps identify patterns and understand the dataset before further analysis.",
        code: ""
    },
    {
        title: "Graph 2a",
        image: "graphs/conclusion2a.jpg",
        notes: "This visualization highlights the distribution of values in the dataset.",
        research: "The distribution helps identify common values and possible unusual observations.",
        code: ""
    },
    {
        title: "Graph 2b",
        image: "graphs/conclusion2b.jpg",
        notes: "This graph compares values across the selected categories.",
        research: "Comparisons make differences between categories easier to identify.",
        code: ""
    },
    {
        title: "Graph 3",
        image: "graphs/conclusion3.png",
        notes: "This graph shows how the selected values vary across the dataset.",
        research: "Variation can reveal differences between observations and help guide further analysis.",
        code: ""
    },
    {
        title: "Graph 4",
        image: "graphs/conclusion4.jpeg",
        notes: "This visualization helps examine the geographical distribution of Ebola-related data.",
        research: "Geographical patterns can help identify areas with different levels of reported activity.",
        code: ""
    },
    {
        title: "Graph 5",
        image: "graphs/conclusion5.jpeg",
        notes: "This graph presents another view of the patterns found in the Ebola dataset.",
        research: "The visualization supports comparison and interpretation of the available observations.",
        code: ""
    },
    {
        title: "Graph 6",
        image: "graphs/conclusion6.jpeg",
        notes: "This graph helps examine changes and differences within the dataset.",
        research: "Observing changes helps us understand the distribution of reported Ebola cases.",
        code: ""
    },
    {
        title: "Graph 7",
        image: "graphs/conclusion7.jpeg",
        notes: "This final visualization supports the conclusions drawn from the analysis.",
        research: "The results should be interpreted alongside the other visualizations and the limitations of the dataset.",
        code: ""
    }
];

const gallery = document.getElementById("gallery");
const viewer = document.getElementById("viewer");
const viewerTitle = document.getElementById("viewerTitle");
const largeGraph = document.getElementById("largeGraph");
const viewerNotes = document.getElementById("viewerNotes");
const viewerResearch = document.getElementById("viewerResearch");
const viewCodeButton = document.getElementById("viewCodeButton");
const codePanel = document.getElementById("codePanel");
const pythonCode = document.getElementById("pythonCode");
const copyButton = document.getElementById("copyButton");

let currentGraph = null;

function createGallery() {
    if (!gallery) return;

    gallery.innerHTML = "";

    graphs.forEach((graph, index) => {
        const card = document.createElement("div");
        card.className = "card";

        const image = document.createElement("img");
        image.src = graph.image;
        image.alt = graph.title;
        image.loading = "lazy";

        image.addEventListener("click", () => openViewer(index));

        const title = document.createElement("h3");
        title.textContent = graph.title;

        const enlargeButton = document.createElement("button");
        enlargeButton.textContent = "Enlarge";
        enlargeButton.addEventListener("click", () => openViewer(index));

        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(enlargeButton);

        gallery.appendChild(card);
    });
}

function openViewer(index) {
    currentGraph = graphs[index];

    if (!currentGraph || !viewer) return;

    if (viewerTitle) {
        viewerTitle.textContent = currentGraph.title;
    }

    if (largeGraph) {
        largeGraph.src = currentGraph.image;
        largeGraph.alt = currentGraph.title;
    }

    if (viewerNotes) {
        viewerNotes.textContent = currentGraph.notes;
    }

    if (viewerResearch) {
        viewerResearch.textContent = currentGraph.research;
    }

    if (pythonCode) {
        pythonCode.textContent = currentGraph.code || "No code available for this graph.";
    }

    if (codePanel) {
        codePanel.style.display = "none";
    }

    if (viewCodeButton) {
        viewCodeButton.style.display = currentGraph.code ? "inline-block" : "none";
    }

    viewer.style.display = "flex";
}

function closeViewer() {
    if (viewer) {
        viewer.style.display = "none";
    }

    currentGraph = null;
}

if (viewCodeButton) {
    viewCodeButton.addEventListener("click", () => {
        if (!currentGraph || !codePanel) return;

        codePanel.style.display =
            codePanel.style.display === "none" ? "block" : "none";
    });
}

if (copyButton) {
    copyButton.addEventListener("click", async () => {
        if (!pythonCode) return;

        try {
            await navigator.clipboard.writeText(pythonCode.textContent);
            copyButton.textContent = "Copied!";

            setTimeout(() => {
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

            setTimeout(() => {
                copyButton.textContent = "Copy Code";
            }, 1500);
        }
    });
}

if (viewer) {
    viewer.addEventListener("click", (event) => {
        if (event.target === viewer) {
            closeViewer();
        }
    });
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeViewer();
    }
});

createGallery();
