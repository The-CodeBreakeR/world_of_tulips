var WorldOfTulips = artifacts.require("WorldOfTulips");

contract('WorldOfTulips0', function(accounts) {
    it("checking god's plan", async () => {
        let world = await WorldOfTulips.deployed();

        let underGroundBulbNum1 = await world.getUnderGroundBulbNum();
        let nextMiracleBlock1 = await world.getNextMiracleBlock();

        await world.miracle();

        let underGroundBulbNum2 = await world.getUnderGroundBulbNum();
        let nextMiracleBlock2 = await world.getNextMiracleBlock();

        assert.equal(underGroundBulbNum1.toNumber() + 1, underGroundBulbNum2.toNumber(), "new bulb was not added after miracle");
        assert.notEqual(nextMiracleBlock1.toNumber(), nextMiracleBlock2.toNumber(), "time for next miracle did not change");
    });
});

contract('WorldOfTulips1', function(accounts) {
    it("checking the life cycle of tulip", async () => {
        let world = await WorldOfTulips.deployed();

        let underGroundBulbNum1 = await world.getUnderGroundBulbNum();
        let tx1 = await world.digToFindBulb({from: accounts[2]});
        let underGroundBulbNum2 = await world.getUnderGroundBulbNum();
        assert.equal(tx1.logs[0].event, "Generation0BulbFound", "the event wasn't as expected");
        assert.equal(tx1.logs[0].args.bulbOwner, accounts[2], "the bulb owner was not the digger");
        assert.equal(tx1.logs[0].args.bulbID.toNumber(), 1, "bulb id was not as expected (1)");
        assert.equal(underGroundBulbNum1.toNumber() - 1, underGroundBulbNum2.toNumber(), "num of under ground bulbs did not decrease after successful digging");

        let tulip1 = await world.getTulip(1);
        assert.equal(tulip1[0], accounts[2], "the bulb owner was not accounts[2]");
        assert.equal(tulip1[1].toNumber(), 0, "generation of the digged bulb was not 0");
        assert.equal(tulip1[2].toNumber(), 0, "motherID of the digged bulb was not 0");
        assert.equal(tulip1[3].toNumber(), 0, "stage of the recently digged bulb was not Bulb (0)");
        assert.equal(tulip1[4].toNumber(), 0, "R was not 0");
        assert.equal(tulip1[5].toNumber(), 0, "G was not 0");
        assert.equal(tulip1[6].toNumber(), 0, "B was not 0");
        assert.equal(tulip1[7].toNumber(), 0, "plantingTime of a bulb should be 0, it was not");
        assert.equal(tulip1[8].toNumber(), 0, "nextReproductionBlock of a bulb should be 0, it was not");

        await world.plantBulb(1, {from: accounts[2]});

        let tulip2 = await world.getTulip(1);
        assert.equal(tulip2[3].toNumber(), 1, "stage of the tulip (planted bulb) was not Planted (1)");
        assert.notEqual(tulip2[7].toNumber(), 0, "plantingTime of a tulip should not be 0, it was");
        assert.notEqual(tulip2[8].toNumber(), 0, "nextReproductionBlock of a tulip should not be 0, it was");

        let isTulipDefined = await world.isTulipDefined(1);
        assert.equal(isTulipDefined, true, "tulip #1 should have been defined");

        let isReadyForHarvest = await world.isReadyForHarvest(1);
        assert.equal(isReadyForHarvest, false, "tulip #1 should not be legitimately ready for harvest, however for the purpose of testing, we have removed the regarding checkings");

        let tx2 = await world.gatherDaughterBulbs(1, {from: accounts[2]});
        assert.equal(tx2.logs.length, 2, "tulip #1 was in Planted stage before gathering, so it should produce 2 bulbs");
        assert.equal(tx2.logs[0].event, "DaughterBulbGathered", "the first event wasn't as expected");
        assert.equal(tx2.logs[1].event, "DaughterBulbGathered", "the second event wasn't as expected");
        assert.equal(tx2.logs[0].args.bulbOwner, accounts[2], "the bulb owner was not equivalent to the owner of the mother");
        assert.equal(tx2.logs[0].args.bulbID.toNumber(), 2, "bulb id was not as expected (2)");

        let tulip3 = await world.getTulip(1);
        assert.equal(tulip3[3].toNumber(), 2, "mother should be old, it was not");
        assert.notEqual(tulip3[8].toNumber(), tulip2[8].toNumber(), "nextReproductionBlock of the mother should be modified, it was not");

        let tulip4 = await world.getTulip(2);
        assert.equal(tulip4[0], accounts[2], "the bulb owner was not accounts[2]");
        assert.equal(tulip4[1].toNumber(), 1, "generation of the gathered bulb was not 1");
        assert.equal(tulip4[2].toNumber(), 1, "motherID of the gathered bulb was not 1");
        assert.equal(tulip4[3].toNumber(), 0, "stage of the recently gathered bulb was not Bulb (0)");
        assert.equal(tulip4[4].toNumber(), 253, "R was not 253");
        assert.equal(tulip4[5].toNumber(), 253, "G was not 253");
        assert.equal(tulip4[6].toNumber(), 253, "B was not 253");
        assert.equal(tulip4[7].toNumber(), 0, "plantingTime of a bulb should be 0, it was not");
        assert.equal(tulip4[8].toNumber(), 0, "nextReproductionBlock of a bulb should be 0, it was not");

        let tx3 = await world.gatherDaughterBulbs(1, {from: accounts[2]});
        assert.equal(tx3.logs.length, 1, "tulip #1 was in old stage before gathering, so it should produce 1 bulb");
        assert.equal(tx3.logs[0].event, "DaughterBulbGathered", "the first event wasn't as expected");
        assert.equal(tx3.logs[0].args.bulbOwner, accounts[2], "the bulb owner was not equivalent to the owner of the mother");
        assert.equal(tx3.logs[0].args.bulbID.toNumber(), 4, "bulb id was not as expected (4)");

        let tulip5 = await world.getTulip(1);
        assert.equal(tulip5[3].toNumber(), 2, "mother should be old, it was not");
        assert.notEqual(tulip5[8].toNumber(), tulip3[8].toNumber(), "nextReproductionBlock of the mother should be modified, it was not");
    });
});

