echo 'Close iPhoneSimulator'
ps -ef | grep iPhoneSimulator | awk '{print $2}' | xargs kill -9
echo 'what!? the server is not ready i will take a nap zzZzzZ'
sleep 30
echo 'Go go go'
/Developer/Platforms/iPhoneSimulator.platform/Developer/Applications/iPhone\ Simulator.app/Contents/MacOS/iPhone\ Simulator -SimulateApplication build/Debug-iphonesimulator/HelloWorld.app/HelloWorld
