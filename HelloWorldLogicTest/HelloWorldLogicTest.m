//
//  HelloWorldLogicTest.m
//  HelloWorldLogicTest
//
//  Created by Thanapon Noraset on 10/1/11.
//  Copyright 2011 Northwestern University. All rights reserved.
//

#import "HelloWorldLogicTest.h"

@implementation HelloWorldLogicTest

- (void)setUp
{
    [super setUp];
    
    // Set-up code here.
    webView = [[UIWebView alloc] init];
    NSString *urlAddress = @"http://localhost:9876/capture";
    
    //Create a URL object.
    NSURL *url = [NSURL URLWithString:urlAddress];
    
    //URL Requst Object
    NSURLRequest *requestObj = [NSURLRequest requestWithURL:url];
    
    //Load the request in the UIWebView.
    [webView loadRequest:requestObj];

}

- (void)tearDown
{
    // Tear-down code here.
    [webView stopLoading];
    [webView release];
    [super tearDown];
}

- (BOOL)waitForCompletion:(NSTimeInterval)timeoutSecs {
    NSDate *timeoutDate = [NSDate dateWithTimeIntervalSinceNow:timeoutSecs];
    do {
        [[NSRunLoop currentRunLoop] runMode:NSDefaultRunLoopMode beforeDate:timeoutDate];
        if([timeoutDate timeIntervalSinceNow] < 0.0)
            break;
    } while (!done);
    return done;
}


- (void)testJavascript
{
    STAssertNotNil(webView, @"webView was not running");
    STAssertTrue([self waitForCompletion:90], @"Time out: the test driver has not responded");
}

@end
