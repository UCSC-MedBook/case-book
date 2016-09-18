export MONGO_URL="mongodb://127.0.0.1:27017/MedBook"
#export ROOT_URL="http://10.1.1.145:3001"
#export ROOT_URL="http://localhost:3001"

echo MONGO_URL $MONGO_URL
echo ROOT_URL $ROOT_URL
if [ -z "$1" ]; then
    meteor --port 3003
else
    meteor $1 --port 3003
fi
