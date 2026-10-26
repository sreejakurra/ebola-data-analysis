
const graphs = [
    {
        title: "Graph 1: Ebola Outbreak Overview",
        image: "graphs/graph1.jpg",
        notes: `
            <h3>Observation</h3>
            This visualization introduces the Ebola outbreak dataset and provides
            an overview of the information used in the analysis.
        `,
        research: `
            <h3>Interpretation</h3>
            Looking at the dataset first helps establish the context for the
            visualizations that follow.
        `,
        code: ""
    },
    {
        title: "Graph 2a: Missing Values",
        image: "graphs/conclusion2a.jpg",
        notes: `
            <h3>Observation</h3>
            Missing values show that some observations or fields were not
            recorded completely.
        `,
        research: `
            <h3>Interpretation</h3>
            Missing data can affect comparisons and conclusions. It is important
            to check data completeness before drawing conclusions.
        `,
        code: `import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

df = pd.read_csv("2014_ebola.csv")

missing = df.isnull().sum()
missing = missing[missing > 0].sort_values(ascending=False)

missing.plot(kind="bar", figsize=(10, 5))
plt.title("Missing Values in the Ebola Dataset")
plt.xlabel("Columns")
plt.ylabel("Number of Missing Values")
plt.xticks(rotation=45, ha="right")
plt.tight_layout()
plt.show()`
    },
    {
        title: "Graph 2b: Data Distribution",
        image: "graphs/conclusion2b.jpg",
        notes: `
            <h3>Observation</h3>
            The distribution visualization shows how the selected values are
            spread across the dataset.
        `,
        research: `
            <h3>Interpretation</h3>
            A distribution can reveal whether observations are concentrated
            in a small range or spread across a wider range.
        `,
        code: `import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("2014_ebola.csv")

column = "Cases"
if column in df.columns:
    values = pd.to_numeric(df[column], errors="coerce").dropna()
    plt.hist(values, bins=20)
    plt.title("Distribution of Reported Cases")
    plt.xlabel("Reported Cases")
    plt.ylabel("Frequency")
    plt.tight_layout()
    plt.show()
else:
    print("Check the dataset for the correct column name.")`
    },
    {
        title: "Graph 2c: Outlier Analysis",
        image: "graphs/conclusion3.png",
        notes: `
            <h3>Observation</h3>
            Outliers are values that lie far from the main concentration of
            observations.
        `,
        research: `
            <h3>Interpretation</h3>
            In outbreak data, unusually high values may reflect periods or
            locations with many reported cases. They should be investigated
            rather than automatically removed.
        `,
        code: `import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("2014_ebola.csv")

column = "Cases"
if column in df.columns:
    values = pd.to_numeric(df[column], errors="coerce").dropna()
    plt.boxplot(values)
    plt.title("Outlier Analysis of Reported Cases")
    plt.ylabel("Reported Cases")
    plt.tight_layout()
    plt.show()
else:
    print("Check the dataset for the correct column name.")`
    },
    {
        title: "Graph 3: Box Plot",
        image: "graphs/conclusion4.jpeg",
        notes: `
            <h3>Observation</h3>
            The box plot displays the spread of values, the median, and
            potential outliers.
        `,
        research: `
            <h3>Interpretation</h3>
            A wide spread suggests that reported values differ substantially.
            Outliers may indicate unusually high observations and need context.
        `,
        code: `import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("2014_ebola.csv")

column = "Cases"
if column in df.columns:
    values = pd.to_numeric(df[column], errors="coerce").dropna()
    plt.boxplot(values)
    plt.title("Distribution of Ebola Cases")
    plt.ylabel("Cases")
    plt.tight_layout()
    plt.show()
else:
    print("Check the dataset for the correct column name.")`
    },
    {
        title: "Graph 4: Donut Chart",
        image: "graphs/conclusion5.jpeg",
        notes: `
            <h3>Observation</h3>
            The donut chart compares the proportions represented by its
            categories.
        `,
        research: `
            <h3>Interpretation</h3>
            Larger sections represent larger shares of the total. The
            interpretation depends on the categories and values used in the
            original chart.
        `,
        code: `import matplotlib.pyplot as plt

# Replace these example values with the values used in your chart.
labels = ["Category A", "Category B", "Category C"]
values = [40, 35, 25]

plt.pie(
    values,
    labels=labels,
    autopct="%1.1f%%",
    startangle=90,
    wedgeprops={"width": 0.4}
)
plt.title("Category Proportions")
plt.tight_layout()
plt.show()`
    },
    {
        title: "Graph 5: Scatter Plot",
        image: "graphs/conclusion6.jpeg",
        notes: `
            <h3>Observation</h3>
            The scatter plot compares two variables. Each point represents
            one observation.
        `,
        research: `
            <h3>Interpretation</h3>
            A visible pattern may suggest an association between the variables,
            but a scatter plot alone cannot establish causation.
        `,
        code: `import matplotlib.pyplot as plt

# Example values only: replace with your original chart data.
x = [1, 2, 3, 4, 5]
y = [2, 4, 3, 7, 6]

plt.scatter(x, y)
plt.title("Relationship Between Two Variables")
plt.xlabel("Variable X")
plt.ylabel("Variable Y")
plt.tight_layout()
plt.show()`
    },
    {
        title: "Graph 6: Ebola Cases by Country and Month",
        image: "graphs/conclusion7.jpeg",
        notes: `
            <h3>Observation</h3>
            The grouped bar chart compares reported cases across countries
            during July, August, and September. Liberia and Sierra Leone show
            substantial increases over this period in the displayed data.
            Guinea also shows an increase, while Senegal and Mali have much
            smaller reported values in this chart.
        `,
        research: `
            <h3>Interpretation</h3>
            The comparison highlights differences in the scale and timing of
            reported cases across countries. Very small values may be difficult
            to see beside much larger values. A displayed zero can also mean
            that no value was plotted; it does not by itself prove that no
            cases occurred.
        `,
        code: `import matplotlib.pyplot as plt
import numpy as np

countries = ["Liberia", "Sierra Leone", "Guinea", "Senegal", "Mali"]

july = [329, 533, 460, 0, 0]
august = [1395, 1216, 771, 1, 0]
september = [3362, 1940, 1022, 3, 0]

x = np.arange(len(countries))
width = 0.25

plt.figure(figsize=(10, 6))
plt.bar(x - width, july, width, label="July")
plt.bar(x, august, width, label="August")
plt.bar(x + width, september, width, label="September")

plt.xlabel("Country")
plt.ylabel("Reported Cases")
plt.title("Reported Ebola Cases by Country and Month")
plt.xticks(x, countries, rotation=25)
plt.legend()
plt.tight_layout()
plt.show()`
    }
];

