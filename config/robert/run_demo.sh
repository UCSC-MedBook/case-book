export MONGO_URL="mongodb://127.0.0.1:27017/MedBook"
export ROOT_URL="https://casebookdemo.cancercommons.org

echo MONGO_URL $MONGO_URL
echo ROOT_URL $ROOT_URL
if [ -z "$1" ]; then
    meteor --port 3000
else
    meteor $1 --port 3000
fi
