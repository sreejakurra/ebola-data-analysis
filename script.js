
const graphs = [
    {
        title: "Geographic Spread of Ebola",
        image: "graphs/graph1.jpg",
        code: "",
        notes: "",
        originalLayout: true
    },
    {
        title: "Recorded Values Accelerated Over Time",
        image: "graphs/conclusion2a.jpg",
        code: `import pandas as pd
import matplotlib.pyplot as plt

url = "https://raw.githubusercontent.com/plotly/datasets/master/2014_ebola.csv"
df = pd.read_csv(url)

months = [
    "Mar", "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct", "Nov", "Dec"
]

monthly = df.groupby("Month")["Value"].sum()
monthly = monthly.reindex(months)

monthly.dropna().plot(
    kind="bar",
    figsize=(10, 5),
    color="#168b87"
)

plt.title("Monthly Recorded Ebola Values in 2014")
plt.xlabel("Month")
plt.ylabel("Sum of Recorded Values")
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()`,
        notes: `Monthly totals combine recorded values across countries, helping compare how the reported outbreak pattern changed over time.

• A rising total may reflect increasing values in affected countries and reports from additional locations.
• These totals describe recorded data; they cannot alone separate changes in transmission from changes in testing or reporting.`
    },
    {
        title: "Recorded Values by Country",
        image: "graphs/conclusion2b.jpg",
        code: `import pandas as pd
import matplotlib.pyplot as plt

url = "https://raw.githubusercontent.com/plotly/datasets/master/2014_ebola.csv"
df = pd.read_csv(url)

months = [
    "Mar", "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct", "Nov", "Dec"
]

df["Month"] = pd.Categorical(
    df["Month"],
    categories=months,
    ordered=True
)

country_month = df.pivot_table(
    index="Month",
    columns="Country",
    values="Value",
    aggfunc="sum",
    observed=False
)

country_month.plot(
    figsize=(10, 5),
    marker="o"
)

plt.title("Recorded Ebola Values by Country")
plt.xlabel("Month")
plt.ylabel("Recorded Value")
plt.xticks(rotation=45)
plt.legend(title="Country")
plt.tight_layout()
plt.show()`,
        notes: `Country-level trends show whether recorded values followed similar patterns across the region or differed by country.

• Countries can peak in different months, so a regional total can hide important local differences.
• Differences in recorded values may reflect outbreak conditions as well as differences in surveillance and reporting.`
    },
    {
        title: "Liberia Recorded the Highest Single Value",
        image: "graphs/conclusion3.png",
        code: `import pandas as pd
import matplotlib.pyplot as plt

url = "https://raw.githubusercontent.com/plotly/datasets/master/2014_ebola.csv"
df = pd.read_csv(url)

highest = df.groupby("Country")["Value"].max()
highest = highest.sort_values()

highest.plot(
    kind="barh",
    figsize=(9, 5),
    color="#d96850"
)

plt.title("Highest Recorded Value by Country")
plt.xlabel("Highest Recorded Value")
plt.ylabel("Country")
plt.tight_layout()
plt.show()`,
        notes: `Liberia has the highest single recorded value in this comparison, but the peak alone does not explain why it occurred.

• A single-country maximum identifies the largest individual recorded value, not the country's cumulative total.
• Outbreak intensity, healthcare capacity and reporting practices may warrant further investigation; this graph alone cannot establish the cause.`
    }
];

const gallery = document.getElementById("gallery");
const viewer = document.getElementById("viewer");
const viewerResearch = document.getElementById("viewerResearch");
const largeGraph = document.getElementById("largeGraph");
const viewerNotes = document.getElementById("viewerNotes");
const pythonCode = document.getElementById("pythonCode");
const codePanel = document.getElementById("codePanel");
const viewCodeButton = document.getElementById("viewCodeButton");
const copyButton = document.getElementById("copyButton");
const closeButton = document.getElementById("closeButton");

