pragma solidity >=0.4.25 <0.7.0;

interface GodsPlan {

    // Get next miracle block.
    function getNextMiracleBlock() external view returns (uint nxtMiracleBlock);

    // Every once in a long while, a miracle can happen if someone calls this function. If a miracle happens,
    // a bulb of a generation 0 tulip will be placed under the ground.
    function miracle() external;

}
