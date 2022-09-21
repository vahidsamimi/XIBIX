const fs          = require("fs");
var neighbors     = [];

const argvs = process.argv.slice(2);
fs.readFile(argvs[0], "utf-8", (error, data) => {
  if (error) throw error;
  var obj = JSON.parse(data);
  crossReference(obj);
  // param: element ID as start point , json data 
  findViewSpots(0, obj);

});

function findViewSpots(indexOfElement, obj) {
  var viewSpots = []; 
  var maxElement = {
    element_id: null,
    value: -1,
  };
  var traversalFaces = []; // visited elements in mesh graph
  var i = 0;
  // implement hill climbing algorithm
  while (viewSpots.length < parseInt(argvs[1])) {
    if (!traversalFaces.includes(indexOfElement)) {
      if (indexOfElement < neighbors.length) {
        if (traversalFaces.length < neighbors.length) {
          var neighbor = neighbors[indexOfElement];
          neighbor.forEach(function (el) {
            if (obj.values[el].value > maxElement.value) {
              maxElement = obj.values[el];
            }
          }); // end foreach
          traversalFaces.push(indexOfElement);
          if (maxElement.element_id == indexOfElement) {
            viewSpots.push(maxElement);
            maxElement = {
              element_id: 0,
              value: -11,
            };
          }
          if (traversalFaces.includes(maxElement.element_id)) {
            indexOfElement = ++i;
            maxElement = {   element_id: 0,  value: -11,  };
          } else indexOfElement = maxElement.element_id;
        }
      } else break;
    } else {
      indexOfElement = ++i;
      maxElement = { element_id: 0, value: -11,  };
    }
  }
  viewSpots.sort(GetSortOrder("value"));
  console.log("viewSpots : > ", viewSpots);
}
function crossReference(g) {
  var vertexToFace  = [];

  for (var fx = 0; fx < g.elements.length; fx++)
    vertexToFace[fx] = new Array();
  
  for (var fx = 0; fx < g.elements.length; fx++) {
    var f = g.elements[fx].nodes;
    var ax = f[0];
    var bx = f[1];
    var cx = f[2];

    vertexToFace[ax].push(fx);
    vertexToFace[bx].push(fx);
    vertexToFace[cx].push(fx);
  }
  for (var fx = 0; fx < g.elements.length; fx++) {

    var f = g.elements[fx].nodes;
    neighbors.push([
      g.elements[fx].id,
      vertexToFace[f[0]],
      vertexToFace[f[1]],
      vertexToFace[f[2]],
    ]);
  }
  // find all neighbors for each Faces (Element)
  for (var fx = 0; fx < neighbors.length; fx++) {
    var vertexFace = neighbors[fx][1].concat(neighbors[fx][2]).concat(neighbors[fx][3]);
    var neighborFace = vertexFace.reduce(function (acc, el, i, arr) {
      if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el);
      return acc;
    }, []);
    neighbors[fx] = neighborFace;
  }
} 
// linear sort O(n) 
//  if the list is VERY long it would be a good idea to do a binary search instead of a linear search.  O(log n).
//array Item    10,000   100,000  1000,000   10,000,000  
//Sort            80       900     13000          N/A
//Linear           2         2        25         5000
//Binary           2         2         5           21

function GetSortOrder(prop) {    
  return function(a, b) {    
      if (a[prop] < b[prop]) {    
          return 1;    
      } else if (a[prop] > b[prop]) {    
          return -1;    
      }    
      return 0;    
  }    
} 
