// The code below is broken....can you fix it?

function ItemManager() {
  this.items = [];

  this.createItem = function (id, title) {
    // TODO: return false if the item id already exists
      let item = new Object();
      this.items.id = id;
      this.items.title = title;
      this.items = [...this.items, item];
      return true;
  };

  this.updateItem = function (id, title) {
    // TODO: return false if the item doesn't exist

    this.items = this.items.filter(item => {
      return {
        id: id,
        title: title
      };
    });
    return true;
  };

  this.deleteItem = function (id) {
    // TODO: return false if the item doesn't exist

    const item = this.items.find(item => item.id === id);
    delete item;
    return true;
  };

  this.findItemById = function (id) {
    return this.items.find(item => item.id === id);
  };

  this.findItemByTitle = function (title) {
    return this.items.find(item => item.title === title);
  };
}

const itemManager = new ItemManager();

function itemManagementRefactor(operations) {
  // Calls corresponding methods of itemManager based on the input
  return operations.map(operation => {
    const [methodName, ...params] = operation;
    let result = itemManager[methodName].call(itemManager, ...params);
    return result === undefined ? "null" : JSON.stringify(result);
  });
}