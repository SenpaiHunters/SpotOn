window.onload = function () {
    const onoff = document.getElementById("toggle_button")
    var temp=1;

    
    /*

      "background": {
    "service_worker": "background.js"
  },
    const stat =chrome.storage.sync.get('skin');
    
    if(stat=="true"){
        onoff.checked = true;
        console.log("Enabled");
        }
    if(stat=="false"){
        onoff.checked = false;
        console.log("disabled");
        }
    
    */
    let queryOptions = { active: true, currentWindow: true };
    tabs = chrome.tabs.query(queryOptions, tabs => {
        //console.log(tabs[0]);
        console.log('checking status');
        chrome.tabs.sendMessage(
        tabs[0].id,
        { txt:"check",
        bool:"" },
        function (response) {
            //console.log(response);
            if(response==undefined){
                document.getElementsByClassName("container")[0].innerHTML='<a id="title">-- Open in spotify for options --</a>';
            }
            else{
                if(response.status==1){
                    temp=1;
                    onoff.checked = true;
                    console.log("Enabled");
                }
                else{
                    temp=0;
                    onoff.checked = false;
                    console.log("Disabled");
            }}
        });
    });
    
    onoff.addEventListener('click',()=>{
        let queryOptions = { active: true, currentWindow: true };

        tabs = chrome.tabs.query(queryOptions, tabs => {
            console.log(tabs[0].id);
            
            if(temp==0){ 
                console.log('sending enable');
                chrome.tabs.sendMessage(
                tabs[0].id,
                { txt:"enable",
                bool:"true" },
                function (response) {
                    console.log(response.status);
                });
                temp=1;
                onoff.checked = true;;
            }
            else{ 
                console.log('sending disable');
                chrome.tabs.sendMessage(
                tabs[0].id,
                { txt:"disable",
                bool:"false" },
                function (response) {
                    console.log(response.status);
                });
                temp=0;
                onoff.checked = false;
            }
            });
        });
    };
