const {expect} = require("chai");
const {ethers} = require("hardhat");

describe("SimpleStorage Cintract", function(){
    let SimpleStorage;
    let simpleStorage;
    let owner;

    this.beforeEach(async function(){
        [owner] = await ethers.getSigners();
        SimpleStorage = await ethers.getContractFactory("SimpleStorage");
        simpleStorage = await SimpleStorage.deploy();
    });

    it("Should initialize with a default value of zero.", async function(){
        const storedValue = await simpleStorage.get(); 
        expect(storedValue).to.equal(0);
    });

    it("Should initialize with empty string.", async function(){
        const storedString = await simpleStorage.get();
        expect(storedString).to.equal("");
    });
    
    it("Should update the store value when set is called", async function(){
        const newValue = 42;
        await simpleStorage.set(newValue);

        const storedValue = await simpleStorage.get();
        console.log("storedValue", storedValue);
        expect(storedValue).to.equal(newValue);
    });

    // it("Should allow multiple updates to the stored value", async function(){
    //     await simpleStorage.set(10);
    //     expect(await simpleStorage.get().to.equal.(10));

    //     await simpleStorage.set(90);
    //     expect(await simpleStorage.get().to.equal(10));

    // });
})