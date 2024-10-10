/**
 * Toggles the completion state of a todo item.
 *
 * @param {Array} todos - The current list of todos.
 * @param {number} indexOfCheckbox - The index of the checkbox to toggle.
 * @returns {Array} - The updated list of todos with the toggled state.
 */
export const toggleComplete = (todos, indexOfCheckbox) => {
    return todos.map((todo, index) => {
      if (indexOfCheckbox === index) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });
  };