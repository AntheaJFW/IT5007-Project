#!/bin/sh

if [[ $# -eq 0 ]] ; then
    echo 'Please provide a commit message'
    exit 1
fi

yarn build-storybook
cd ./storybook-static

git commit -am "$1"
git push origin gh-pages