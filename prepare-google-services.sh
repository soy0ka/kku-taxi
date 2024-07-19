#!/bin/bash

# Create the directory if it doesn't exist
mkdir -p ./googleServices

# Decode the base64 strings and create the files
echo $GOOGLE_SERVICES_JSON_BASE64 | base64 --decode > ./googleServices/google-services.json
echo $GOOGLE_SERVICES_PLIST_BASE64 | base64 --decode > ./googleServices/GoogleService-Info.plist