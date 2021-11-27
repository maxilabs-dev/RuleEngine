/** @format */

class FactSerializer {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
  getData() {
    return {
      [this.name]: this.value,
    };
  }
}

module.exports = {
  FactSerializer,
};
