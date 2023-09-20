#!/bin/bash

BUILD="./dist/."
TARGET="../YPPA"
pnpm run build

cp -r $BUILD $TARGET