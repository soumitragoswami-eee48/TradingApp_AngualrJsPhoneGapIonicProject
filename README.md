# PhoneGap App Template 

A PhoneGap Ionic App using Angular Js
## Usage

#### PhoneGap CLI

Pre-requisites:
1) install phonegap cli (-v : 9.0.0 for Ubuntu , alternatively use phonegap App for Windows/Mac and create a hello world app and replace www folder and config.xml from this process)
2) node version (>10.15.3 - nvm install 10.15.3
3) cd into project directory and run -  phonegap build
4) run - phonegap serve ( or phonegap app , add "-d" at the end to see debug logs - for ex: phonegap app -d )
5) if the App starts up, you should something like :

    [phonegap] starting app server...
    [phonegap] listening on 192.168.43.202:3000
    [phonegap] 
    [phonegap] ctrl-c to stop the server
    
    this has autoreload enabled by default, so any changes done wil reflect in the web pages in real time 
    
  the pages can be viewed by hitting this url in the browser
  for running in mobile - 
  1) download the PhoneGap Developer App in your device from Google Store
  2) connect the phone to the same network on which the laptop with the phonegap app running is on
  3) disable firewall - sudo ufw disable (for Ubuntu) 
  4) Enter the same url and port used for web view in the developer app, if everything goes fine, the view wil load in the app
  
  This app is made for a Hackathon Submission to sahamati.org and utilises the Account Aggregator apis to provide a seamless loan application for End users. The backend code can be cloned from here - https://github.com/Mathivanan-Paulraj/AAHackathon 
  
  
  

   
