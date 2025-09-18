#!/bin/zsh
python3 scripts/regex_replace.py docs/13.Faults.html --in-place
python3 scripts/regex_replace.py docs/30.Groups.html --in-place
python3 scripts/regex_replace.py docs/55.GenericEvents.html --in-place
python3 scripts/regex_replace.py docs/80.ExtractComponents.js --in-place
python3 scripts/regex_replace.py docs/91.ClickMobileTemplates.html --in-place
python3 scripts/regex_replace.py docs/xomIndex.js --in-place
