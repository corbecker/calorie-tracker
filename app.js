// Using module pattern to create a small calorie tracker app.

// Storage Controller

// Item Controller

const ItemController = (function(){
  
  // Item Constructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  // Data Structure/State (Private)
  const state = {
    items: [
      {id: 0, name: 'Smoothie', calories: 1000},
      {id: 1, name: 'Rice & Veggies', calories: 500},
      {id: 2, name: 'Oatmeal', calories: 600},
    ],
    currentItem: null,
    totalCalories: 0,
  }

  // Returning public methods
  return {
    getItems: function() {
      return state.items;
    },
    logData: function(){
      return state;
    }
  }

})();
// UI Controller

const UIController = (function(){

  // Returning public methods
  return {
    populateList: function(items) {
      let html = '';

      items.forEach(function(item) {
        html += `<li class="collection-item" id="item-${item.id}"><strong>${item.name}</strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content"><i class="material-icons">edit</i></a>
      </li>`
      });

      document.getElementById('item-list').innerHTML = html;

    }
  }
})();

// App Controller

const App = (function(ItemController, UIController){

  // Returning public methods
  return {
    init: function() {

      // Get items from state
      const items = ItemController.getItems();

      // Populate the UI with items
      UIController.populateList(items);

      
    }
  }

})(ItemController, UIController);

// Initialize the app
App.init();