module.exports = {
  friendlyName: 'List Blocks',
  description: 'Display a list of blocks within a specified range.',

  inputs: {
    startBlock: {
      type: 'number',
      required: true,
      description: 'The starting block number for the range.'
    },
    endBlock: {
      type: 'number',
      required: true,
      description: 'The ending block number for the range.'
    }
  },

  exits: {
    success: {
      viewTemplatePath: 'pages/block/list-blocks'
    },
    jsonError: {
      responseType: 'jsonError'
    }
  },

  fn: async function (inputs, exits) {
    try {
      const blocks = await EthBlock.find({
        number: {
          '>=': inputs.startBlock,
          '<=': inputs.endBlock
        }
      });
      return exits.success({
        blocks: blocks
      });
    } catch (error) {
      return exits.jsonError({
        message: error.message
      });
    }
  }
};