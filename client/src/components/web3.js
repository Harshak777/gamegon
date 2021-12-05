import Web3 from 'web3';


const web3 = () => {
  window.addEventListener('load', async () => {
    let currentWeb3;

    if (window.ethereum) {
      window.web3 = new Web3(Web3.ethereum);
      console.log("1");
      try {
        // Request account access if needed
        await window.ethereum.enable();
        // Acccounts now exposed
        // resolve(currentWeb3);
      } catch (error) {
        // User denied account access...
        alert('Please allow access for the app to work');
      }
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      console.log(2);
      // Acccounts always exposed
      // resolve(currentWeb3);
    } else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  });
};


export default web3 