pragma solidity >=0.4.25 <0.7.0;

interface TulipGarden {

    // Get the total number of generation 0 bulbs, remaind under the ground.
    function getUnderGroundBulbNum() external view returns (uint num);

    // By digging the ground, one can try to find a generation 0 bulb. The probability of finding a new bulb
    // depends on the number of bulbs, remained under the ground.
    function digToFindBulb() external returns (uint bulbID);

    // Check if a tulip with the specified tulip identifier is defined.
    function isTulipDefined(uint tulipID) external view returns (bool);

    // Get the attributes of a tulip.
    function getTulip(uint tulipID) external view returns (address owner, uint generation, uint motherID, uint stage,
        uint R, uint G, uint B, uint plantingTime, uint nextReproductionBlock);

    // One can plant their own bulb (only the bulb owner can access this function).
    function plantBulb(uint bulbID) external;

    // Check if a tulip has produced bulbs, and bulbs are ready to be gathered.
    function isReadyForHarvest(uint tulipID) external view returns (bool);

    // Gather bulbs, produced by a tulip (only the tulip owner can access this function).
    function gatherDaughterBulbs(uint tulipID) external returns (uint bulbID1, uint bulbID2);

    // Get all tulip (or bulb) IDs owned by the given address.
    function getAllOwnedTulipIDs(address owner) external view returns (uint[] memory tulipIDs);

}
