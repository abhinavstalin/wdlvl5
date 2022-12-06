// models/todo.js
"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue items");
      // FILL IN HERE
      const overitems = await Todo.overdue();
      overitems.forEach((todoItem) =>
        console.log(todoItem.displayableString())
      );
      console.log("\n");

      console.log("Due Today items");
      // FILL IN HERE
      const duetoitems = await Todo.dueToday();
      duetoitems.forEach((todoItem) =>
        console.log(todoItem.displayableString())
      );
      console.log("\n");

      console.log("Due Later items");
      // FILL IN HERE
      const duelatitems = await Todo.dueLater();
      duelatitems.forEach((todoItem) =>
        console.log(todoItem.displayableString())
      );
    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      const overitems = await Todo.findAll({
        where: { dueDate: { [Op.lt]: new Date() } },
        order: [["id", "ASC"]],
      });

      return overitems;
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      const duetoitems = await Todo.findAll({
        where: { dueDate: new Date() },
        order: [["id", "ASC"]],
      });

      return duetoitems;
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      const duelatitems = await Todo.findAll({
        where: { dueDate: { [Op.gt]: new Date() } },
        order: [["id", "ASC"]],
      });

      return duelatitems;
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
      await Todo.update(
        { completed: true },
        {
          where: {
            id: id,
          },
        }
      );

    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      let displDate =
        this.dueDate === new Date().toLocaleDateString("en-CA")
          ? ""
          : this.dueDate;
          return `${this.id}. ${checkbox} ${this.title} ${displDate}`.trim();
    }
  }
  Todo.init({
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};
