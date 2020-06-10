
context("Simple test", () => {

    it("Successful Login Test", () => {
        cy.visit('http://localhost:3000/');


        cy.get("#formBasicEmail").type("Mariano");
        cy.get("#formBasicPassword").type("123456");

        cy.get(".btn").click();

        cy.get(".navbar").should("exist")
    });

    it("Unsuccessful Login Test", () => {
        cy.visit('http://localhost:3000/');


        cy.get("#formBasicEmail").type("will not pass");
        cy.get("#formBasicPassword").type("1234");

        cy.get(".btn").click();

        cy.get("#errorMessage").should("exist").and("have.text", "An error ocurred when trying to login")
    });

    it("Successful transaction", () => {
        cy.visit('http://localhost:3000/');
        cy.get("#formBasicEmail").type("Lautaro");
        cy.get("#formBasicPassword").type("123456");
        cy.get(".btn").click();

        cy.get("#beginTransactionButton").click();
        cy.get("#Mariano_selector").click();
        cy.get("#moneyAmountInput").type("1");
        cy.get("#transferMoneyButton").click();

        cy.get("#beginTransactionButton").should("exist");
    });

    it("Negative money is not transfered", () => {
        cy.visit('http://localhost:3000/');
        cy.get("#formBasicEmail").type("Matias");
        cy.get("#formBasicPassword").type("123456");
        cy.get(".btn").click();

        cy.get("#beginTransactionButton").click();
        cy.get("#Mariano_selector").click();
        cy.get("#moneyAmountInput").type("-1");
        cy.get("#transferMoneyButton").click();

        cy.get("#beginTransactionButton").should("not.exist");
    });

    it("Test money amount input cannot type anything except positive numbers", () => {
        cy.visit('http://localhost:3000/');
        cy.get("#formBasicEmail").type("Juan Cruz");
        cy.get("#formBasicPassword").type("123456");
        cy.get(".btn").click();

        cy.get("#beginTransactionButton").click();
        cy.get("#Mariano_selector").click();
        cy.get("#moneyAmountInput").type("test").should("have.value", '');
    })
});
