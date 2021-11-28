<!-- @format -->

# Rule Engine

## Introduction

- The system manages table facts
- Facts are data points.
- Fact possible types (string, int, Boolean or date).
- Facts are conditions, queries run on a table.
- Rules are (messages, recommendations, alerts) analyzed and based on facts.

### Doc Specification

https://docs.google.com/document/d/1SlA-p_O2ILIqJPmDqQUKmrU9UbQLG5pX4oW7QVndzuY/edit

# Design

![Design](https://raw.githubusercontent.com/maxilabs-dev/RuleEngine/master/docs/RuleEngineSchema.jpg)

## Requiremets

- node 16
- docker, docker-compose (not a must)

## Infrastructure

- Api Rest server
  - facts Route
  - rules Route
- Engine
  - database manager
  - engine fact
  - engine rule

## Dependencies

- Node js Rest API (express)
- Node Package sequelize
- Node js Jest testing framwork

## Installation

- `make install`

## Run Application

- `make startapp`
- `make startapp_js`
- `npm start`

## Run suit tests

- `make smoke`

![Run Application](https://raw.githubusercontent.com/maxilabs-dev/RuleEngine/master/docs/console_run.jpg)

#### The api now answers on 2 paths

- Facts - http://localhost:5000/facts?tableName=your_table_name
- Rules - http://localhost:5000/rules?tableName=your_table_name

![Api Example](https://raw.githubusercontent.com/maxilabs-dev/RuleEngine/master/docs/routes.jpg)
