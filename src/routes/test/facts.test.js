/** @format */

const { FactsRouterSerializer } = require("../facts");

const getRequestFixture = (queryParams) => {
  return {
    query: queryParams,
  };
};

it("We check the initialization of the facts router serializer input search instance for a regular case ", () => {
  const data = "test";
  const factsRouterSerializer = new FactsRouterSerializer((request = getRequestFixture({ tableName: data })));
  expect(factsRouterSerializer.isValid()).toEqual(true);
  expect(factsRouterSerializer.error).toEqual({});
  expect(factsRouterSerializer.data).toEqual(data);
});
