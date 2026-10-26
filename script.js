const graphs = [
    {
        title: "Geographic Distribution",
        image: "graphs/graph1.jpg",
        layout: "first",
        notes: "",
        code: ""
    },

    {
        title: "Monthly Recorded Values",
        image: "graphs/conclusion2a.jpg",
        layout: "research",
        notes: `
            <h3 class="notes-label">Monthly Pattern</h3>
            <p>The monthly view helps show how recorded Ebola values changed over time.</p>
            <ul>
                <li>Compare values across months to identify increases and decreases.</li>
                <li>A rise may indicate a period of greater reported outbreak activity.</li>
                <li>Missing observations should be considered before interpreting totals.</li>
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
        layout: "research",
        notes: `
            <h3 class="notes-label">Country Comparison</h3>
            <p>Comparing countries helps reveal differences in recorded values over time.</p>
            <ul>
                <li>Countries can show different levels and changes during the same period.</li>
                <li>A sharp increase in one country can stand out from other trends.</li>
                <li>Reporting differences and missing observations should be considered.</li>
            </ul>
        `,
        code: `import pandas as pd
import matplotlib.pyplot as plt

url = "https://raw.githubusercontent.com/plotly/datasets/master/2014_ebola.csv"
df = pd.read_csv(url)

df["Date"] = pd.to_datetime(df["Date"], errors="coerce")
df["Value"] = pd.to_numeric(df["Value"], errors="coerce")
df = df.dropna(subset=["Date", "Value"])

monthly = df.groupby(
    [df["Date"].dt.to_period("M"), "Country"]
)["Value"].sum().reset_index()

monthly["Date"] = monthly["Date"].astype(str)

for country in monthly["Country"].unique():
    country_data = monthly[monthly["Country"] == country]
    plt.plot(
        country_data["Date"],
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
        layout: "research",
        notes: `
            <h3 class="notes-label">Country-Level Observation</h3>
            <p>The comparison highlights differences in recorded values among countries.</p>
            <ul>
                <li>Liberia has a high recorded value in the displayed comparison.</li>
                <li>Differences may reflect outbreak patterns and the records included.</li>
                <li>Interpret values according to the dataset's measurement definition.</li>
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
        layout: "research",
        notes: `
            <h3 class="notes-label">Box Plot Analysis</h3>
            <p>The box plot compares the distribution of recorded values across countries.</p>
            <ul>
                <li>Liberia shows a potential high outlier, separated from many of its other recorded values.</li>
                <li>Differences in boxes and whiskers indicate variation in the distributions.</li>
                <li>An outlier is worth investigating but is not necessarily an error.</li>
                <li>Near-zero values do not automatically mean there were no cases.</li>
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
        layout: "research",
        notes: `
            <h3 class="notes-label">Donut Chart Analysis</h3>
            <p>The chart divides the displayed total across the outbreak phases used in the visualization.</p>
            <ul>
                <li>The August–September segment represents the largest share in the displayed breakdown.</li>
                <li>This highlights the concentration of the displayed total in the final phase.</li>
                <li>The chart describes the phase totals but does not establish the cause of the increase.</li>
            </ul>
            <p><strong>Note:</strong> Verify the phase totals against the original data before reporting percentages.</p>
        `,
        code: `import matplotlib.pyplot as plt

# Illustrative values only.
# Replace them with the exact totals used in your original chart.
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
        layout: "research",
        notes: `
            <h3 class="notes-label">Scatter Plot Analysis</h3>
            <p>This scatter plot compares recorded values across months for five countries during 2014.</p>
            <ul>
                <li><strong>Guinea:</strong> The plotted values rise from March through September, with a noticeable increase in August and September.</li>
                <li><strong>Liberia:</strong> The largest displayed point occurs in September, at approximately 3,360.</li>
                <li><strong>Sierra Leone:</strong> The plotted values rise from May to September, reaching approximately 1,940 in September.</li>
                <li><strong>Mali and Senegal:</strong> Their displayed points are near zero in the months shown.</li>
                <li><strong>Overall:</strong> The chart highlights differences in the timing and magnitude of recorded values across countries.</li>
            </ul>
            <p>These are observations from the displayed graph. A point near zero does not by itself prove that no cases occurred.</p>
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

# Approximate values read from the displayed graph.
# Use the original dataset for exact values.

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

    plt.scatter(x_values, y_values, label=country, s=70)

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
    }
];


/* Get website elements */

const gallery = document.getElementById("gallery");
const viewer = document.getElementById("viewer");
const largeGraph = document.getElementById("largeGraph");
const viewerNotes = document.getElementById("viewerNotes");
const viewerResearch = document.getElementById("viewerResearch");
const closeButton = document.getElementById("closeButton");
const viewCodeButton = document.getElementById("viewCodeButton");
const codePanel = document.getElementById("codePanel");
const pythonCode = document.getElementById("pythonCode");
const copyButton = document.getElementById("copyButton");


/* Create graph cards */

function displayGraphs() {
    gallery.innerHTML = "";

    graphs.forEach(function (graph, index) {
        const card = document.createElement("article");

        if (graph.layout === "first") {
            card.className = "graph-card first-card";

            card.innerHTML = `
                <img src="${graph.image}" alt="${graph.title}">
            `;
        } else {
            card.className = "graph-card";

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

        card.addEventListener("click", function () {
            openViewer(index);
        });

        gallery.appendChild(card);
    });
}


/* Open enlarged graph */

function openViewer(index) {
    const graph = graphs[index];

    largeGraph.src = graph.image;
    largeGraph.alt = graph.title;

    viewerNotes.innerHTML = graph.notes;
    viewerNotes.hidden = graph.layout === "first";

    viewerResearch.style.gridTemplateColumns =
        graph.layout === "first"
            ? "1fr"
            : "minmax(0, 1.4fr) minmax(0, 0.8fr)";

    pythonCode.textContent = graph.code;
    codePanel.hidden = true;

    viewCodeButton.hidden = graph.code.trim() === "";
    viewCodeButton.textContent = "View Code";

    viewer.classList.add("active");
    viewer.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
}


/* Close enlarged graph */

function closeViewer() {
    viewer.classList.remove("active");
    viewer.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
    codePanel.hidden = true;
}

closeButton.addEventListener("click", closeViewer);


/* Close when clicking the dark background */

viewer.addEventListener("click", function (event) {
    if (event.target === viewer) {
        closeViewer();
    }
});


/* Close using Escape */

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeViewer();
    }
});


/* Show or hide Python code */

viewCodeButton.addEventListener("click", function () {
    codePanel.hidden = !codePanel.hidden;

    if (codePanel.hidden) {
        viewCodeButton.textContent = "View Code";
    } else {
        viewCodeButton.textContent = "Hide Code";

        codePanel.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    }
});


/* Copy Python code */

copyButton.addEventListener("click", async function () {
    try {
        await navigator.clipboard.writeText(pythonCode.textContent);

        copyButton.textContent = "Copied!";

        setTimeout(function () {
            copyButton.textContent = "Copy Code";
        }, 1500);

    } catch (error) {
        copyButton.textContent = "Select and Copy";
    }
});


/* Display cards when the page loads */

displayGraphs();
