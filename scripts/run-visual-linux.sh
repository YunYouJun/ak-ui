#!/usr/bin/env sh

set -eu

playwright_image="${PLAYWRIGHT_IMAGE:-mcr.microsoft.com/playwright:v1.62.1-noble}"
repository_root=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
mkdir -p "${repository_root}/test-results"

# Runs the browser suite in the pinned Playwright image that matches CI, for
# reproducing Linux-only Firefox/WebKit behavior without local browser installs.

docker run --rm --init --ipc=host \
  --mount "type=bind,source=${repository_root},target=/work" \
  --mount type=volume,target=/work/node_modules \
  --mount type=volume,source=ak-ui-pnpm-store-v10,target=/work/.pnpm-store \
  --mount type=volume,target=/work/docs/.vitepress/cache \
  --mount type=volume,target=/work/docs/.vitepress/dist \
  --mount type=volume,target=/work/playwright-report \
  --mount "type=bind,source=${repository_root}/test-results,target=/work/test-results" \
  --workdir /work \
  --env COREPACK_HOME=/work/.pnpm-store/corepack \
  --env "LOCAL_UID=$(id -u)" \
  --env "LOCAL_GID=$(id -g)" \
  "${playwright_image}" \
  bash -lc '
    corepack enable
    pnpm install --frozen-lockfile
    set +e
    pnpm test:visual "$@"
    test_status=$?
    chown -R "$LOCAL_UID:$LOCAL_GID" test-results
    exit "$test_status"
  ' -- "$@"
