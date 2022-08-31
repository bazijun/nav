#!/bin/bash
# 站点静态路径
dirName="nav";

echo "--> yarn install"
cd ..
yarn

echo "--> yarn build"
yarn build

echo "--> resource update"
rm -rf /home/web/"$dirName"/*
cp -rf ./dist/* /home/web/"$dirName"/

echo " (๑•̀ㅂ•́)و✧ "
