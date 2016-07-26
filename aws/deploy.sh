# deploy.sh
#! /bin/bash

SHA1=$1

# Configure aws (aws_access_key_id and aws_secret_access_key are set on circle-ci server)
aws --version
aws configure set default.region eu-central-1

# Create new Elastic Beanstalk version
EB_BUCKET=elasticbeanstalk-eu-central-2-communicator-demo-config
APP_NAME='Leafdock Communicator Demo'
ENV_NAME=leafdockCommunicatorDemo-env
DOCKERRUN_FILE=Dockerrun_$SHA1.aws.json
echo 'Saving new docker file to S3: $DOCKERRUN_FILE'
sed -e 's/<TAG>/$SHA1/' -e 's/<EB_BUCKET>/$EB_BUCKET/' aws/Dockerrun.aws.json.template > $DOCKERRUN_FILE
aws s3 cp $DOCKERRUN_FILE s3://$EB_BUCKET/$DOCKERRUN_FILE
aws elasticbeanstalk create-application-version --application-name $APP_NAME \
  --version-label $SHA1 --source-bundle S3Bucket=$EB_BUCKET,S3Key=$DOCKERRUN_FILE

# Update Elastic Beanstalk environment to new version
aws elasticbeanstalk update-environment --environment-name $ENV_NAME \
    --version-label $SHA1
