ps -ef | grep iPhoneSimulator | awk '{print $2}' | xargs kill -9
killall HelloWorld