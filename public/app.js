var api_btn = document.getElementById('api_call');




api_btn.addEventListener('click', function (e)
{
    console.log(e);
    var myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function () {
        if (myRequest.readyState === 4 && myRequest.status ===200) {
            alert(myRequest.responseText);
      } 
    }

    myRequest.open("GET", '/call');
    myRequest.send();

})