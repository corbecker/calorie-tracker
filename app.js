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
    items: [],
    currentItem: null,
    totalCalories: 0,
  }

  // Returning public methods
  return {
    getItems: function() {
      return state.items;
    },
    addItem: function(item) {
      let id;
      // Create unique ID's
      if(state.items.length > 0){
        id = state.items[state.items.length - 1].id + 1
      }else{
        id = 0;
      }

      const calories = parseInt(item.calories);

      newItem = new Item(id, item.name, item.calories);

      state.items.push(newItem);

      return newItem;
    },
    logData: function() {
      return state
    }
  }

})();
// UI Controller

const UIController = (function(){

  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
  }

  // Returning public methods
  return {
    populateList: function(items) {
      let html = '';

      items.forEach(function(item) {
        html += `<li class="collection-item" id="item-${item.id}"><strong>${item.name}</strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content"><i class="material-icons">edit</i></a>
      </li>`
      });

      document.querySelector(UISelectors.itemList).innerHTML = html;

    },

    getSelectors: function() {
      return UISelectors;
    },

    getItemInput: function() {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },

    addListItem: function(item) {
      // Create li element
      const li = document.createElement('li');
      li.className = 'collection-item';
      li.id = `item-${item.id}`;

      // Add HTML
      li.innerHTML = `<strong>${item.name}</strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content"><i class="material-icons">edit</i></a>`

      // Insert
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);

    },

    clearInput: function() {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    }

  }
})();

// App Controller

const App = (function(ItemController, UIController){
  // Listeners
  const loadEventListeners = function() {
    const UISelectors = UIController.getSelectors();

    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', addItemSubmit);
  }

  // Submit add item
  const addItemSubmit = function(e) {
    e.preventDefault();

    // Get input from UIController
    const input = UIController.getItemInput();
    console.log(input)

    if(input.name !== '' && input.calories !== ''){
      const newItem = ItemController.addItem(input);
      UIController.addListItem(newItem);
    }

    UIController.clearInput();

  }

  // Returning public methods
  return {
    init: function() {

      // Get items from state
      const items = ItemController.getItems();

      // Populate the UI with items
      UIController.populateList(items);

      loadEventListeners();
    }
  }

})(ItemController, UIController);

// Initialize the app
App.init();