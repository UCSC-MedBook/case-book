#
export PEM="/Users/baertsch/Documents/CancerCommonsEngineering.pem"
export REMOTE_HOST="stage.casebook.cancercommons.org"
export ROOT_URL="https://${REMOTE_HOST}"
export USERNAME="ubuntu"
export REMOTE_DIRECTORY="/app/case-book"
export REMOTE_LOG_DIR="/var/log/case-book"

cd webapp
pwd
DEPLOY_HOSTNAME=us-east-1.galaxy-deploy.meteor.com meteor deploy https://stage.casebook.cancercommons.org --settings ../config/settings.json
