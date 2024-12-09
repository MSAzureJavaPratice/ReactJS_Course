describe("Counter Component E2E Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("displays the initial counter value", () => {
    cy.get("#count-value").should("contain", "Count: 0");
  });

  it('increments the counter value on "Increment" button click', () => {
    cy.get("#count-value")
      .invoke("text")
      .then((text) => {
        const initialValue = parseInt(text, 10);
        cy.get("button").contains("Increment").click();
        cy.get("#count-value").should("contain", initialValue + 1);
      });
  });

  it('decrements the counter value on "Decrement" button click', () => {
    cy.get("#count-value")
      .invoke("text")
      .then((text) => {
        const initialValue = parseInt(text, 10);
        cy.get("button").contains("Decrement").click();
        cy.get("#count-value").should("contain", initialValue - 1);
      });
  });
});
