// Counters.cy.js
describe("Counters Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000"); // Adjust this if your app URL differs
  });

  it("should display the initial count value", () => {
    cy.get("#count-value").should("exist"); // Ensure element is there
    cy.get("#count-value").should(($h2) => {
      const text = $h2.text();
      expect(text).to.match(/Count: \d+/); // Check for "Count: <number>"
      expect(Number(text.replace("Count: ", ""))).to.not.be.NaN;
    });
  });

  it("should increment the count value on clicking Increment", () => {
    cy.get("#count-value")
      .invoke("text")
      .then((initialText) => {
        const initialCount = parseInt(initialText.replace("Count: ", ""), 10);
        cy.get("button").contains("Increment").click();
        cy.get("#count-value").should("contain", `Count: ${initialCount + 1}`);
      });
  });

  it("should decrement the count value on clicking Decrement", () => {
    cy.get("#count-value")
      .invoke("text")
      .then((initialText) => {
        const initialCount = parseInt(initialText.replace("Count: ", ""), 10);
        cy.get("button").contains("Decrement").click();
        cy.get("#count-value").should("contain", `Count: ${initialCount - 1}`);
      });
  });
});
