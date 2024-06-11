const request = require('supertest');
const assert = require('assert');
const app = require('../../../app'); // Adjust the path as necessary

describe('GET /block/:block_number', function() {
    it('should return block details for a valid block number', async function() {
        const blockNumber = 12345; // Replace with a valid block number for testing 
        const response = await request(app)
            .get(`/block/${blockNumber}`)
            .expect('Content-Type', /json/)
            .expect(200);

        assert(response.body.number === blockNumber);
        // Add more assertions as necessary based on block structure
    });

    it('should return 404 for a non-existent block number', async function() {
        const blockNumber = 999999; // Use a block number that does not exist 
        await request(app)
            .get(`/block/${blockNumber}`)
            .expect('Content-Type', /json/)
            .expect(404);
    });

    it('should return 400 for an invalid block number', async function() {
        await request(app)
            .get('/block/invalid_block_number')
            .expect('Content-Type', /json/)
            .expect(400);
    });
});