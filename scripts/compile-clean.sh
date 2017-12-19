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

rm -rf "${eui}/dist" "${eui}/lib"