// Create all graph cards.
graphs.forEach((graph, index) => {
    const card = document.createElement("article");
    card.className = "graph-card";

    const image = document.createElement("img");
    image.src = graph.image;
    image.alt = graph.title;

    image.onerror = () => {
        image.alt = "Image not found: " + graph.image;
    };

    // Keep Graph 1 in its original layout.
    if (graph.originalLayout) {
        const heading = document.createElement("h3");
        heading.textContent = graph.title;
        card.append(image, heading);
    } else {
        // Graphs 2a, 2b and 2c show notes beside the graph.
        card.classList.add("research-card");

        const researchLayout = document.createElement("div");
        researchLayout.className = "research-layout";

        const notes = document.createElement("div");
        notes.className = "research-notes";

        addNotes(notes, graph.notes);

        researchLayout.append(image, notes);
        card.appendChild(researchLayout);
    }

    const bottom = document.createElement("div");
    bottom.className = "card-bottom";

    const buttons = document.createElement("div");
    buttons.className = "card-buttons";

    const enlargeButton = document.createElement("button");
    enlargeButton.className = "open-card";
    enlargeButton.textContent = "Enlarge";

    enlargeButton.addEventListener("click", event => {
        event.stopPropagation();
        openViewer(index);
    });

    buttons.appendChild(enlargeButton);

    if (graph.code.trim() !== "") {
        const codeButton = document.createElement("button");
        codeButton.className = "open-card";
        codeButton.textContent = "View Code";

        codeButton.addEventListener("click", event => {
            event.stopPropagation();
            openViewer(index);
            showCode();
        });

        buttons.appendChild(codeButton);
    }

    bottom.appendChild(buttons);
    card.appendChild(bottom);

    card.addEventListener("click", () => openViewer(index));

    gallery.appendChild(card);
});

// Display the introduction and bullet points.
function addNotes(container, text) {
    container.replaceChildren();

    const parts = text.split("\n\n");

    parts.forEach(part => {
        if (!part.trim()) {
            return;
        }

        if (part.includes("\n• ")) {
            const lines = part.split("\n");

            const paragraph = document.createElement("p");
            paragraph.textContent = lines[0];
            container.appendChild(paragraph);

            const list = document.createElement("ul");

            lines.slice(1).forEach(line => {
                if (!line.trim()) {
                    return;
                }

                const item = document.createElement("li");
                item.textContent = line.replace(/^•\s*/, "");
                list.appendChild(item);
            });

            container.appendChild(list);
        } else {
            const paragraph = document.createElement("p");
            paragraph.textContent = part;
            container.appendChild(paragraph);
        }
    });
}

// Open the selected graph with its matching notes.
function openViewer(index) {
    const graph = graphs[index];

    largeGraph.src = graph.image;
    largeGraph.alt = graph.title;

    viewerNotes.hidden = true;
    viewerNotes.replaceChildren();

    if (!graph.originalLayout && graph.notes) {
        addNotes(viewerNotes, graph.notes);
        viewerNotes.hidden = false;
    }

    viewerResearch.classList.toggle(
        "viewer-research-layout",
        !graph.originalLayout
    );

    pythonCode.textContent = graph.code;
    codePanel.hidden = true;
    viewCodeButton.textContent = "View Code";
    viewCodeButton.hidden = graph.code.trim() === "";

    viewer.classList.add("is-open");
    viewer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

// Show the Python code panel.
function showCode() {
    if (!pythonCode.textContent.trim()) {
        return;
    }

    codePanel.hidden = false;
    viewCodeButton.hidden = true;
}

viewCodeButton.addEventListener("click", showCode);
closeButton.addEventListener("click", closeViewer);

// Close the enlarged view.
function closeViewer() {
    viewer.classList.remove("is-open");
    viewer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

// Close when the dark background is clicked.
viewer.addEventListener("click", event => {
    if (event.target === viewer) {
        closeViewer();
    }
});

// Close with the Escape key.
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeViewer();
    }
});

// Copy the displayed Python code.
copyButton.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(pythonCode.textContent);
        copyButton.textContent = "Copied!";
    } catch {
        const range = document.createRange();
        range.selectNodeContents(pythonCode);

        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        copyButton.textContent = "Select and press Ctrl+C";
    }
});
