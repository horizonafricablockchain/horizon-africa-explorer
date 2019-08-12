module.exports = {
    friendlyName: "Returns a node from model EthereumNode to be used for writing blockchain data",
    description: "The system should be able to determine which node to return based on whether the node is up to date and is currently running. Currently, since the system consists of a single node, it will return this specific node statically - will need to be changed in later versions",
    inputs: {
    },

    fn: async function(inputs, exits) {
        var nodeArray = await EthereumNode.find({status: EthereumNode.constants.status.active}),
            nodeToReturn = null;

        if(nodeArray.length > 0) {
            nodeToReturn = nodeArray[0];
        }

        exits.success(nodeToReturn);
    }
};