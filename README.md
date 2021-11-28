<!-- @format -->

# Rule Engine

## Introduction

- The system manages table facts
- Facts are data points.
- Fact possible types (string, int, Boolean or date).
- Facts are conditions, queries run on a table.
- Rules are (messages, recommendations, alerts) analyzed and based on facts.

# Requiremets

- node js 16
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

- Node js Rest API
- Node js Jest testing framwork
- Node Package sequelize

## Installation

- `make install`

## Run Application

- `make startapp`
- `make startapp_js`
- `npm start`

![Run Application]()
