#!/usr/bin/env bash
set -e

# 1) Cache testing config
~/Code/fosterlog/vendor/bin/sail artisan config:cache --env=testing

# 2) Run tests (accept any args, e.g. a single file)
~/Code/fosterlog/vendor/bin/sail artisan test "$@"
EXIT_CODE=$?

# 3) Clear the cache so dev goes back to .env
~/Code/fosterlog/vendor/bin/sail artisan config:clear

exit $EXIT_CODE
