(function(e) {
  let counter = 0;
  let selector = false;
  let page = 1;
  let perPage = 5;
	// just place a div at top right
  var style = document.createElement('link');
  let box = document.createElement("div");
  box.style.cssText = "position:absolute; top:0; left:0;z-index:200;min-width: 60px;box-shadow: 3px 3px 4px #00000020; list-style: none; font-weight: bold; text-align: center; font-size: 18px;background: white;";
  box.id = "icon-selector-box"
  document.body.appendChild(box)
style.rel = 'stylesheet';
style.type = 'text/css';
style.href = chrome.extension.getURL('inject.css');
// (document.head||document.documentElement).appendChild(style);
  let elem = document.activeElement;;
  if(!elem){
    alert("please do this correctly")
  }
  elem.addEventListener("keydown", checkDelete)
  elem.addEventListener("keypress", runScript)
  elem.addEventListener("focusout", clear)
  elem.addEventListener("blur", clear);
  elem.parentElement.classList.add("icon-searcher")
  init()
  function init(){
    if(!selector){
      var tb = document.activeElement.value.split(" ").pop()
     fetch(`https://codepoints.net/api/v1/search?q=${tb}&page=${page}&per_page=${perPage *3}`,{method: "GET"})
    .then(res => res.json())
    .then(function(data){
      data.result.forEach(uni => {
        let unicode= String.fromCharCode(uni)
        createList(unicode, box)
      })
      selector =true;
        let liItems= box.querySelectorAll("li")
        console.log(liItems)
        if(liItems.length > 1){
          liItems[counter].style.background = "#2d887d";
          liItems[counter].style.color = "white";

        if(counter >0){
         liItems[counter-1].style.background = "white";
         liItems[counter-1].style.color = "black";
        }
          counter++
        }
      })
    }
  }

  // Remeber to comment your code, kids.
  function runScript(e) {
    e.preventDefault()
    let elem = e.target
    if(!selector){
      var tb = elem.value.split(" ").pop()
     fetch(`https://codepoints.net/api/v1/search?q=${tb}&page=${page}&per_page=${perPage *3}`,{method: "GET"})
    .then(res => res.json())
    .then(function(data){
      data.result.forEach(uni => {
        let unicode= String.fromCharCode(uni)
        createList(unicode, box)
      })
      selector =true;
        let liItems= box.querySelectorAll("li")
        console.log(liItems)
        if(liItems.length > 1){
          liItems[counter].style.background = "#2d887d";
          liItems[counter].style.color = "white";

        if(counter >0){
         liItems[counter-1].style.background = "white";
         liItems[counter-1].style.color = "black";
        }
          counter++
        }
      })
    }


      if(e.keyCode == 8 || e.key== "Backspace"){
      clear(e)
      }
    if (e.keyCode == 92 ) {
      if(selector){
        if(counter >= perPage * 3){
          page++
          clear(e)
          console.log(page, counter, selector)
          counter = 1
        }
        let liItems= box.querySelectorAll("li")
        if(liItems.length > 1){
          liItems[counter].style.background = "#2d887d";
          liItems[counter].style.color = "white";

        if(counter >0){
         liItems[counter-1].style.background = "white";
         liItems[counter-1].style.color = "black";
        }
          counter++
        }


      }
      }
    if (e.keyCode == 13 ) {
      if(selector){
        let liItems= box.querySelectorAll("li")[counter -1]
        let tb = elem.value
        let newString = tb.substring(0, tb.lastIndexOf(" ") + 1) + liItems.innerText
        elem.value = newString
        selector = false;
        counter=0;
        clear(e)
      }

    }
    else{
      if (e.keyCode != 92 ){
      elem.value += e.key;
      }
    }
  }

  function createList(text, elem) {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(text));
    li.classList.add("icon-searcher-box")
    elem.appendChild(li)
  }
  function clear(e){
          elem = document.getElementById("icon-selector-box");
          selector = false
          counter = 0;
          elem.parentElement.querySelectorAll(".icon-searcher-box").forEach(e => {
            e.parentNode.removeChild(e)
          })
          document.activeElement.removeEventListener("keypress", runScript);
          document.activeElement.removeEventListener("keydown", checkDelete)

  }

  function checkDelete(e){
        if(e.keyCode == 8 || e.key== "Backspace"){
        clear(e)
      }
  }

})();

//spaghetti
