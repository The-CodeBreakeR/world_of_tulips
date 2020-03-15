export const GATEWAY = 'GANACHE' // Either 'METAMASK' or 'GANACHE'

export const CONTRACT_ADDRESS = '0x52e3aEFA560dD8660F7b96433dF9bB97366FD724'

export const WORLD_OF_TULIPS_ABI = [
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "bulbOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "bulbID",
          "type": "uint256"
        }
      ],
      "name": "DaughterBulbGathered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "bulbOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "bulbID",
          "type": "uint256"
        }
      ],
      "name": "Generation0BulbFound",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "querySender",
          "type": "address"
        }
      ],
      "name": "NoBulbFound",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "requestID",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tulipID",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "requestMaker",
          "type": "address"
        }
      ],
      "name": "RequestAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "requestID",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tulipID",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        }
      ],
      "name": "TulipBought",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "reproductionTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "requestIdentifier",
          "type": "uint256"
        }
      ],
      "name": "isRequestDefined",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "requestIdentifier",
          "type": "uint256"
        }
      ],
      "name": "isRequestClosed",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "requestIdentifier",
          "type": "uint256"
        }
      ],
      "name": "getRequest",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "tulipID",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tulipID",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "submitRequest",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "requestID",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "requestIdentifier",
          "type": "uint256"
        }
      ],
      "name": "closeRequest",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "requestIdentifier",
          "type": "uint256"
        }
      ],
      "name": "buyTulip",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "tulipID",
          "type": "uint256"
        }
      ],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getUnderGroundBulbNum",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "num",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "digToFindBulb",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "bulbID",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tulipID",
          "type": "uint256"
        }
      ],
      "name": "isTulipDefined",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tulipID",
          "type": "uint256"
        }
      ],
      "name": "getTulip",
      "outputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "generation",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "motherID",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "stage",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "R",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "G",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "B",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "plantingTime",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "nextReproductionBlock",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "bulbID",
          "type": "uint256"
        }
      ],
      "name": "plantBulb",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tulipID",
          "type": "uint256"
        }
      ],
      "name": "isReadyForHarvest",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tulipID",
          "type": "uint256"
        }
      ],
      "name": "gatherDaughterBulbs",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "bulbID1",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "bulbID2",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getNextMiracleBlock",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "nxtMiracleBlock",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "miracle",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]