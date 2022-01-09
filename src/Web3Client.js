import Web3 from 'web3';
import ShopContractBuild from 'contracts/build/contracts/Shop.json';

class Web3Client {

    web3 = null;

    constructor() {
        console.log("initialized")

        let provider = window.ethereum;

        window.ethereum.on('accountsChanged', function (accounts) {
            if(accounts && accounts !== 'undefined') {
                window.location.reload();
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

    async buy(itemId, amount, totalCost, name, street, number, postal, city) {
        console.log(itemId, amount, name, street, number, postal, city);
        try {
            const contract = await this.loadContract();
            const user = await this.getUser();
            const add = await contract.methods.buy(itemId, amount, [name, street, number, postal, city])
                .send({from: user, value: totalCost});
            return add;
        } catch(e) {
            console.log(e);
            return false;
        }
    }

    async editShopItem(itemId, {title, description, cost, inventory}) {
        console.log(itemId, title, description, cost, inventory);
        try {
            const contract = await this.loadContract();
            const user = await this.getUser();
            const costWei = Web3.utils.toWei(""+cost);
            const add = await contract.methods.editShopItem(itemId, title, description, `${costWei}`, `${inventory}`)
                .send({from: user});
            return add;
        } catch(e) {
            console.log(e);
            return false;
        }
    }

    async addShopItem({title, description, cost, inventory}) {
        try {
            const contract = await this.loadContract();
            const user = await this.getUser();
            const costWei = Web3.utils.toWei(""+cost);
            const add = await contract.methods.addShopItem(title, description, `${costWei}`, `${inventory}`)
                .send({from: user});
            return add;
        } catch(e) {
            console.log(e);
            return false;
        }
    }

    async getOrders() {
        let indexes = [];
        const contract = await this.loadContract();
        const count = await contract.methods.getOrderCount().call();
        for(let i = 0; i < count; i++) {
            await contract.methods.orderIndexes(i).call().then(i => {
                indexes.push(i);
            }).catch(_ => _);
        }
        let orders = [];
        for(let i = 0; i < indexes.length; i++) {
            await contract.methods.getOrder(indexes[i]).call().then(item => {
                orders.push({orderId: indexes[i], ...item});
            }).catch(err => console.log(err));
        }
        console.log(orders);
        return orders;
    }

    async deleteOrder(orderId) {
        const contract = await this.loadContract();
        const user = await this.getUser();
        const success = await contract.methods.deleteOrder(orderId).send({from: user});
        return success;
    }

    async deleteShopItem(itemId) {
        const contract = await this.loadContract();
        const user = await this.getUser();
        const success = await contract.methods.deleteShopItem(itemId).send({from: user});
        return success;
    }

    async getShopItem(itemId) {
        const contract = await this.loadContract();
        const item = await contract.methods.getShopItem(itemId).call();
        return item;
    }

    async getShopItems() {
        let indexes = [];
        const contract = await this.loadContract();
        const count = await contract.methods.getShopItemCount().call();
        for(let i = 0; i < count; i++) {
            await contract.methods.shopItemIndexes(i).call().then(i => {
                indexes.push(i);
            }).catch(_ => _);
        }
        let shopItems = [];
        for(let i = 0; i < indexes.length; i++) {
            await contract.methods.getShopItem(indexes[i]).call().then(item => {
                shopItems.push({itemId: indexes[i], ...item});
            }).catch(err => console.log(err));
        }
        return shopItems;
    }

    async isOwner(address) {
        try {
            const contract = await this.loadContract();
            return await contract.methods.isOwner(address).call();
        } catch(_) {
            return false;
        }
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

export default new Web3Client();
