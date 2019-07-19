// *******************************************************************
// *******************************************************************
//       FINISHED CODE BELOW
// *******************************************************************
// *******************************************************************

function ItemManager() {
    this.items = [];

    ItemManager.prototype.createItem = (id, title) => {
        const eachItem = this.items.map(eachItem => {
            return eachItem.id
        });
        const itemExists = parseInt(eachItem.filter(itemNum => itemNum === id));

        if (!itemExists && itemExists != NaN) {
            let item = new Object();
            item.id = id;
            item.title = title;
            this.items.push(item);
            return true;
        } else {
            return false;
        }
    };

    ItemManager.prototype.updateItem = (id, title) => {
        const change = this.items.map(item => {
            var temp = Object.assign({}, item);
            if (temp.id === id) {
                temp.title = title;
            }
            return temp;
        });

        let filteredTitle = change.filter(e => e.title === title);
        const indexExists = this.items.some(item => item.id === id);
        const index = this.items.map(item => item.id).indexOf(id);

        if (indexExists && index !== -1) {
            this.items.splice(index, 1, filteredTitle[0]);
            return true;
        } else {
            return false;
        }
    };

    ItemManager.prototype.deleteItem = function (id) {
        const indexExists = this.items.some(item => item.id === id);
        const index = this.items.map(x => x.id).indexOf(id);

        if (indexExists && index !== -1) {
            this.items.splice(index, 1);
            return true;
        } else {
            return false;
        }

    };

    ItemManager.prototype.findItemById = id => {
        const itemExists = this.items.some(item => item.id === id);
        if (!itemExists) {
            return null;
        } else {
            return this.items.find(item => item.id === id);
        }
    };

    ItemManager.prototype.findItemByTitle = title => {
        const itemExists = this.items.some(item => item.title === title);
        if (itemExists) {
            return this.items.find(item => item.title === title);
        } else {
            return null;
        }
    };
}

const myItemManager = new ItemManager();

operations = [
    ["createItem", "10", "Item_10"],
    ["createItem", "10", "Item_10"],
    ["updateItem", "10", "New_Item_10"],
    ["deleteItem", "9"],
    ["findItemById", "9"],
    ["findItemById", "10"],
    ["findItemByTitle", "Item_10"],
    ["findItemByTitle", "New_Item_10"]
]

const itemManagementRefactor = (operations) => {
    // Calls corresponding methods of itemManager based on the input
    return operations.map(operation => {
        const [methodName, ...params] = operation;
        let result = myItemManager[methodName].call(myItemManager, ...params);
        return result === undefined ? "null" : JSON.stringify(result);
    });
}

itemManagementRefactor(operations);