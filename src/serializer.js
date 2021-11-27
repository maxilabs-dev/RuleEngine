/** @format */

class QuerySerializer {
  constructor(request, error = {}, queryParam = undefined) {
    this.request = request;
    this.error = error;
    this.data = undefined;
    this.queryParam = queryParam;
  }
  getData() {
    return this.request.query ? this.request.query[this.queryParam] : undefined;
  }
  isValid() {
    this.data = this.getData();
    console.log(this.data);
    if (!this.data || this.data === undefined) {
      this.error = { errorMsg: `${this.queryParam} was not specified`, code: 400 };
      return false;
    }

    return true;
  }
  getResponse() {
    throw new Error("Not Implemented");
  }
}
module.exports = {
  QuerySerializer,
};
