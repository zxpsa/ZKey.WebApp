dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $dir
cd src
fis3 release pro -c
echo "$(pwd)"
