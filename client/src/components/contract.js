import Web3 from "web3";
    // console.log(web3);
    const address = "0x851C0f6078B81E0ec2Da4eCC9ca7F2f5F0296664";
    const abi = [
      {
        constant: false,
        inputs: [],
        name: "terminate",
        outputs: [],
        payable: true,
        stateMutability: "payable",
        type: "function",
      },
      {
        constant: true,
        inputs: [
          {
            name: "",
            type: "uint256",
          },
        ],
        name: "bets",
        outputs: [
          {
            name: "id",
            type: "uint256",
          },
          {
            name: "challenger",
            type: "address",
          },
          {
            name: "accepter",
            type: "address",
          },
          {
            name: "name",
            type: "string",
          },
          {
            name: "conditions",
            type: "string",
          },
          {
            name: "price",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            name: "_id",
            type: "uint256",
          },
        ],
        name: "acceptBet",
        outputs: [],
        payable: true,
        stateMutability: "payable",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "getAvailableBets",
        outputs: [
          {
            name: "",
            type: "uint256[]",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            name: "_id",
            type: "uint256",
          },
          {
            name: "challengerWins",
            type: "bool",
          },
        ],
        name: "resolveBet",
        outputs: [],
        payable: true,
        stateMutability: "payable",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "getNumberOfBets",
        outputs: [
          {
            name: "",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            name: "_name",
            type: "string",
          },
          {
            name: "_conditions",
            type: "string",
          },
        ],
        name: "publishBet",
        outputs: [],
        payable: true,
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [],
        payable: true,
        stateMutability: "payable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: "_id",
            type: "uint256",
          },
          {
            indexed: true,
            name: "_challenger",
            type: "address",
          },
          {
            indexed: false,
            name: "_name",
            type: "string",
          },
          {
            indexed: false,
            name: "_price",
            type: "uint256",
          },
        ],
        name: "LogPublishBet",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: "_id",
            type: "uint256",
          },
          {
            indexed: true,
            name: "_challenger",
            type: "address",
          },
          {
            indexed: true,
            name: "_accepter",
            type: "address",
          },
          {
            indexed: false,
            name: "_name",
            type: "string",
          },
          {
            indexed: false,
            name: "_price",
            type: "uint256",
          },
        ],
        name: "LogAcceptBet",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: "_id",
            type: "uint256",
          },
          {
            indexed: true,
            name: "_challenger",
            type: "address",
          },
          {
            indexed: true,
            name: "_accepter",
            type: "address",
          },
          {
            indexed: false,
            name: "_name",
            type: "string",
          },
          {
            indexed: false,
            name: "_payout",
            type: "uint256",
          },
        ],
        name: "LogResolveBet",
        type: "event",
      },
    ];
    const web3 = new Web3(Web3.givenProvider);
    export default  new web3.eth.Contract(abi, address);
    
