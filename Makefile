################################################################################
# Makefile for Rule Engine Repository
################################################################################

# Prefer bash shell
export SHELL=/bin/bash
mkfile_path := $(abspath $(lastword $(MAKEFILE_LIST)))
## Define repositories dependencies paths

## Make sure of current python path
export PYTHONPATH=$(pwd):$(pwd)./

self := $(abspath $(lastword $(MAKEFILE_LIST)))
parent := $(dir $(self))

ifneq (,$(VERBOSE))
    override VERBOSE:=
else
    override VERBOSE:=@
endif
BACKEND_DIR:="$(PWD)"

# docker build and params define
CWD := $(notdir $(patsubst %/,%,$(dir $(mkfile_path))))
tag_version:="latest"


.PHONY: smoke
smoke:
	$(VERBOSE) npm run test
.PHONY: install
install:
	$(VERBOSE) npm install
	$(VERBOSE) docker-compose build server
.PHONY: startrapp
startrapp:
	$(VERBOSE) docker-compose run --service-ports server
.PHONY: fire_db
fire_db:
	$(VERBOSE) docker-compose up -d database
.PHONY: build_frontend_js
build_frontend_js:
	$(VERBOSE) ($call build_frontend_js)
