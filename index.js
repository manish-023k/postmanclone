console.log("this  is the postman clone project");
//utility functions
// add the parameter by add
let add = 1;
// let arr = [];
// let bol=false;
function addHtml(html) {
    let div = document.createElement('div');
    div.innerHTML = html;
    return div.firstElementChild;
    // arr.push(html);
    // console.log("this is add array...");
    // console.log(arr);
    // document.getElementById('params').innerHTML = arr.toString();
}
//delete the parameter field
// function del(index) {
//     if (arr.length == 1) {
//         document.getElementById('params').innerHTML = "";
//         arr=[];
//         bol=true;
//     }
//     else {
//         for (let i = 0;i < arr.length;i++) {
//            if( arr[i].search(index))
//            {
//                arr.splice(i, 1);
//                break;

//            }

//         }
//         // console.log("this is delete array...");
//         // console.log(arr);
//         document.getElementById('params').innerHTML = arr.toString();
//     }  
// }
//intially hide the parameter box because the json is checked
let getJson = document.getElementById('getJson');
document.getElementById('parametersBox').style.display = 'none';
// if the json is selected than hide the parameterbox
getJson.addEventListener('click', function hide() {
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('requestBox').style.display = 'block';

})
let getCustom = document.getElementById('getCustom'); 
getCustom.addEventListener('click', function hide1() {
    document.getElementById('requestBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';

})
// if the user click on the + button than add the another parameters 
let addParam = document.getElementById('addParam1');
addParam.addEventListener('click', () => {
    // if(bol==true)
    // {
    //     add=1;
    //     bol=false;
    // }

    let html = ` <div class="form-group row  my-2">
        <label for="url" class="col-sm-2 col-form-label">Parameter ${add + 1}</label>
        <div class="col-sm-4">
        <input type="text" class="form-control" id="parameterKey${add + 1}" placeholder="Enter Parameter ${add + 1} Key">
        </div>
        <div class="col-sm-4">
        <input type="text" class="form-control" id="parameterValue${add + 1}" placeholder="Enter Parameter ${add + 1} Value">
        </div>
        <div class="col-sm-2">
        
        <button class="btn btn-outline-primary deleteparam">-</button>
        </div>
        </div>`;
    add = add + 1;
    // console.log(add);
    let frtelment = addHtml(html);
    document.getElementById('params').appendChild(frtelment);
    let deleteparam = document.getElementsByClassName('deleteparam');
    for (item of deleteparam) {

        item.addEventListener('click', function (e) {
            // console.log(e.target.parentElement.parentElement);
            // alert("")
            e.target.parentElement.parentElement.remove();
        })
    }

})
//functionality of the submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    console.log("my name is submit");
    let url = document.getElementById('url').value;
    let requestType = document.querySelector(`input[name='requestType']:checked`).value;
    let contentType = document.querySelector(`input[name='contentType']:checked`).value;
    //when the contentType is the parameter
    if (contentType == 'custom') {
        data = {};
        for (let i = 0; i < add + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('jsonText').value;
    }
    // for the debuging
    // console.log(url);
    // console.log(requestType);
    // console.log(contentType);
    // console.log(data);



    // when the requestType is get 
    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET'
        }).then(response => response.text()
            .then((text) => {
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            }));
    }

    // when the requestType is post
    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }}).then(response => response.text()
                .then((text) => {
                    document.getElementById('responsePrism').innerHTML = text;
                    Prism.highlightAll();
                }));

    }


})

