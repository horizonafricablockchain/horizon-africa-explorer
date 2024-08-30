<?php
class GetReadNode {
    public static function execute() {
        // Assuming EthereumNode is a model class that you have defined elsewhere
        $nodeArray = EthereumNode::find(['status' => EthereumNode::STATUS_ACTIVE]);

        $nodeToReturn = null;
        if (count($nodeArray) > 0) {
            $nodeToReturn = $nodeArray[0];
        }

        return $nodeToReturn;
    }
}

// Usage example
$result = GetReadNode::execute();
?>