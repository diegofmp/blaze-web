
class CustomerService {
    constructor() {
      this.customers = [
        {firstName:1, lastName:"test1", email:"Summary Test 1", phoneNumber:"2001"},
        {firstName:2, lastName:"test2", email:"Summary Test 2", phoneNumber:"2002"},
        {firstName:3, lastName:"test3", email:"Summary Test 3", phoneNumber:"2003"},
      ];
    }


    async retrieveItems() {
        return fetch('http://localhost:8080/customers')
        .then(response => {
            if (!response.ok) {
            this.handleResponseError(response);
            }
            return response.json();
        })
        .then(json => {
            console.log("Retrieved items:");
            console.log(json);
            const items = [];
            const itemArray = json._embedded.collectionItems;
            for(var i = 0; i < itemArray.length; i++) {
            itemArray[i]["link"] =  itemArray[i]._links.self.href;
            items.push(itemArray[i]);
            }
            return items;
        })
        .catch(error => {
            this.handleError(error);
        });
    }


    /*async retrieveCustomers() {
        return Promise.resolve(this.customers);
    }*/
    async getItem(itemLink) {
      for(var i = 0; i < this.customers.length; i++) {
        if ( this.customers[i].link === itemLink) {
          return Promise.resolve(this.customers[i]);
        }
      }
      return null;
    }
    async createItem(item) {
      console.log("CustomerService.createItem():");
      console.log(item);
      return Promise.resolve(item);
    }
    async deleteItem(itemId) {
      console.log("CustomerService.deleteItem():");
      console.log("item ID:" + itemId);
    }
    async updateItem(item) {
      console.log("CustomerService.updateItem():");
      console.log(item);
    }
  }
  export default CustomerService;