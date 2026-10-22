
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
    },
    {
        title: "Historical Decomposition of the Outbreak",
        image: "graphs/conclusion4.jpeg",
        code: `import matplotlib.pyplot as plt

phases = [
    "March-April",
    "May-June",
    "July",
    "August-September"
]

cases = [20, 248, 1054, 5005]

plt.figure(figsize=(9, 5))
plt.pie(
    cases,
    labels=phases,
    autopct="%1.1f%%",
    startangle=90
)

plt.title("Historical Decomposition of the Ebola Outbreak")
plt.tight_layout()
plt.show()`,
        notes: `The four phases account for 6,327 recorded cases in the period shown.

• August-September contributes 5,005 cases, around 79.1% of the total.
• The distribution shows that recorded cases were heavily concentrated in the final phase.
• These phase totals describe the chart's grouping and do not establish the cause of the increase.`
    },
    {
        title: "Distribution and Variability Across Countries",
        image: "graphs/conclusion5.jpeg",
        code: `import pandas as pd
import matplotlib.pyplot as plt

url = "https://raw.githubusercontent.com/plotly/datasets/master/2014_ebola.csv"
df = pd.read_csv(url)

countries = [
    "Guinea",
    "Liberia",
    "Mali",
    "Senegal",
    "Sierra Leone"
]

data = []

for country in countries:
    values = df.loc[
        df["Country"] == country, "Value"
    ].dropna()
    data.append(values)

plt.figure(figsize=(10, 5))
plt.boxplot(data, labels=countries)

plt.title("Distribution of Recorded Values by Country")
plt.xlabel("Country")
plt.ylabel("Recorded Value")
plt.xticks(rotation=20)
plt.tight_layout()
plt.show()`,
        notes: `The box plot compares the spread of recorded values across five countries.

• Liberia has a potential high outlier, which deserves further investigation.
• Differences in the boxes and whiskers indicate variation in the recorded values.
• A potential outlier is not necessarily an error, and near-zero values do not automatically mean there were no cases.`
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

graphs.forEach((graph, index) => {
    const card = document.createElement("article");
    card.className = "graph-card";

    const image = document.createElement("img");
    image.src = graph.image;
    image.alt = graph.title;

    image.onerror = () => {
        image.alt = "Image not found: " + graph.image;
    };

    if (graph.originalLayout) {
        const heading = document.createElement("h3");
        heading.textContent = graph.title;
        card.append(image, heading);
    } else {
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

function addNotes(container, text) {
    container.replaceChildren();

    const parts = text.split("\n\n");

    parts.forEach(part => {
        if (!part.trim()) return;

        if (part.includes("\n• ")) {
            const lines = part.split("\n");

            const paragraph = document.createElement("p");
            paragraph.textContent = lines[0];
            container.appendChild(paragraph);

            const list = document.createElement("ul");

            lines.slice(1).forEach(line => {
                if (!line.trim()) return;

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

function showCode() {
    if (!pythonCode.textContent.trim()) return;

    codePanel.hidden = false;
    viewCodeButton.hidden = true;
}

viewCodeButton.addEventListener("click", showCode);
closeButton.addEventListener("click", closeViewer);

function closeViewer() {
    viewer.classList.remove("is-open");
    viewer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

viewer.addEventListener("click", event => {
    if (event.target === viewer) closeViewer();
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeViewer();
});

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
