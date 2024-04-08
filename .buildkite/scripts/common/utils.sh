#!/bin/bash

function retry {
  local retries=$1
  shift

  local count=0

  until "$@"; do
    exit=$?
    wait=$((2 ** count))
    count=$((count + 1))
    
    if [ $count -lt "$retries" ]; then
      >&2 echo "Retry $count of $retries exited $exit. Retrying in $wait seconds."
    else
      >&2 echo "Retry $count of $retries exited $exit. No retries left."
      return $exit
    fi

  done
  return 0
}
