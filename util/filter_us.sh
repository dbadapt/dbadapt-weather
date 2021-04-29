#!/usr/bin/env bash

UTIL_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
EXTDATA_DIR="${UTIL_DIR}/../extdata"
DATA_DIR="${UTIL_DIR}/../src/data"
SRC_URL="http://bulk.openweathermap.org/sample/city.list.json.gz"

# Download and decompress city data
mkdir -p "${EXTDATA_DIR}"
curl ${SRC_URL} > "${EXTDATA_DIR}/city.list.json.gz"
gzip -df "${EXTDATA_DIR}/city.list.json.gz"

echo "Filtering Open Weather Map city list to make US city list"
pushd "${UTIL_DIR}" > /dev/null || exit
./filter_us.js > "${DATA_DIR}/cities.js"
ls -l "${DATA_DIR}/cities.js"
popd > /dev/null || exit
