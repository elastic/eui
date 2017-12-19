#!/bin/bash

set -e

eui="$(pwd)"

while getopts 'e:' arg
do
  case ${arg} in
    e) eui=${OPTARG};;
    *) return 1 # illegal option
  esac
done

"${eui}/scripts/compile-clean.sh"
"${eui}/scripts/compile-scss.sh"
"${eui}/scripts/compile-eui.sh"
