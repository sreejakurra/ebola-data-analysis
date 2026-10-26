const graphs = [
    {
        title: "Geographic Distribution",
        image: "graphs/graph1.jpg",
        notes: "",
        code: ""
    },

    {
        title: "Monthly Recorded Values",
        image: "graphs/conclusion2a.jpg",
        notes: `
            <h3 class="notes-label">Monthly Pattern</h3>
            <p>This graph helps compare recorded Ebola values across months.</p>
            <ul>
                <li>Changes between months can reveal periods of increasing or decreasing reported activity.</li>
                <li>A rise in recorded values indicates a change in the observations included in the dataset.</li>
                <li>Missing records should be considered when interpreting the totals.</li>
            </ul>
        `,
        code: `import pandas as pd
import matplotlib.pyplot as plt

url = "https://raw.githubusercontent.com/plotly/datasets/master/2014_ebola.csv"
df = pd.read_csv(url)

df["Date"] = pd.to_datetime(df["Date"], errors="coerce")
df["Value"] = pd.to_numeric(df["Value"], errors="coerce")

df["Month"] = df["Date"].dt.to_period("M")
monthly_values = df.groupby("Month")["Value"].sum()

monthly_values.plot(kind="bar", figsize=(10, 5))

plt.title("Monthly Recorded Ebola Values")
plt.xlabel("Month")
plt.ylabel("Recorded Value")
plt.tight_layout()
plt.show()`
    },

    {
        title: "Country-Level Monthly Trend",
        image: "graphs/conclusion2b.jpg",
        notes: `
            <h3 class="notes-label">Country Comparison</h3>
            <p>The graph compares how recorded values change over time in different countries.</p>
            <ul>
                <li>Countries do not necessarily follow the same pattern.</li>
                <li>Sharp increases make periods of greater reported activity easier to identify.</li>
                <li>Missing observations and differences in reporting can affect comparisons.</li>
            </ul>
        `,
        code: `import pandas as pd
import matplotlib.pyplot as plt

url = "https://raw.githubusercontent.com/plotly/datasets/master/2014_ebola.csv"
df = pd.read_csv(url)

df["Date"] = pd.to_datetime(df["Date"], errors="coerce")
df["Value"] = pd.to_numeric(df["Value"], errors="coerce")
df = df.dropna(subset=["Date", "Value"])

df["Month"] = df["Date"].dt.to_period("M")

monthly = df.groupby(
    ["Month", "Country"]
)["Value"].sum().reset_index()

for country in monthly["Country"].unique():
    country_data = monthly[monthly["Country"] == country]

    plt.plot(
        country_data["Month"].astype(str),
        country_data["Value"],
        marker="o",
        label=country
    )

plt.title("Monthly Recorded Values by Country")
plt.xlabel("Month")
plt.ylabel("Recorded Value")
plt.xticks(rotation=45)
plt.legend()
plt.tight_layout()
plt.show()`
    },

    {
        title: "Country-Level Recorded Values",
        image: "graphs/conclusion3.png",
        notes: `
            <h3 class="notes-label">Country-Level Observation</h3>
            <p>This comparison highlights differences in recorded values between countries.</p>
            <ul>
                <li>Liberia has a high recorded value in the displayed comparison.</li>
                <li>Country differences may reflect outbreak patterns and the records included.</li>
                <li>Values should be interpreted using the dataset's measurement definition.</li>
            </ul>
        `,
        code: `import pandas as pd
import matplotlib.pyplot as plt

url = "https://raw.githubusercontent.com/plotly/datasets/master/2014_ebola.csv"
df = pd.read_csv(url)

df["Value"] = pd.to_numeric(df["Value"], errors="coerce")

country_values = df.groupby("Country")["Value"].sum()
country_values = country_values.sort_values(ascending=False)

country_values.plot(kind="bar", figsize=(10, 5))

plt.title("Recorded Values by Country")
plt.xlabel("Country")
plt.ylabel("Recorded Value")
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()`
    },

    {
        title: "Box Plot: Distribution by Country",
        image: "graphs/conclusion4.jpeg",
        notes: `
            <h3 class="notes-label">Box Plot Analysis</h3>
            <p>A box plot summarizes the distribution of recorded values for each country.</p>
            <ul>
                <li>The box represents the middle half of the observations.</li>
                <li>The line inside the box represents the median.</li>
                <li>Whiskers show the range covered by the box plot's rule; points beyond them may be outliers.</li>
                <li>An outlier deserves investigation but is not necessarily an error.</li>
            </ul>
        `,
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

plt.boxplot(data, tick_labels=countries)

plt.title("Distribution of Recorded Values by Country")
plt.xlabel("Country")
plt.ylabel("Recorded Value")
plt.xticks(rotation=20)
plt.tight_layout()
plt.show()`
    },

    {
        title: "Donut Chart: Outbreak Phases",
        image: "graphs/conclusion5.jpeg",
        notes: `
            <h3 class="notes-label">Donut Chart Analysis</h3>
            <p>The donut chart compares the share represented by each phase in the selected breakdown.</p>
            <ul>
                <li>The largest segment represents the largest share of the displayed total.</li>
                <li>Segment sizes make it easier to compare the relative contribution of each phase.</li>
                <li>The chart describes the breakdown but does not explain what caused the differences.</li>
            </ul>
            <p><strong>Note:</strong> Verify the phase totals against the original data before reporting percentages.</p>
        `,
        code: `import matplotlib.pyplot as plt

# Illustrative values only.
# Replace these with the exact values used in your original chart.

phases = [
    "March-April",
    "May-June",
    "July",
    "August-September"
]

values = [20, 248, 1054, 5005]

plt.figure(figsize=(9, 5))

plt.pie(
    values,
    labels=phases,
    autopct="%1.1f%%",
    startangle=90,
    wedgeprops={"width": 0.45}
)

plt.title("Historical Decomposition of the Ebola Outbreak")
plt.tight_layout()
plt.show()`
    },

    {
        title: "Scatter Plot: Month vs Value by Country",
        image: "graphs/conclusion6.jpeg",
        notes: `
            <h3 class="notes-label">Scatter Plot Analysis</h3>
            <p>This scatter plot compares monthly recorded values across five countries during 2014.</p>
            <ul>
                <li><strong>Guinea:</strong> The displayed values rise from March through September.</li>
                <li><strong>Liberia:</strong> The largest displayed point occurs in September, at approximately 3,360.</li>
                <li><strong>Sierra Leone:</strong> Values rise from May to September, reaching approximately 1,940.</li>
                <li><strong>Mali and Senegal:</strong> Their displayed points are close to zero in the months shown.</li>
                <li><strong>Overall:</strong> The graph highlights differences in the timing and magnitude of recorded values.</li>
            </ul>
            <p>These observations describe the displayed graph. A point near zero does not by itself prove that no cases occurred.</p>
        `,
        code: `import matplotlib.pyplot as plt

months = {
    "Mar": 3,
    "Apr": 4,
    "May": 5,
    "Jun": 6,
    "Jul": 7,
    "Aug": 8,
    "Sep": 9,
    "Oct": 10,
    "Nov": 11
}

# Approximate values read from the graph.
# Use the original data for exact values.

data = {
    "Guinea": {
        "Mar": 120,
        "Apr": 230,
        "May": 290,
        "Jun": 410,
        "Jul": 460,
        "Aug": 770,
        "Sep": 1020
    },
    "Liberia": {
        "Apr": 40,
        "May": 15,
        "Jun": 110,
        "Jul": 320,
        "Aug": 1390,
        "Sep": 3360
    },
    "Mali": {
        "Oct": 0,
        "Nov": 10
    },
    "Senegal": {
        "Aug": 0,
        "Sep": 0
    },
    "Sierra Leone": {
        "May": 50,
        "Jun": 240,
        "Jul": 530,
        "Aug": 1210,
        "Sep": 1940
    }
}

for country, values in data.items():
    x_values = []
    y_values = []

    for month, value in values.items():
        x_values.append(months[month])
        y_values.append(value)

    plt.scatter(
        x_values,
        y_values,
        label=country,
        s=70
    )

plt.title("Scatter Plot: Month vs Value by Country (2014)")
plt.xlabel("Month")
plt.ylabel("Value")

plt.xticks(
    list(months.values()),
    list(months.keys())
)

plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()`
    },

    {
        title: "Caseload Progression by Country (July–September 2014)",
        image: "graphs/conclusion7.jpeg",
        notes: `
            <h3 class="notes-label">Three-Month Caseload Comparison</h3>
            <p>This grouped bar chart compares recorded Ebola values across five countries from July to September 2014.</p>
            <ul>
                <li><strong>Liberia:</strong> Increased from 329 in July to 1,395 in August and 3,362 in September.</li>
                <li><strong>Sierra Leone:</strong> Rose from 533 to 1,216 and then 1,940.</li>
                <li><strong>Guinea:</strong> Increased from 460 to 771 and then 1,022.</li>
                <li><strong>Senegal:</strong> The displayed values were 0, 1 and 3.</li>
                <li><strong>Mali:</strong> The chart displays zero for all three months.</li>
            </ul>
            <p><strong>Conclusion:</strong> Liberia shows the largest increase in the displayed values, followed by Sierra Leone and Guinea. Interpret displayed zeros in the context of the source data.</p>
        `,
        code: `import matplotlib.pyplot as plt
import numpy as np

countries = [
    "Liberia",
    "Sierra Leone",
    "Guinea",
    "Senegal",
    "Mali"
]

july = [329, 533, 460, 0, 0]
august = [1395, 1216, 771, 1, 0]
september = [3362, 1940, 1022, 3, 0]

x = np.arange(len(countries))
width = 0.24

plt.figure(figsize=(13, 6))

plt.bar(x - width, july, width, label="July")
plt.bar(x, august, width, label="August")
plt.bar(x + width, september, width, label="September")

plt.title(
    "Caseload Progression by Country Across Late Summer "
    "(July-September 2014)"
)
plt.xlabel("Country Name")
plt.ylabel("Recorded Ebola Cases")
plt.xticks(x, countries)
plt.legend()
plt.grid(axis="y", linestyle=":", alpha=0.5)

plt.tight_layout()
plt.show()`
    }
];


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
        await navigator.clipboard.writeText(pythonCode.textContent);

        copyButton.textContent = "Copied!";

        setTimeout(function () {
            copyButton.textContent = "Copy Code";
        }, 1500);

    } catch (error) {
        copyButton.textContent = "Copy unavailable - select code manually";
    }
});


/* Display all eight graphs */

displayGraphs();
