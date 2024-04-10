

class UserDoesntExistException extends Error {
    constructor(message) {
      super(message);
      this.name = this.constructor.name;
    }
  }

class TodoDoesntExistException extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

module.exports = {
    UserDoesntExistException: UserDoesntExistException,
    TodoDoesntExistException: TodoDoesntExistException
};