export MONGO_URL="mongodb://localhost:27017/MedBook"
export METEOR_OFFLINE_CATALOG=1

if [ -z "$1" ]; then
    meteor --port 3001
else
    meteor $1 --port 3001
fi