contract('WorldOfTulips2', function(accounts) {
    it("checking market operations", async () => {
        let world = await WorldOfTulips.deployed();

        // It has been checked in the previous test scenario that the next four transactions can be made
        await world.digToFindBulb({from: accounts[2]});
        await world.plantBulb(1, {from: accounts[2]});
        await world.gatherDaughterBulbs(1, {from: accounts[2]});
        await world.gatherDaughterBulbs(1, {from: accounts[2]});

        let tx1 = await world.submitRequest(1, 10, 2000000000, {from: accounts[2]});
        assert.equal(tx1.logs.length, 1, "exactly one event should be emitted by submitRequest function");
        assert.equal(tx1.logs[0].event, "RequestAdded", "the event wasn't as expected");
        assert.equal(tx1.logs[0].args.requestID.toNumber(), 1, "this is the first request, request ID was not 1");
        assert.equal(tx1.logs[0].args.tulipID.toNumber(), 1, "the tulip id was not 1");
        assert.equal(tx1.logs[0].args.requestMaker, accounts[2], "request maker wasn't accounts[2]");

        let req1 = await world.getRequest(1, {from: accounts[5]});
        assert.equal(req1[0].toNumber(), 1, "tulip id of the request wasn't 1, it should have been");
        assert.equal(req1[1].toNumber(), 10, "price of the request wasn't 10, it should have been");
        assert.equal(req1[2].toNumber(), 2000000000, "deadline of the request wasn't 2000000000, it should have been");

        let isdef1 = await world.isRequestDefined(1);
        assert.ok(isdef1, "req #1 is defined, but here it says it is not");
        let isdef2 = await world.isRequestDefined(2);
        assert.equal(isdef2, false, "req #2 is not defined, but here it says it is");

        let isclo1 = await world.isRequestClosed(1);
        assert.equal(isclo1, false, "req #1 is not closed, but here it says it is");

        await world.closeRequest(1, {from: accounts[2]});

        let isclo2 = await world.isRequestClosed(1);
        assert.ok(isclo2, "req #1 is closed, but here it says it is not");

        let tx2 = await world.submitRequest(1, 15, 2000000000, {from: accounts[2]});

        let errorHappened1 = false;
        try {
            await world.buyTulip(2, {from: accounts[3], value: 14});
        } catch (e) {
            errorHappened1 = true;
        }
        assert.ok(errorHappened1, "someone sent an offer to buy tulip without paying enough moeny and got through with it");

        let reqsOfAcc2 = await world.getAllOwnedOpenRequestIDs(accounts[2]);
        assert.equal(reqsOfAcc2.length, 1, "number of open requests owned by accounts[2] was not 1");

        let reqsOfRest = await world.getOthersOpenRequestIDs(accounts[2]);
        assert.equal(reqsOfRest.length, 0, "number of open requests owned by other than accounts[2] was not 0");

        let tx3 = await world.buyTulip(2, {from: accounts[3], value: 20});
        assert.equal(tx3.logs.length, 1, "exactly one event should be emitted by buyTulip function");
        assert.equal(tx3.logs[0].event, "TulipBought", "the event wasn't as expected");
        assert.equal(tx3.logs[0].args.requestID.toNumber(), 2, "this is the second request, request ID was not 2");
        assert.equal(tx3.logs[0].args.tulipID.toNumber(), 1, "the tulip id was not 1");
        assert.equal(tx3.logs[0].args.seller, accounts[2], "seller wasn't accounts[2]");
        assert.equal(tx3.logs[0].args.buyer, accounts[3], "buyer wasn't accounts[3]");

        let isclo3 = await world.isRequestClosed(2);
        assert.ok(isclo3, "req #2 is closed, but here it says it is not");

        let tulip1 = await world.getTulip(1);
        assert.equal(tulip1[0], accounts[3], "the tulip owner was not accounts[3]");

        let tulipsOfAcc2 = await world.getAllOwnedTulipIDs(accounts[2]);
        assert.equal(tulipsOfAcc2.length, 3, "number of tulips owned by accounts[2] was not 3");

        let tulipsOfAcc3 = await world.getAllOwnedTulipIDs(accounts[3]);
        assert.equal(tulipsOfAcc3.length, 1, "number of tulips owned by accounts[3] was not 1");
    });
});
