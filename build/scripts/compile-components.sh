#!/bin/bash

mkdir -p dist/components

babel --quiet --source-maps --out-dir=dist/components src/components
