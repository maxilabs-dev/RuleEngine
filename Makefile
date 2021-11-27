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

# Functions
define save_db_file
    $(VERBOSE) docker-compose exec database bash -c 'pg_dump $(DATABASE_URL) --data-only --file=./database/mock_db/data.sql'
    $(VERBOSE) docker-compose exec database bash -c 'pg_dump $(DATABASE_URL) --schema-only --file=./database/mock_db/schema.sql'
endef

define build_frontend_js
    $(VERBOSE) docker-compose run --rm --entrypoint=/bin/sh frontend /bin/sh -c "npm run build"
endef

# docker build and params define
CWD := $(notdir $(patsubst %/,%,$(dir $(mkfile_path))))
tag_version:="latest"


.PHONY: smoke
smoke:
	$(VERBOSE) npm run test
.PHONY: fire_db
fire_db:
	$(VERBOSE) docker-compose up -d database
.PHONY: build_frontend_js
build_frontend_js:
	$(VERBOSE) ($call build_frontend_js)
