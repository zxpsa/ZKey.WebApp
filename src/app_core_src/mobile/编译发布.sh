dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $dir
fis3 release pro -wc
echo "$(pwd)"
