#
export PEM="/Users/baertsch/Documents/CancerCommonsEngineering.pem"
export MONGO_URL="mongodb://127.0.0.1:27017/MedBook"
export REMOTE_HOST="casebookdemo.cancercommons.org"
export ROOT_URL="https://${REMOTE_HOST}"
export USERNAME="ubuntu"
export REMOTE_DIRECTORY="/app/case-book"
export REMOTE_LOG_DIR="/var/log/case-book"
export MONGO_URL="mongodb://127.0.0.1:27017/MedBook"

echo "Copying meteor app to $REMOTE_HOST ${REMOTE_DIRECTORY}"
echo scp -pr -i ${PEM} ../build/ ${USERNAME}@${REMOTE_HOST}:${REMOTE_DIRECTORY}
#scp -pr -i ${PEM} ../build/ ${USERNAME}@${REMOTE_HOST}:${REMOTE_DIRECTORY}
scp -pr -i ${PEM} ../config/kadira.sh ${USERNAME}@${REMOTE_HOST}:${REMOTE_DIRECTORY}
echo "Extracting tar ; install npm and starting App ; Logging to ${REMOTE_LOG_DIR}"
ssh -i ${PEM} ${USERNAME}@${REMOTE_HOST} "forever stopall ; (cd ${REMOTE_DIRECTORY}/build ; rm -rf bundle ; tar xvfz webapp.tar.gz ; cd bundle/programs/server && npm install ) ; cd ${REMOTE_LOG_DIR} ; rm * ; source ${REMOTE_DIRECTORY}/kadira.sh ; PORT=3000 MONGO_URL=${MONGO_URL}  ROOT_URL=${ROOT_URL} forever start  --minUptime 1000 -l ${REMOTE_LOG_DIR}/cb.log -e ${REMOTE_LOG_DIR}/cb.err -o ${REMOTE_LOG_DIR}/cb.out ${REMOTE_DIRECTORY}/build/bundle/main.js [Daemon]"
