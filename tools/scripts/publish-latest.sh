#!/bin/bash -eux

project=$1

echo "Publishing ${project}"

yarn build ${project} --prod --with-deps
yarn can-npm-publish dist/projects/${project} && yarn --cwd dist/projects/${project} publish --access public

echo "Done"
