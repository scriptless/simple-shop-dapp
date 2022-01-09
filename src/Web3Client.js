import Web3 from 'web3';
import ShopContractBuild from 'contracts/build/contracts/Shop.json';

class Web3Client {

    web3 = null;

    constructor() {
        console.log("initialized")

        let provider = window.ethereum;

        window.ethereum.on('accountsChanged', function (accounts) {
            if(accounts && accounts !== 'undefined') {
                console.log(`Account changed to ${accounts[0]}`);
            }
        })

        this.web3 = new Web3(provider);
    }

    async loadContract() {
        return new Promise(async (resolve, reject) => {
            const networkId = await this.web3.eth.net.getId();
             const shopContract = new this.web3.eth.Contract(
                ShopContractBuild.abi,
                ShopContractBuild.networks[networkId].address
            );
            resolve(shopContract);
        })
    }

    async getOrders() {
        let indexes = [];
        const contract = await this.loadContract();
        const maxOrders = await contract.methods.orderIdCounter().call();
        for(let i = 0; i < maxOrders; i++) {
            await contract.methods.orderIndexes(i).call().then(i => {
                indexes.push(i);
            }).catch(_ => _);
        }
        let orders = [];
        for(let i = 0; i < indexes.length; i++) {
            await contract.methods.getOrder(indexes[i]).call().then(item => {
                orders.push(item);
            }).catch(err => console.log(err));
        }
        console.log(orders);
        return orders;
    }

    async getShopItem(itemId) {
        const contract = await this.loadContract();
        const item = await contract.methods.getShopItem(itemId).call();
        return item;
    }

    async getShopItems() {
        let indexes = [];
        const contract = await this.loadContract();
        const maxShopItems = await contract.methods.idCounter().call();
        for(let i = 0; i < maxShopItems; i++) {
            await contract.methods.shopItemIndexes(i).call().then(i => {
                indexes.push(i);
            }).catch(_ => _);
        }
        let shopItems = [];
        for(let i = 0; i < indexes.length; i++) {
            await contract.methods.getShopItem(indexes[i]).call().then(item => {
                shopItems.push(item);
            }).catch(err => console.log(err));
        }
        return shopItems;
    }

    async isOwner(address) {
        const contract = await this.loadContract();
        return await contract.methods.isOwner(address).call();
    }

    async getUser() {
        let provider = window.ethereum;
        if(typeof provider !== 'undefined') {
            return provider
                .request({ method: 'eth_requestAccounts' })
                .then((accounts) => {
                    return accounts[0];
                })
                .catch(err => {
                    console.log(err);
                    return null;
                });
        } else {
            return null;
        }
    }
}

/*export const isOwner = async (address) => {
    const owner = await shopContract.methods.isOwner(address).call();
    console.log(owner);
    return owner;
}

export const getUser = async () => {
    let provider = window.ethereum;
    if(typeof provider !== 'undefined') {
        return provider
            .request({ method: 'eth_requestAccounts' })
            .then((accounts) => {
                return accounts[0];
            })
            .catch(err => {
                console.log(err);
                return null;
            });
    } else {
        return null;
    }
}*/

export default new Web3Client();
