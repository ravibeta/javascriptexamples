/*
* Test the UI for Summarizer
*/
 
"use strict";
 
var webdriver = require('selenium-webdriver');
var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome' }).build();
 
function logTitle() {
    browser.getTitle().then(function(title) {
        console.log('Current Page Title: ' + title);
    });
}
 
function clickLink(link) {
    link.click();
}
 
function handleFailure(err) {
    console.error('Something went wrong\n', err.stack, '\n');
    closeBrowser();
}
 
function hasSummary() {
    return browser.findElement(webdriver.By.div[@id='chatbox']).getText() == `Why cyclists should be able to roll through stop signs and ride through red lights While it's obviously reckless for them to blow through an intersection when they 

don't have the right of way, research and common sense say that slowly rolling through a stop sign on a bike Some places in the US already allow cyclists to treat stop signs as yields, and red lights as stop signs, and these rules are no more 

dangerous and perhaps even a little safer than the status quo There are already a few places in the US that allow cyclists some flexibility in dealing with stop signs and red lights`;
}
 
function closeBrowser() {
    browser.quit();
}
 
browser.get('http://54.214.122.120:8668/add/');
var text = `Why cyclists should be able to roll through stop signs and ride through red lights 
If you've looked around a city lately, you might've noticed that many cyclists don't obey some traffic laws. They roll through stop signs, instead of coming to a complete stop, and brazenly ride through red lights if there aren't any cars coming.
Cyclists reading this might be nodding guiltily in recognition of their own behavior. Drivers might be angrily remembering the last biker they saw flout the law, wondering when traffic police will finally crack down and assign some tickets.
But the cyclists are probably in the right here. While it's obviously reckless for them to blow through an intersection when they don't have the right of way, research and common sense say that slowly rolling through a stop sign on a bike
shouldn't be illegal in the first place.
Some places in the US already allow cyclists to treat stop signs as yields, and red lights as stop signs, and these rules are no more dangerous and perhaps even a little safer than the status quo.
This is called the 'Idaho stop'.
There are already a few places in the US that allow cyclists some flexibility in dealing with stop signs and red lights. Idaho has permitted it since 1982, which is why this behavior is known as the Idaho stop.
Idaho's rule is pretty straightforward. If a cyclist approaches a stop sign, he or she needs to slow down and look for traffic. If there's already a pedestrian, car, or another bike there, then the other vehicle has the right of way. If there's no 

traffic, however, the cyclist can slowly proceed. Basically, for bikers, a stop sign is a yield sign.
If a cyclist approaches a red light, meanwhile, he or she needs to stop fully. Again, if there's any oncoming traffic or a pedestrian, it has the right of way. If there's not, the cyclist can proceed cautiously through the intersection. Put simply, 

redlight is a stop sign.
This doesn't mean that a cyclist is allowed to blast through an intersection at full speed which is dangerous for pedestrians, the cyclist, and pretty much everyone involved. This isn't allowed in Idaho, and it's a terrible idea everywhere.
`;
browser.findElement(webdriver.By.name('text')).sendKeys(text);
browser.findElement(webdriver.By.name('submitmsg')).click();
browser.wait(hasSummary, 2000).then(clickLink).then(logTitle).then(closeBrowser, handleFailure);
