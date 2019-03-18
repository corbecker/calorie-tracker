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
    },
    getTotalCalories: function() {
      let cals = 0;
      if(state.items.length){
        cals = state.items.map(item => parseInt(item.calories))
                          .reduce((total, current) => total + current);
      }
      return state.totalCalories = cals;
    },
    setCurrentItem: function(item) {
      state.currentItem = item;
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
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
  }

  // Returning public methods
  return {
    populateList: function(items) {
      let html = '';

      items.forEach(function(item) {
        html += `<li class="collection-item" id="item-${item.id}"><strong>${item.name}</strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content"><i class="material-icons edit">edit</i></a>
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

    clearEditState: function() {
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },

    showEditState: function() {
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },

    editListItemInput: function(item) {
      document.querySelector(UISelectors.itemNameInput).value = item.name;
      document.querySelector(UISelectors.itemCaloriesInput).value = item.calories;
    },

    addListItem: function(item) {
      // Create li element
      const li = document.createElement('li');
      li.className = 'collection-item';
      li.id = `item-${item.id}`;

      // Add HTML
      li.innerHTML = `<strong>${item.name}</strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content"><i class="material-icons edit">edit</i></a>`

      // Insert
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);

    },

    clearInput: function() {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },

    updateTotalCalories: function(calories) {
      const totalCals = document.querySelector('.total-calories');
      totalCals.textContent = calories;
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

    //Edit icon click
    document.querySelector(UISelectors.itemList).addEventListener('click', itemUpdateSubmit);

    // Back button click Listener
    document.querySelector(UISelectors.backBtn).addEventListener('click', closeEditState);
  }

  // Back button click Handler
  const closeEditState = function(e) {
    e.preventDefault();

    UIController.clearInput();
    UIController.clearEditState();

  }

  // Submit add item
  const addItemSubmit = function(e) {
    e.preventDefault();

    // Get input from UIController
    const input = UIController.getItemInput();

    if(input.name !== '' && input.calories !== ''){
      const newItem = ItemController.addItem(input);
      UIController.addListItem(newItem);
    }

    const cals = ItemController.getTotalCalories();
    UIController.updateTotalCalories(cals);

    UIController.clearInput();

  }

  //Update Item Submit
  const itemUpdateSubmit = function(e) {

    UIController.showEditState();

    if(e.target.classList.contains('edit')){
      // Get list item id
      let id = e.target.parentElement.parentElement.id;
      id = id.split('-');

      // Put List item into input
      const items = ItemController.getItems();    
      
      const currentItem = items[id[1]];
      UIController.editListItemInput(currentItem);

      // Set current Item
      ItemController.setCurrentItem(currentItem);
      
    }
    
    e.preventDefault();
  }

  // Returning public methods
  return {
    init: function() {

      UIController.clearEditState();

      // Get items from state
      const items = ItemController.getItems();

      // Populate the UI with items
      UIController.populateList(items);

      // Populate total calories on init
      const cals = ItemController.getTotalCalories();
      UIController.updateTotalCalories(cals);


      loadEventListeners();
    }
  }

})(ItemController, UIController);

// Initialize the app
App.init();