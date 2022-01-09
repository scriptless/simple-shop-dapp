import Web3 from 'web3';
import Shop from 'contracts/build/contracts/Shop.json';

let account;

export const init = async () => {
    let provider = window.ethereum;

    if(typeof provider !== 'undefined') {
        provider
        .request({ method: 'eth_requestAccounts' })
        .then((accounts) => {
            account = accounts[0];
            console.log(`Choosed account ${account}`);
        })
        .catch(err => console.log(err));

        window.ethereum.on('accountsChanged', function (accounts) {
            account = accounts[0];
            console.log(`Account changed to ${account}`);
        })
    }

    const web3 = new Web3(provider);
}