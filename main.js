let inputFieldInitiative = document.getElementById("inputFieldInitiative");
let inputFieldName = document.getElementById("inputFieldName")
let addName = document.getElementById("addName");
let namesContainer = document.getElementById("namesContainer");
let createTurnOrder = document.getElementById("createTurnOrder");
let myTable = document.querySelector('#placeholder');

var i = 1;
var creatureList = [];
let headers = ['Name', 'Base dice roll', 'Dice roll with initiative', 'Turn order'];

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

    // add name and initiative value to creature object
    let creatureObject = creatureObjectMaker(inputFieldName.value, inputFieldInitiative.value)

    // push object to array
    creatureList.push(creatureObject);
    console.log(creatureList);

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

// "Create turn order" button
createTurnOrder.addEventListener("click", function() {
  
  let sortedTurnOrder = creatureList.sort((a, b) => {
    return b.diceRollPlusInitiative - a.diceRollPlusInitiative;
  });

  sortedTurnOrder.forEach((creature, i) => {
    creature.turnOrder = i + 1;
  });

  // print the sorted turn order list on the page
  let table = document.createElement('table');
  let headerRow = document.createElement('tr');

  headers.forEach(headerText => {
    let header = document.createElement('th');
    let textNode = document.createTextNode(headerText);
    header.appendChild(textNode);
    headerRow.appendChild(header);
  });

  table.appendChild(headerRow);

  creatureList.forEach(creature => {
    let row = document.createElement('tr');

    Object.values(creature).forEach(text => {
      let cell = document.createElement('td');
      let textNode = document.createTextNode(text);
      cell.appendChild(textNode);
      row.appendChild(cell);
    })

    table.appendChild(row);

  });
  

  myTable.appendChild(table);

  // print the sorted turn order list in console
  creatureList.forEach(
    (creature => {
        console.log(`${creature.creatureName}: initiative ${creature.diceRollPlusInitiative}`)
    })
  )

})



// Dice 20
var dice20 = {
    sides: 20,
    roll: function () {
      var randomNumber = Math.floor(Math.random() * this.sides) + 1;
      return randomNumber;
    }
  }

// Make a creature object
function creatureObjectMaker(name, initiative) {
  this.names = name;
  this.initiative = initiative;

  diceRollInstance = dice20.roll();

  const totalDiceRoll = parseInt(diceRollInstance) + parseInt(initiative);

  var creatureObject = {
    creatureName: name, 
    diceRollBase: diceRollInstance,
    diceRollPlusInitiative: totalDiceRoll,
    turnOrder: '',
  };

  console.log(creatureObject.creatureName, "base dice roll: ", diceRollInstance);
  console.log(creatureObject.creatureName, "with initiative roll: ", creatureObject.diceRollPlusInitiative);

  return creatureObject;
}



  
// [extra] Prints dice roll to the page
// function printNumber(number) {
//     var placeholder = document.getElementById('placeholder');
//     placeholder.innerHTML = number;
//   }
  
//   var button = document.getElementById('createTurnOrder');
  
//   button.onclick = function() {
//     var result = dice20.roll();
//     printNumber(result);
//   };
