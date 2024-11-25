/* eslint-env cypress */

describe("GenreSelect Component E2E Test", () => {
  const genres = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi"];

  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("renders all genres", () => {
    genres.forEach((genre) => {
      cy.contains(genre).should("exist");
    });
  });

  it("highlights the selected genre", () => {
    cy.get("button").contains("Comedy").click();
    cy.get("button").contains("Comedy").should("have.class", "selected");
  });

  it("calls onSelect callback with the correct genre on click", () => {
    cy.get("button").contains("Horror").click();
    cy.get("#selected-genre").should("contain", "Selected Genre: Horror");
  });
});
