pragma solidity >=0.4.25 <0.7.0;

import "./TulipMarket.sol";
import "./TulipGarden.sol";
import "./GodsPlan.sol";

contract WorldOfTulips is TulipMarket, TulipGarden, GodsPlan {

    // TODO: some of the "require"s have been removed for testing purpose, bring them back at the end.

    enum LifeStage {Bulb, Planted, Old}

    struct Tulip {
        // The owner address of the tulip.
        address owner;

        // The ID of the tulip.
        uint ID;

        // The generation number of the tulip.
        uint generation;

        // The ID of the mother of this tulip.
        uint motherID;

        // The color of the tulip.
        uint R;
        uint G;
        uint B;

        // The life stage of the tulip.
        LifeStage stage;

        // The timestamp for the block when the bulb of this tulip is planted.
        uint plantingTime;

        // The number of the next block when the tulip can reproduce.
        uint nextReproductionBlock;
    }

    struct Request {
        // The ID of the request.
        uint ID;

        // The ID of the proposed tulip.
        uint tulipID;

        // The proposed price for the tulip.
        uint price;

        // The deadline of the validity of the request.
        uint deadline;

        // If the request is Closed.
        bool isClosed;

        // The address of the request maker.
        address requestMaker;
    }

    uint demoRandomNumber = 0; // Temporary, only for demo.

    uint private secondsPerBlock = 15; // Approximately in Ethereum.

    uint private underGroundBulbNum = 1000 * 1000; // Initial number is defined here.
    uint private miracleGap = 5 * 52 weeks; // 5 years approximately.
    uint private nextMiracleBlock;
    uint private bulbsAddedInEachMiracle = 1;

    uint private tulipNum = 0;
    mapping (uint => Tulip) private tulips; // ID -> Tulip.
    mapping (address => uint) private ownedTulips; // address -> total number of owned tulips and bulbs.

    uint private reqNum = 0;
    uint private openReqNum = 0;
    mapping (uint => Request) private requests; // ID -> Request.
    mapping (address => uint) private ownedOpenRequests; // address -> total number of owned open requests.

    uint[7] public reproductionTime = [
        1 hours, // For young tulips with low generation number.
        4 hours,
        1 days,
        1 weeks,
        4 weeks,
        12 weeks,
        52 weeks // For old tulips.
    ];

    event RequestAdded(uint indexed requestID, uint indexed tulipID, address indexed requestMaker);
    event TulipBought(uint requestID, uint indexed tulipID, address indexed seller, address indexed buyer);
    event Generation0BulbFound(address indexed bulbOwner, uint indexed bulbID);
    event NoBulbFound(address indexed querySender);
    event DaughterBulbGathered(address indexed bulbOwner, uint indexed bulbID);

    constructor() public {
        nextMiracleBlock = (miracleGap / secondsPerBlock) + block.number;
    }

    // Check if a request with the specified request identifier is defined.
    function isRequestDefined(uint requestIdentifier) public view returns (bool) {
        return (requests[requestIdentifier].ID > 0);
    }

    // Check if a defined request with the specified request identifier is closed.
    function isRequestClosed(uint requestIdentifier) public view returns (bool) {
        require(isRequestDefined(requestIdentifier));
        return requests[requestIdentifier].isClosed;
    }

    // Get the general stipulations of a request.
    function getRequest(uint requestIdentifier) public view returns (uint tulipID, uint price, uint deadline) {
        require(isRequestDefined(requestIdentifier));

        Request memory request = requests[requestIdentifier];

        return (request.tulipID, request.price, request.deadline);
    }

    // By specifiying the tulip identifier, the proposed price, and the deadline of the request, tulip owners
    // can add a new request to sell their tulip. The request will have a unique identifier and others will
    // be able to buy the tulip (only the tulip owner can access this function).
    function submitRequest(uint tulipID, uint price, uint deadline) public returns (uint requestID) {
        require(msg.sender == tulips[tulipID].owner);

        ownedOpenRequests[msg.sender] += 1;

        Request memory request;
        request.requestMaker = msg.sender;
        request.tulipID = tulipID;
        request.price = price;
        request.deadline = deadline;
        reqNum += 1;
        openReqNum += 1;
        request.ID = reqNum;
        request.isClosed = false;

        requests[request.ID] = request;

        emit RequestAdded(request.ID, request.tulipID, request.requestMaker);

        return request.ID;
    }

    // Close a request, so no more buy offers would be accepted for it (Only the request maker can access
    // this function).
    function closeRequest(uint requestIdentifier) public {
        require(isRequestDefined(requestIdentifier) && msg.sender == requests[requestIdentifier].requestMaker);
        ownedOpenRequests[tulips[requests[requestIdentifier].tulipID].owner] -= 1;
        openReqNum -= 1;
        requests[requestIdentifier].isClosed = true;
    }

    // By sending the identifier of a request, and the required money, one can buy the proposed tulip.
    function buyTulip(uint requestIdentifier) public payable returns (uint tulipID) {
        require(isRequestDefined(requestIdentifier) && !isRequestClosed(requestIdentifier)
            && now < requests[requestIdentifier].deadline && msg.value >= requests[requestIdentifier].price);

        ownedOpenRequests[tulips[requests[requestIdentifier].tulipID].owner] -= 1;
        openReqNum -= 1;
        requests[requestIdentifier].isClosed = true;

        Request memory request = requests[requestIdentifier];

        if(msg.value > request.price) {
            address(uint160(msg.sender)).transfer(msg.value - request.price);
        }
        address(uint160(request.requestMaker)).transfer(request.price);

        ownedTulips[tulips[request.tulipID].owner] -= 1;
        ownedTulips[msg.sender] += 1;
        tulips[request.tulipID].owner = msg.sender;

        emit TulipBought(requestIdentifier, request.tulipID, request.requestMaker, msg.sender);

        return request.tulipID;
    }

    // Get all open request IDs owned by the given address.
    function getAllOwnedOpenRequestIDs(address owner) external view returns (uint[] memory openRequestIDs) {
        uint reqCount = ownedOpenRequests[owner];

        if (reqCount == 0) {
            return new uint[](0);
        }
        else {
            uint[] memory result = new uint[](reqCount);
            uint index = 0;

            for (uint rID = 1; rID <= reqNum; rID += 1) {
                if (!requests[rID].isClosed && tulips[requests[rID].tulipID].owner == owner) {
                    result[index] = rID;
                    index += 1;
                }
            }

            return result;
        }
    }

    // Get all open request IDs not owned by the given address.
    function getOthersOpenRequestIDs(address owner) external view returns (uint[] memory openRequestIDs) {
        uint reqCount = openReqNum - ownedOpenRequests[owner];

        if (reqCount == 0) {
            return new uint[](0);
        }
        else {
            uint[] memory result = new uint[](reqCount);
            uint index = 0;

            for (uint rID = 1; rID <= reqNum; rID += 1) {
                if (!requests[rID].isClosed && tulips[requests[rID].tulipID].owner != owner) {
                    result[index] = rID;
                    index += 1;
                }
            }

            return result;
        }
    }

    // Returns a valid ID for a new tulip (bulb).
    function getIDForTulip() private returns (uint ID) {
        tulipNum += 1;
        return tulipNum;
    }

    // Get the total number of generation 0 bulbs, remaind under the ground.
    function getUnderGroundBulbNum() public view returns (uint num) {
        return underGroundBulbNum;
    }

    // TODO improve!!!
    // Temporary changes are done for the demo
    // A random number generator function, used for testing.
    function randomGenerator() private returns (uint randomNumber) {
        demoRandomNumber += 1;
        if(demoRandomNumber == 5) {return (256 * 256 * 26 + 256 * 136 + 254)* 1000 * 1000 * 10;}
        if(demoRandomNumber == 6) {return (256 * 256 * 213 + 256 * 195 + 254)* 1000 * 1000 * 10;}
        if(demoRandomNumber == 7) {return (256 * 256 * 2 + 256 * 254 + 243)* 1000 * 1000 * 10;}
        if(demoRandomNumber == 8) {return (256 * 256 * 100 + 256 * 155 + 122)* 1000 * 1000 * 10;}
        return 0;
    }

    // By digging the ground, one can try to find a generation 0 bulb. The probability of finding a new bulb
    // depends on the number of bulbs, remained under the ground.
    function digToFindBulb() public returns (uint bulbID) {
        uint randomNumber = randomGenerator();
        // TODO improve: constant random numbers are not good in middle of a code + logic should become better
        uint md = 1000 * 1000 * 10 / underGroundBulbNum;
        uint bID;

        if(randomNumber % md == 0) {
            underGroundBulbNum -= 1;

            Tulip memory bulb;
            ownedTulips[msg.sender] += 1;
            bulb.owner = msg.sender;
            bulb.ID = getIDForTulip();
            bulb.generation = 0;
            bulb.motherID = 0;
            bulb.stage = LifeStage.Bulb;
            // TODO improve: logic for this should be checked as well and be synced with md
            randomNumber /= md;
            bulb.R = randomNumber % 256;
            randomNumber /= 256;
            bulb.G = randomNumber % 256;
            randomNumber /= 256;
            bulb.B = randomNumber % 256;

            tulips[bulb.ID] = bulb;
            bID = bulb.ID;

            emit Generation0BulbFound(msg.sender, bulb.ID);
        }
        else {
            emit NoBulbFound(msg.sender);
        }

        return bID;
    }

    // Check if a tulip with the specified tulip identifier is defined.
    function isTulipDefined(uint tulipID) public view returns (bool) {
        return (tulips[tulipID].ID > 0);
    }

    // Get the attributes of a tulip.
    function getTulip(uint tulipID) public view returns (address owner, uint generation, uint motherID, uint stage,
        uint R, uint G, uint B, uint plantingTime, uint nextReproductionBlock) {
        require(isTulipDefined(tulipID));

        Tulip memory tulip = tulips[tulipID];

        return (tulip.owner, tulip.generation, tulip.motherID, uint(tulip.stage), tulip.R,
            tulip.G, tulip.B, tulip.plantingTime, tulip.nextReproductionBlock);
    }

    // One can plant their own bulb (only the bulb owner can access this function).
    function plantBulb(uint bulbID) public {
        require(isTulipDefined(bulbID) && msg.sender == tulips[bulbID].owner);

        Tulip memory bulb = tulips[bulbID];

        bulb.stage = LifeStage.Planted;
        bulb.plantingTime = now;

        uint reproductionIndex = bulb.generation > 5 ? 5 : bulb.generation;
        bulb.nextReproductionBlock = (reproductionTime[reproductionIndex] / secondsPerBlock) + block.number;

        tulips[bulb.ID] = bulb;
    }

    // Check if a tulip has produced bulbs, and bulbs are ready to be gathered.
    function isReadyForHarvest(uint tulipID) public view returns (bool) {
        require(isTulipDefined(tulipID));
        return (tulips[tulipID].stage != LifeStage.Bulb && tulips[tulipID].nextReproductionBlock <= block.number);
    }

    // Gather bulbs produced by a tulip and update tulip's life stage (only the tulip owner can access this function).
    function gatherDaughterBulbs(uint tulipID) public returns (uint bulbID1, uint bulbID2) {
        // TODO isReadyForHarvest???
        //require(isReadyForHarvest(tulipID));
        require(msg.sender == tulips[tulipID].owner);

        uint randomNumber = randomGenerator();
        Tulip memory tulip = tulips[tulipID];

        uint bID1 = 0;
        uint bID2 = 0;

        uint tmp = 2**16; // TODO improve: why this tmp?
        bID1 = generateDaughterBulb(randomNumber % tmp, msg.sender, tulipID);
        if(tulip.stage != LifeStage.Old) {
            bID2 = generateDaughterBulb((randomNumber / tmp) % tmp, msg.sender, tulipID);
        }

        tulip.stage = LifeStage.Old;
        tulip.nextReproductionBlock = (reproductionTime[6] / secondsPerBlock) + block.number;

        tulips[tulipID] = tulip;

        return (bID1, bID2);
    }

    // Generate and emit Daughter bulb from the random seed and mother tulip.
    function generateDaughterBulb(uint randomNumber, address bulbOwner, uint motherID)
        private returns (uint bulbID) {
        Tulip memory mother = tulips[motherID];

        Tulip memory bulb;
        ownedTulips[bulbOwner] += 1;
        bulb.owner = bulbOwner;
        bulb.ID = getIDForTulip();
        bulb.generation = mother.generation + 1;
        bulb.motherID = motherID;
        bulb.stage = LifeStage.Bulb;
        // TODO improve: verify it is a good logic for using randomness.
        // It is currently the color of parent +- 3 based on random.
        randomNumber /= 7;
        bulb.R = (mother.R + 256 + (randomNumber % 7) - 3) % 256;
        randomNumber /= 7;
        bulb.G = (mother.G + 256 + (randomNumber % 7) - 3) % 256;
        randomNumber /= 7;
        bulb.B = (mother.B + 256 + (randomNumber % 7) - 3) % 256;

        tulips[bulb.ID] = bulb;

        emit DaughterBulbGathered(bulbOwner, bulb.ID);

        return bulb.ID;
    }

    // Get all tulip (or bulb) IDs owned by the given address.
    function getAllOwnedTulipIDs(address owner) external view returns (uint[] memory tulipIDs) {
        uint tulipCount = ownedTulips[owner];

        if (tulipCount == 0) {
            return new uint[](0);
        }
        else {
            uint[] memory result = new uint[](tulipCount);
            uint index = 0;

            for (uint tID = 1; tID <= tulipNum; tID += 1) {
                if (tulips[tID].owner == owner) {
                    result[index] = tID;
                    index += 1;
                }
            }

            return result;
        }
    }

    // Get next miracle block.
    function getNextMiracleBlock() public view returns (uint nxtMiracleBlock) {
        return nextMiracleBlock;
    }

    // Every once in a long while, a miracle can happen if someone calls this function. If a miracle happens,
    // a bulb of a generation 0 tulip will be placed under the ground.
    function miracle() public {
        //require(nextMiracleBlock <= block.number);

        underGroundBulbNum += bulbsAddedInEachMiracle;

        nextMiracleBlock = (miracleGap / secondsPerBlock) + block.number;
    }

}
