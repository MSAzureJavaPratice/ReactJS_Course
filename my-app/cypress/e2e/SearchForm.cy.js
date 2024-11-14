/* eslint-env cypress */

describe("SearchForm Component E2E Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000"); // Replace with your application's URL
  });

  it("displays the initial search query", () => {
    cy.get('input[placeholder="Search..."]').should(
      "have.value",
      "Search here"
    );
  });

  it("updates the displayed query when searching via button click", () => {
    cy.get('input[placeholder="Search..."]').clear().type("new query");
    cy.get("button").contains("Search").click();

    cy.get("#search-result").should("contain", "Search Query: new query");
  });

  it("updates the displayed query when searching via Enter key press", () => {
    cy.get('input[placeholder="Search..."]')
      .clear()
      .type("another query{enter}");

    cy.get("#search-result").should("contain", "Search Query: another query");
  });
});
