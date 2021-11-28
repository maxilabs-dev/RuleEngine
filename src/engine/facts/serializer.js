/** @format */

class FactSerializer {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
  getFactResult() {
    return {
      [this.name]: this.value,
    };
  }
}

module.exports = {
  FactSerializer,
};
