describe("Sudoku App", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("redirects to page with first sudoku", () => {
    cy.url().should("include", "/sudoku/178dfdf5-fb55-4964-b9d0-7df7940206af");
  });

  it("renders the first sudoku", () => {
    cy.get("h3").should("contain.text", "Sudoku");
    cy.get('[title="Cell 0, 0"]').should("have.text", "2");
    cy.get('[title="Cell 8, 0"]').should("have.text", "");
  });

  it("can navigate to a different sudoku", () => {
    cy.get('[title="Next"]').click();
    cy.url().should("include", "sudoku/2fdb7968-4c74-48e1-a8e9-e1ebd91f7dfa");
    cy.get('[title="Cell 0, 0"]').should("have.text", "8");
    cy.get('[title="Cell 8, 0"]').should("have.text", "3");
  });

  it("selecting empty cell highlights groups and updates value picker", () => {
    cy.get('[title="Cell 4, 0"]').click();
    cy.get('[title="Cell 4, 0"]').should("have.class", "bg-sky-200"); // selected cell
    cy.get('[title="Cell 4, 8"]').should("have.class", "bg-sky-50"); // row
    cy.get('[title="Cell 5, 1"]').should("have.class", "bg-sky-50"); // column
    cy.get('[title="Cell 8, 0"]').should("have.class", "bg-sky-50"); // block
    cy.get('[title="Cell 0, 3"]').should("have.class", "bg-background"); // other empty cell

    cy.get('[title="Erase"]').should("be.disabled");
    cy.get('[title="Set value as 1"]').should("not.be.disabled");
  });

  it("selecting pre-filled cell highlights groups and updates value picker", () => {
    cy.get('[title="Cell 3, 4"]').click();
    cy.get('[title="Cell 3, 4"]').should("have.class", "bg-sky-200"); // selected cell
    cy.get('[title="Cell 0, 1"]').should("have.class", "bg-sky-100"); // same value

    cy.get('[title="Erase"]').should("be.disabled");
    cy.get('[title="Set value as 1"]').should("be.disabled");
  });

  it("selecting empty cell and then a value updates the cell", () => {
    cy.get('[title="Cell 4, 0"]').click();
    cy.get('[title="Set value as 1"]').click();
    cy.get('[title="Cell 4, 0"]').should("have.text", "1");
    cy.get('[title="Cell 4, 0"]').should("have.class", "text-sky-700");

    cy.get('[title="Erase"]').should("be.not.disabled");
    cy.get('[title="Set value as 1"]').should("have.class", "bg-primary"); // selected value
    cy.get('[title="Set value as 2"]').should("have.class", "bg-secondary"); // other value
  });

  it("selecting empty cell and then a conflicting value shows error", () => {
    cy.get('[title="Cell 4, 0"]').click();
    cy.get('[title="Set value as 2"]').click();
    cy.get('[title="Cell 4, 0"]').should("have.text", "2");
    cy.get('[title="Cell 4, 0"]').should("have.class", "text-red-500");
    cy.get('[title="Cell 0, 0"]').should("have.class", "bg-red-100");
  });

  it("play sudoku", () => {
    // navigate to sudoku 4
    cy.get('[title="Next"]').click();
    cy.get('[title="Cell 0, 0').should("have.text", "8");
    cy.get('[title="Next"]').click();
    cy.get('[title="Cell 0, 0').should("have.text", "5");
    cy.get('[title="Next"]').click();
    cy.get('[title="Cell 0, 0').should("have.text", "6");

    // set values
    cy.get('[title="Cell 0, 3"]').click();
    cy.get('[title="Set value as 9"]').click();

    cy.get('[title="Cell 0, 6"]').click();
    cy.get('[title="Set value as 7"]').click();

    cy.get('[title="Cell 1, 0"]').click();
    cy.get('[title="Set value as 1"]').click();

    cy.get('[title="Cell 1, 1"]').click();
    cy.get('[title="Set value as 9"]').click();

    cy.get('[title="Cell 1, 2"]').click();
    cy.get('[title="Set value as 7"]').click();

    cy.get('[title="Cell 2, 3"]').click();
    cy.get('[title="Set value as 7"]').click();

    cy.get('[title="Cell 2, 6"]').click();
    cy.get('[title="Set value as 4"]').click();

    cy.get('[title="Cell 2, 8"]').click();
    cy.get('[title="Set value as 9"]').click();

    cy.get('[title="Cell 3, 2"]').click();
    cy.get('[title="Set value as 6"]').click();

    cy.get('[title="Cell 4, 6"]').click();
    cy.get('[title="Set value as 9"]').click();

    cy.get('[title="Cell 4, 8"]').click();
    cy.get('[title="Set value as 7"]').click();

    cy.get('[title="Cell 5, 1"]').click();
    cy.get('[title="Set value as 7"]').click();

    cy.get('[title="Cell 5, 2"]').click();
    cy.get('[title="Set value as 9"]').click();

    cy.get('[title="Cell 5, 5"]').click();
    cy.get('[title="Set value as 2"]').click();

    cy.get('[title="Cell 5, 7"]').click();
    cy.get('[title="Set value as 3"]').click();

    cy.get('[title="Cell 6, 0"]').click();
    cy.get('[title="Set value as 7"]').click();

    cy.get('[title="Cell 6, 2"]').click();
    cy.get('[title="Set value as 2"]').click();

    cy.get('[title="Cell 6, 5"]').click();
    cy.get('[title="Set value as 4"]').click();

    cy.get('[title="Cell 6, 6"]').click();
    cy.get('[title="Set value as 2"]').click(); // conflict

    cy.get('[title="Cell 6, 6"]').click();
    cy.get('[title="Set value as 3"]').click(); // solves conflict

    cy.contains("Congratulations!").should("exist");
  });
});
