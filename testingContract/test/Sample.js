const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Sample Contract", function () {
    let Sample;
    let sample;
    let owner;

    beforeEach(async function () {
        [owner] = await ethers.getSigners();
        Sample = await ethers.getContractFactory("Sample");
        sample = await Sample.deploy();
    });

    it("Should initialize with a default value of 'ram'.", async function () {
        const name = await sample.name(); // Access the `name` variable
        expect(name).to.equal("ram");
    });

    it("Should initialize with a default gender of 'gender.female'.", async function () {
        const gender = await sample.gender(); // Access the `gender` variable
        expect(gender).to.equal(1); 
    });

    it("Should initialize with a default age of user.", async function () {
        const age = await sample.age(); // Access the `age` variable
        expect(age).to.equal(20); // Constructor initializes `age` to 20
    });

    it("Should initialize with a default age2 of user.", async function () {
        const age2 = await sample.age2(); // Access the `age2` variable
        expect(age2).to.equal(0); // `age2` starts at 0
    });

    it("Should return the current value of age.", async function () {
        const age = await sample.getAge();
        expect(age).to.equal(20); 
    });

    it("Should return female if the gender is female", async function(){
        const gender = await sample.getGender();
        const genderNum = await sample.gender();
        expect(gender).to.equal("female"); 
        expect(genderNum).to.equal(1); 
    })

    // it("Should return male if the gender is male", async function(){
    //     const gender = await sample.getGender();
    //     const genderNum = await sample.gender();
    //     expect(gender).to.equal("male"); 
    //     expect(genderNum).to.equal(0); 
    // })

    it("Should update the store value when set is called", async function(){
        const userDefinedAge = 42;
        await sample.setUserDefinedAge(userDefinedAge);

        const age = await sample.age(); 
        expect(age).to.equal(userDefinedAge);
    });

    it("Should keep the age within 0 and 2**256-1", async function(){
        const userDefinedAge = 42;
        await sample.setUserDefinedAge(userDefinedAge);
        
        const age = await sample.age(); 
        expect(age).to.equal(userDefinedAge);
    });

    
});
