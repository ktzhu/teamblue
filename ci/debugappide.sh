#!/bin/zsh

BUILD_PATH=$(dirname $0)

while [[ -z $BUILD_FILE && $BUILD_PATH != "/" ]]; do
BUILD_FILE=$(find $BUILD_PATH -name '*.xcodeproj' -maxdepth 1)
BUILD_PATH=$(dirname $BUILD_PATH)
done

if [[ -z $BUILD_FILE ]]; then
echo "Couldn't find an xcode project file in directory"
exit 1
fi

# Applescript likes's : instead of / (because it's insane)
BUILD_FILE=${BUILD_FILE//\//:}

echo $BUILD_FILE

# Find the latest Simulator SDK
SIMULATOR_SDKS=( /Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/*.sdk )

SIMULATOR_SDK=${SIMULATOR_SDKS[-1]} 
SIMULATOR_SDK_STRING=$(basename ${(L)SIMULATOR_SDK%.[a-z]*})

if [[ -z $SIMULATOR_SDK ]]; then
echo "Couldn't find a simulator SDK"
exit 1
fi

open -a Xcode "./HelloWorld.xcodeproj"

osascript <<SCRIPT
tell application "Xcode"
activate
delay 5
set myWorkspace to active workspace document
set targetProject to the first project of myWorkspace
activate
tell targetProject
build targetProject
end tell
end tell

SCRIPT