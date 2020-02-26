# Databases Workbook

This workbook accompanies Week 5 of the DWD class.

## Overview

### 00 Why does everything need a UUID?


### 01 Translating interfaces to data
**Challenge**:
- When creating web applications, the dynamic data that interfaces use is persisted most often in a database. When using a database like MongoDB, this data is simply in the form of JSON. Therefore, it's important to practice translating the state and data of interfaces into JSON. Translate the following web applications into a JSON data model.
  - [Simple Todo list](http://todomvc.com/examples/react/#/), [Solution](./workbook/01_solution/todo.json)
  - A Todo list with multiple lists, [Solution](./workbook/01_solution/todoLists.json).
  - A Todo list app with multiple users. Hint: It is best practice not to deeply nest data structures, but instead connect them via ids. Another hint: think about the interface, which would fetch all todo lists for a specific user. [Solution](./workbook/01_solution/todoUsers.json)

NeDB vs Mongo? You can't use Mongoose with NeDB so that's annoying.