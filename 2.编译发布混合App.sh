dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $dir
cd src
fis3 release hyapp -c
echo "$(pwd)"
