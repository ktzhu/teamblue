tell application "Xcode"
    open "Users:NorThanapon:Documents:Developments:PhoneGapProjects:teamblue:HelloWorld.xcodeproj"
            clean
            build
            (* for some reasons, debug will hang even the debug process has completed. 
               The try block is created to suppress the AppleEvent timeout error 
             *)
            try
                debug
            end try    
    quit
end tell
