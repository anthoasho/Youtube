chrome.commands.onCommand.addListener(function(tab) {
  chrome.tabs.executeScript(tab.ib, {
		file: 'inject.js'
	});
  chrome.tabs.insertCSS({file:"inject.css"});


});

console.log(chrome)
