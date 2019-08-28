module.exports = {
    friendlyName: "Gets the Web3 object",
    description: "The Web3 object is used to query an ETH node",

    inputs: {},

    fn: async function(inputs, exits) {
        var Web3, web3, provider;

        Web3 = require("web3");
        web3 = new Web3();
        // provider = new web3.providers.HttpProvider(sails.config.local.eth_node.eth_rpc_endpoint);
        // web3.setProvider(provider);

        return exits.success(web3);
    }
};