# Every time you update Kibana with a new build-pack, you need to use something in the name
# to bust the cache. passing a position argument here will append one for you.
#
# ex. ./build-it.sh 5
#
# That builds this artifacts like this: 5elastic-eui-theme-common-0.0.9.tgz

cacheBust=$1

cd packages/eui
yarn build:workspaces
echo `pwd`
  
cd ../eui-theme-borealis
yarn build && yarn pack --out %s-%v-${cacheBust}.tgz
package1=$(ls -t | head -n1)
# Because to commit this to Kibana for a POC you need to use snakecase
package1new="${package1//-/_}"
package1new="${package1new//@/}"
mv "${package1}" ../../../kibana/${package1new}

cd ../eui-theme-common
yarn build && yarn pack --out %s-%v-${cacheBust}.tgz
package2=$(ls -t | head -n1)
# Because to commit this to Kibana for a POC you need to use snakecase
package2new="${package2//-/_}"
package2new="${package2new//@/}"
mv "${package2}" ../../../kibana/${package2new}

cd ../eui
yarn build && yarn pack --out %s-%v-${cacheBust}.tgz
package3=$(ls -t | head -n1)
# Because to commit this to Kibana for a POC you need to use snakecase
package3new="${package3//-/_}"
package3new="${package3new//@/}"
mv "${package3}" ../../../kibana/${package3new}

wait
echo "Update package.json in Kibana with the following:
\"@elastic/eui\": \"file:./${package3new}\",
\"@elastic/eui-theme-borealis\": \"file:./${package1new}\",
\"@elastic/eui-theme-common\": \"file:./${package2new}\",
"
