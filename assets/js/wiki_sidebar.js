// Create a Wikipedia style sidebar from the information given in the object wiki_sidebar.
if (typeof wiki_sidebar === "undefined") {
    throw new Error("wiki_sidebar is not defined, but this script has been declared in the HTML file.");
}

const sidebar = document.createElement("div");
sidebar.id = "wiki_sidebar";
sidebar.classList.add("sidebar");

if (wiki_sidebar.title) {
    const title = document.createElement("h2");
    title.textContent = wiki_sidebar.title;
    sidebar.appendChild(title);
}

// A list of pictures, with titles to toggle between them.
if (wiki_sidebar.pictures && wiki_sidebar.pictures.length > 0) {
    const picture_div = document.createElement("div");
    picture_div.classList.add("wiki_sidebar_picture");

    // Create a div for the list of the titles of the pictures.
    const picture_titles = document.createElement("div");
    picture_titles.classList.add("wiki_sidebar_picture_titles");
    picture_div.appendChild(picture_titles);

    const picture_img = document.createElement("img");
    picture_img.src = wiki_sidebar.pictures[0].src;
    picture_img.alt = wiki_sidebar.pictures[0].name;
    picture_div.appendChild(picture_img);

    const picture_subtext = document.createElement("div");
    picture_subtext.classList.add("wiki_sidebar_picture_subtext");
    picture_subtext.textContent = wiki_sidebar.pictures[0].subtext || "";
    picture_subtext.style.display = wiki_sidebar.pictures[0].subtext ? "block" : "none";

    for(const picture of wiki_sidebar.pictures) {
        const picture_title = document.createElement("div");
        picture_title.classList.add("wiki_sidebar_picture_title");

        picture_title.textContent = picture.name || 'Default';
        picture_title.onclick = () => {
            picture_img.src = picture.src;
            picture_img.alt = picture.name || 'Default';

            picture_subtext.innerText     = picture.subtext === null ? "" : picture.subtext;
            picture_subtext.style.display = picture.subtext === null ? "none" : "block";
        }
        picture_titles.appendChild(picture_title);
    }

    sidebar.appendChild(picture_div);
}

// A list of facts about the subject.
if (wiki_sidebar.factlist) {
    const factlist = document.createElement("div");
    factlist.classList.add("wiki_sidebar_factlist");

    for (const fact of wiki_sidebar.factlist) {
        if (fact.style === "dividor") {
            const dividor = document.createElement("div");
            dividor.classList.add("wiki_sidebar_fact_dividor");

            if (fact.title) {
                dividor.textContent = fact.title;
            }

            factlist.appendChild(dividor);
        }
        else {
            const fact_div = document.createElement("div");
            fact_div.classList.add("wiki_sidebar_fact");

            const fact_title = document.createElement("div");
            fact_title.classList.add("wiki_sidebar_fact_title");
            fact_title.textContent = fact.title;

            const fact_value = document.createElement("div");
            fact_value.classList.add("wiki_sidebar_fact_value");
            fact_value.textContent = fact.value;

            fact_div.appendChild(fact_title);
            fact_div.appendChild(fact_value);

            factlist.appendChild(fact_div);
        }
    }

    sidebar.appendChild(factlist);
}

// Find the #git-wiki-content element, find the h1 element, and insert the sidebar after it.
const content = document.getElementById("git-wiki-content");
if (!content) { throw new Error("Could not find the #git-wiki-content element."); }

const h1 = content.querySelector("h1");
content.insertBefore(sidebar, h1.nextSibling);