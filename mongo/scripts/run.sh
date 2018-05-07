#!/bin/bash

# Initialize first run
if [[ -e /.frun ]]; then
    /scripts/frun.sh
fi

# Start MongoDB
echo "Starting MongoDB..."
/usr/bin/mongod --dbpath /data --auth $@
