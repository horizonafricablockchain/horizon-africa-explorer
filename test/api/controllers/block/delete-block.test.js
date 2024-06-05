const request = require("supertest");
const expect = require("chai").expect;
const Sails = require("sails");

describe("DELETE /block/delete/:block_number", function() {
    let sails;

    before(async function() {
        sails = await Sails().lift({
            hooks: { grunt: false },
            log: { level: 'silent' }
        });
    });

    after(async function() {
        await Sails.lower();
    });

    it("should delete the block and associated transactions if the block number exists", async function() {
        const blockNumber = 12345;
        await EthBlock.create({ number: blockNumber }).fetch();
        await EthTransaction.create({ blockNumber: blockNumber }).fetch();

        const response = await request(sails.hooks.http.app)
            .delete(`/block/delete/${blockNumber}`)
            .expect(200);

        expect(response.body.message).to.equal(`Block number ${blockNumber} and its transactions have been deleted.`);

        const block = await EthBlock.findOne({ number: blockNumber });
        const transactions = await EthTransaction.find({ blockNumber: blockNumber });

        expect(block).to.be.null;
        expect(transactions).to.have.lengthOf(0);
    });

    it("should return 404 if the block number does not exist", async function() {
        const nonExistentBlockNumber = 54321;

        const response = await request(sails.hooks.http.app)
            .delete(`/block/delete/${nonExistentBlockNumber}`)
            .expect(404);

        expect(response.body.message).to.equal(`Block number ${nonExistentBlockNumber} not found.`);
    });

    it("should return 400 for invalid block number", async function() {
        const invalidBlockNumber = 'invalid';

        const response = await request(sails.hooks.http.app)
            .delete(`/block/delete/${invalidBlockNumber}`)
            .expect(400);

        expect(response.body.message).to.equal('Invalid block number.');
    });
});