const gallery = document.getElementById("gallery");
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

let currentGraph = null;

function openViewer(graph) {
    if (!viewer) return;

    currentGraph = graph;

    viewerTitle.textContent = graph.title;
    largeGraph.src = graph.image;
    largeGraph.alt = graph.title;
    viewerNotes.innerHTML = graph.notes;
    viewerResearch.innerHTML = graph.research;

    pythonCode.textContent = graph.code || "No code available for this graph.";

    codePanel.classList.add("hidden");

    if (!graph.code) {
        viewCodeButton.classList.add("hidden");
    } else {
        viewCodeButton.classList.remove("hidden");
        viewCodeButton.textContent = "View Code";
    }

    viewer.classList.remove("hidden");
    document.body.classList.add("viewer-open");
}

function closeViewer() {
    if (!viewer) return;

    viewer.classList.add("hidden");
    document.body.classList.remove("viewer-open");
}

function createGallery() {
    if (!gallery) {
        console.error('Missing element: id="gallery"');
        return;
    }

    gallery.innerHTML = "";

    graphs.forEach((graph, index) => {
        const card = document.createElement("article");
        card.className = "graph-card";

        const heading = document.createElement("h2");
        heading.textContent = graph.title;

        const image = document.createElement("img");
        image.src = graph.image;
        image.alt = graph.title;
        image.loading = "lazy";
        image.onerror = function () {
            this.alt = "Image not found: " + graph.image;
            this.classList.add("image-error");
        };

        const notes = document.createElement("div");
        notes.className = "card-notes";
        notes.innerHTML = graph.notes + graph.research;

        const buttons = document.createElement("div");
        buttons.className = "card-buttons";

        const enlargeButton = document.createElement("button");
        enlargeButton.type = "button";
        enlargeButton.textContent = "Enlarge Graph";
        enlargeButton.addEventListener("click", () => openViewer(graph));

        buttons.appendChild(enlargeButton);

        if (graph.code) {
            const codeButton = document.createElement("button");
            codeButton.type = "button";
            codeButton.textContent = "View Code";
            codeButton.addEventListener("click", () => {
                openViewer(graph);
                codePanel.classList.remove("hidden");
                viewCodeButton.textContent = "Hide Code";
            });
            buttons.appendChild(codeButton);
        }

        card.appendChild(heading);
        card.appendChild(image);
        card.appendChild(notes);
        card.appendChild(buttons);

        gallery.appendChild(card);
    });
}

if (closeButton) {
    closeButton.addEventListener("click", closeViewer);
}

if (viewer) {
    viewer.addEventListener("click", function (event) {
        if (event.target === viewer) {
            closeViewer();
        }
    });
}

if (viewCodeButton) {
    viewCodeButton.addEventListener("click", function () {
        if (!currentGraph || !currentGraph.code) return;

        codePanel.classList.toggle("hidden");

        viewCodeButton.textContent = codePanel.classList.contains("hidden")
            ? "View Code"
            : "Hide Code";
    });
}

if (copyButton) {
    copyButton.addEventListener("click", async function () {
        if (!currentGraph || !currentGraph.code) return;

        try {
            await navigator.clipboard.writeText(currentGraph.code);
            copyButton.textContent = "Copied!";

            setTimeout(() => {
                copyButton.textContent = "Copy Code";
            }, 1500);
        } catch (error) {
            pythonCode.focus();
            copyButton.textContent = "Select and Copy";
        }
    });
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeViewer();
    }
});

createGallery();
