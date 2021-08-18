#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

CSVURL="https://docs.google.com/spreadsheets/d/1_t2wcwZ19RA2TExW4og7ETEZmMiiDoyNrpB4r29_zuM/export?format=csv&id=1_t2wcwZ19RA2TExW4og7ETEZmMiiDoyNrpB4r29_zuM&gid=0"

wget -qO $DIR/../LANGUAGE.CSV "$CSVURL" && python3 $DIR/updateOldLocalization.py
echo "OK!"
