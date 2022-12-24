let inputFieldInitiative = document.getElementById("inputFieldInitiative");
let inputFieldName = document.getElementById("inputFieldName")
let addName = document.getElementById("addName");
let namesContainer = document.getElementById("namesContainer");
let diceRollAll = document.getElementById("diceRollAll");

var i = 1;
const names = [];

addName.addEventListener("click", function() {
    // use the click function on button to add a new paragraph i.e 'p'
    var nameParagraph = document.createElement('p');
    // add id to paragraph
    nameParagraph.setAttribute('id', i);   
    // increase the id for each of the inputfield values
    i = i + 1;
    // add styling from css
    nameParagraph.classList.add('paragraph-styling');
    // make text = inputfield's value entered by user
    nameParagraph.innerText = inputFieldName.value;

    // add name to creature object

    // push input value to array
    names.push(nameParagraph.innerText);
    
    console.log(names);

    // append paragraph to To Do container
    namesContainer.appendChild(nameParagraph);
    //reset inputField box
    inputFieldInitiative.value = "";
    inputFieldName.value = "";

    
    nameParagraph.addEventListener("click", function() {
        nameParagraph.style.textDecoration = "line-through";
    })
    
    nameParagraph.addEventListener("dblclick", function() {
        namesContainer.removeChild(nameParagraph);
    })
})

// press enter to add in name
inputFieldInitiative.addEventListener("keypress", function(event) {
    if (event.key == "Enter") {
        document.getElementById("addName").click();
    }
})

// dice roll button
diceRollAll.addEventListener("click", function() {
    // Get the element
    var copiedNamesContainer = document.querySelector('#nameList');

    /*
    // Create copy of it
    var clone = copiedNamesContainer.cloneNode();
    // Update the ID and add a class
    clone.id = 'newNameList';
    // Inject it into the DOM
    copiedNamesContainer.after(clone);  
    */
    
    // Pass in names array
    creatureObjectMaker(names);

})


// Dice 20
var dice20 = {
    sides: 20,
    roll: function () {
      var randomNumber = Math.floor(Math.random() * this.sides) + 1;
      return randomNumber;
    }
  }
  
// [TO USE] Prints dice roll to the page
// function printNumber(number) {
//     var placeholder = document.getElementById('placeholder');
//     placeholder.innerHTML = number;
//   }
  
//   var button = document.getElementById('diceRollAll');
  
//   button.onclick = function() {
//     var result = dice20.roll();
//     printNumber(result);
//   };


// loop for creating objects from names array
function creatureObjectMaker(names) {
  names.forEach((name => {
    diceRollInstance = dice20.roll();
    
    let namesObject = {
      creatureName: name, 
      diceRoll: this.diceRollInstance,
    };
    
    console.log(name, "dice roll is: ", diceRollInstance);

  }))
}


