# 站点静态路径
dirName="nav";

echo "--> yarn install"
cd ..
sudo yarn

echo "--> yarn build"
sudo yarn build

echo "--> resource update"
sudo rm -rf /home/web/$dirName/*
sudo cp -rf ./dist/* /home/web/$dirName/

echo " (๑•̀ㅂ•́)و✧ "
