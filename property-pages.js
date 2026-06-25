(() => {
  const properties = Array.isArray(window.BAACO_PROPERTY_DATA) ? window.BAACO_PROPERTY_DATA : [];

  const propertyMap = properties.reduce((acc, property) => {
    acc[property.slug] = property;
    return acc;
  }, {});

  const createMarkup = (property) => `
    <article class="mosaic-card ${property.cardClass || ""}">
      <a class="mosaic-card-link" href="property-detail.html?slug=${property.slug}" aria-label="View details for ${property.name}, ${property.location}">
        <img class="mosaic-photo-image" src="${property.image}" alt="${property.name}, ${property.location}" />
        <span class="mosaic-card-overlay">
          <span class="mosaic-card-badge">${property.cardLabel}</span>
        </span>
      </a>
      <div class="mosaic-meta">
        <h3>${property.name}</h3>
        <p>${property.location}</p>
      </div>
    </article>
  `;

  const renderPropertiesGrid = () => {
    const grid = document.getElementById("propertiesGrid");
    if (!grid || !properties.length) {
      return;
    }

    grid.innerHTML = properties.map(createMarkup).join("");
  };

  const renderPropertyDetail = () => {
    const detailPage = document.getElementById("propertyDetailPage");
    if (!detailPage) {
      return;
    }

    const slug = new URLSearchParams(window.location.search).get("slug");
    const property = slug ? propertyMap[slug] : null;

    if (!property) {
      document.getElementById("propertyHeroTitle").textContent = "Property Not Found";
      document.getElementById("propertyDetailName").textContent = "We couldn't find that property.";
      document.getElementById("propertyDetailLocation").textContent = "Please return to the portfolio and choose another property.";
      document.getElementById("propertyDescription").innerHTML = "<p>The requested property page is unavailable or the link is incomplete.</p>";
      document.getElementById("propertyFactsGrid").innerHTML = "";
      document.getElementById("propertyHighlightsGrid").innerHTML = "";
      return;
    }

    document.title = `BAACO Properties | ${property.name}`;
    document.getElementById("propertyHeroType").textContent = property.cardLabel;
    document.getElementById("propertyHeroTitle").textContent = property.name;
    document.getElementById("propertyDetailLabel").textContent = property.type;
    document.getElementById("propertyDetailName").textContent = property.name;
    document.getElementById("propertyDetailLocation").textContent = `${property.location} | ${property.size} | ${property.type}`;

    const detailImage = document.getElementById("propertyDetailImage");
    detailImage.src = property.image;
    detailImage.alt = `${property.name}, ${property.location}`;

    document.getElementById("propertyDescription").innerHTML = property.description
      .map((paragraph) => `<p>${paragraph}</p>`)
      .join("");

    document.getElementById("propertyFactsGrid").innerHTML = property.facts
      .map(
        (fact) => `
          <div class="property-fact-item">
            <span class="property-fact-label">${fact.label}</span>
            <span class="property-fact-value">${fact.value}</span>
          </div>
        `
      )
      .join("");

    document.getElementById("propertyHighlightsGrid").innerHTML = property.highlights
      .map(
        (highlight) => `
          <div class="property-highlight-card">
            <span class="property-highlight-label">${highlight.label}</span>
            <p>${highlight.value}</p>
          </div>
        `
      )
      .join("");
  };

  renderPropertiesGrid();
  renderPropertyDetail();
})();
