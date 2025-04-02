const fs = require('fs');

const url = "/home/w3villa/Desktop/Node_traning/database/backend/userDatabase.txt"


exports.updateTodo =async (id,todo)=>{

fs.readFile(url, 'utf8', (err, data) => {
  if (err) {
    console.log("Error reading the file:", err);
    return;
  }

  const lines = data.split('\n');
  let todos = lines.map(line => JSON.parse(line));

  const targetId = id;
  const newTodo = todo; 

  let modified = false; 

  todos = todos.map(todo => {
    if (todo.id === targetId) {
      todo.todo = newTodo;
      modified = true;
    }
    return todo;
  });

  if (!modified) {
    console.log(`No todo found with ID ${targetId}`);
    return;
  }

  const updatedData = todos.map(todo => JSON.stringify(todo)).join('\n');

  fs.writeFile(url, updatedData, 'utf8', (err) => {
    if (err) {
      console.log("Error writing to the file:", err);
      return;
    }
    console.log("File successfully updated!");
  });
})
};
