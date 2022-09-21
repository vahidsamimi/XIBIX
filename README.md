# XIBIX
<b>View spot finder</b><br>
There is a map excerpt of a hilly landscape. We call it a mesh. The mesh is partitioned in 
triangles; we call them elements. For each element a scalar value is assigned, which represents 
the average spot height in this triangle as compared to the sea level. 
<br><br>
For a walking tour we would like to identify the view spots. A view spot is the element where 
the height reaches its local maxima, that is, all the neighboring elements are not higher. We 
consider two elements as neighbors if they share at least one node – vertex. 
The task is as follows: Given a mesh and an integer number N, find the first N view spots 
ordered by the spot height starting from the highest to the lowest.

<h2> Input </h2>
<b>1.</b> A JSON file with the mesh and the height values. The file contains three sections:

````
{
 nodes: [
 {id: node_id1, x: <number value>, y: <number value>}, 
 {id: node_id2, x: <number value>, y: <number value>},
 {id: node_id3, x: <number value>, y: <number value>},
 ...
 ],
 elements: [
 {id: element_id1, nodes: [node_id1, node_id2, node_id3]},
 ...
 ],
values: [
 {element_id: element_id1, value: <number value>},
 ...
 ]
}

````
<b>2.</b> Integer number N that defines how many view spots must be found and written out.
<h2> Output </h2>
List of N view spots (view spot element ID, height value on this element) ordered by value
from the highest to the lowest. 

<h2> Run </h2>


````
```
node [program name].js <mesh file> <number of view spots>
node .\App.js .\Data\mesh[1][1][1][1][1][1].json  10
```
````
