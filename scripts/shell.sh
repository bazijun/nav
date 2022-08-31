#!/bin/bash
# 站点静态路径
dirName="nav";

echo "--> yarn install"
cd ..
sudo yarn

echo "--> yarn build"
sudo yarn build

echo "--> resource update"
sudo rm -rf /home/web/nav/*
sudo cp -rf ./dist/* /home/web/nav/

echo " (๑•̀ㅂ•́)و✧ "
