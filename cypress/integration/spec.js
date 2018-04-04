describe("Braniac Cards", function() {
  it("should work", function() {
    cy.visit("http://localhost:3000/");
    cy.get("Button"),
      { multiple: true }
        .click()
        .eq(0)
        .should("contain", "100 Words Every High School Graduate Should Know");
    cy
      .get("btn-lg")
      .eq(0)
      .click();
    cy
      .get("input")
      .eq(0)
      .type("Test");
    cy.get("#add-button").click();
    cy.wait(500);
    cy
      .get(".modal-open")
      .eq(2)
      .click();
  });
});
