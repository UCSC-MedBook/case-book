export MONGO_URL="mongodb://localhost:27017/MedBook"
export ROOT_URL="http://10.1.1.145:3001"

if [ -z "$1" ]; then
    meteor --port 3001
else
    meteor $1 --port 3001
fi
