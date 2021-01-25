
var count=0;
var initialform = document.getElementById("initial-form");
var main = document.getElementById("response-form");
var upvote = '<div class="col-md-2 ubtn" onclick="Upvote(event,id)"><i class="fas fa-arrow-up"></i> ';
var downvote = '<div class="col-md-2 dbtn" onclick="Downvote(event,id)"><i class="fas fa-arrow-down"></i> ';
var ubtn = document.getElementsByClassName("ubtn");
var dbtn = document.getElementsByClassName("dbtn");
var flag=0;
var resolvebtn = document.querySelector("button.resolve");
var question=[
    // {
    //     id:0,
    //     subject:"Web Dev",
    //     des:"What is DEV?",
    //     response:[
    //         {
    //             name:"Amit",
    //             ans:"dsjfjkhdskjhfkjshjkdf dfkjhsdkjfhjsdhf khdfkjsdjfsd khdfkjsdkjfhskjhkjdfh dhffkjsdhfkjs",
    //             upvotes:2,
    //             downvotes:1
    //         }
    //     ]
    //     upvotes:5,
    //     downvotes:10,
    //     fav:3
    // }
]

function addQues(){
    var sub = document.getElementById("subject");
    var des = document.getElementById("des");
    if(sub.value===""  || des.value===""){
        window.alert("Please enter a valid question!");
    }
    else{
        var new_obj={
            id:count,
            subject:sub.value,
            des:des.value,
            response:[],
            upvotes:0,
            downvotes:0

        }
        question.push(new_obj);
        console.log(question);
        var mainques = document.getElementsByClassName("questions")[0];
        var innerdiv = document.createElement("div");
        innerdiv.setAttribute("class","row");
        var quesdiv = document.createElement("div");
        var subject = document.createElement("h1");
        var description = document.createElement("p");
        description.innerHTML = des.value;
        subject.innerHTML = sub.value;
        quesdiv.setAttribute("class","onequestion");
        quesdiv.setAttribute("id",count);
        quesdiv.setAttribute("onclick","displayQues(id)");
        quesdiv.appendChild(subject);
        quesdiv.appendChild(description);
        innerdiv.innerHTML=innerdiv.innerHTML+" "+upvote+question[count].upvotes+"</div>";
        innerdiv.innerHTML=innerdiv.innerHTML+" "+downvote+question[count].downvotes+"</div>";
        quesdiv.appendChild(innerdiv);
        sub.value="";
        des.value="";
        mainques.appendChild(quesdiv);
        ubtn[count].setAttribute("id",count);
        dbtn[count].setAttribute("id",count);
        count++;
    }


}

function displayQues(id){
    //displayques
    //responses
    var quest = document.getElementsByClassName("displayques")[0];
    quest.innerHTML="";
    var h = document.createElement("h5");
    var p =document.createElement("p");
    h.innerHTML = question[id].subject;
    p.innerHTML = question[id].des;
    quest.appendChild(h);
    quest.appendChild(p);
    var resp = document.getElementsByClassName("responses")[0];
    resp.innerHTML ="";
    for(var i=0;i<question[id].response.length;i++){
        var reddiv = document.createElement("div");
        var name = document.createElement("h5");
        var comment = document.createElement("p");
        name.innerHTML = question[id].response[i].name;
        comment.innerHTML = question[id].response[i].ans;
        reddiv.appendChild(name);
        reddiv.appendChild(comment);
        reddiv.setAttribute("class","oneres");
        resp.appendChild(reddiv);
    }
    initialform.setAttribute("hidden","true");
    main.removeAttribute("hidden");
    var responsesubmit  = document.getElementsByClassName("responsesubmit")[0];
    responsesubmit.setAttribute("id",id);
    var resolve=  document.getElementsByClassName("resolve")[0];
    resolve.setAttribute("id",id);


}

function addResponse(id){
    console.log(id);
    var resp = document.getElementsByClassName("responses")[0];
    var name = document.getElementById("name");
    var comment = document.getElementById("comment");
    var reddiv = document.createElement("div");
    var h = document.createElement("h5");
    var p = document.createElement("p");
    h.innerHTML = name.value;
    p.innerHTML = comment.value;
    reddiv.appendChild(h);
    reddiv.appendChild(p);
    reddiv.setAttribute("class","oneres");
    resp.appendChild(reddiv);
    new_obj = {
        name:name.value,
        ans:comment.value,
        upvote:0,
        downvote:0
    }
    question[id].response.push(new_obj);
    name.value="";
    comment.value="";
    console.log(question);

}

function Showform(){
    main.setAttribute("hidden","true");
    initialform.removeAttribute("hidden");
}

function ResolveQues(id){
    question.splice(id,1);
    question.sort(function(a,b){
        return (b.upvotes-b.downvotes)-(a.upvotes-a.downvotes);
    });
    for(var j=0;j<question.length;j++)
    {
        console.log(question[j].id);
        question[j].id = j;
        console.log(question[j].id);
    }    
    initialform.removeAttribute("hidden");
    main.setAttribute("hidden","true");

    var list = document.getElementsByClassName("questions")[0];
    list.innerHTML = "";
    for(var l=0;l<question.length;l++){
        var div = document.createElement("div");
        var innerdiv = document.createElement("div");
        innerdiv.setAttribute("class","row");
        innerdiv.innerHTML+=upvote+question[l].upvotes+"</div>";
        innerdiv.innerHTML+=downvote+question[l].downvotes+"</div>";
        div.setAttribute("class","onequestion");
        div.setAttribute("id",l);
        div.setAttribute("onclick","displayQues(id)");
        var h = document.createElement("h1");
        h.innerHTML = question[l].subject;
        var p = document.createElement("p");
        p.innerHTML = question[l].des;
        div.appendChild(h);
        div.appendChild(p);
        div.appendChild(innerdiv);
        list.appendChild(div);
        ubtn[l].setAttribute("id",l);
        dbtn[l].setAttribute("id",l);
    }
    count--;


}

function searchResult(){
    var search = document.getElementsByClassName("searchbar")[0];

    var result = question.filter((q)=>q.subject.includes(search.value));
    // result.sort(function(a,b){
    //     return b.upvotes-a.upvotes;
    // });
    // for(var j=0;j<result.length;j++)
    // {
    //     console.log(result[j].id);
    //     result[j].id = j;
    //     console.log(result[j].id);
    // }
    var list = document.getElementsByClassName("questions")[0];
    list.innerHTML = "";
    console.log(result);
    for(var l=0;l<result.length;l++){
        var div = document.createElement("div");
        var innerdiv = document.createElement("div");
        innerdiv.setAttribute("class","row");
        div.setAttribute("class","onequestion");
        div.setAttribute("id",result[l].id);
        div.setAttribute("onclick","displayQues(id)");
        var h = document.createElement("h1");
        var f = result[l].subject;
        if(search.value!==""){
            var i = result[l].subject.indexOf(search.value);
            f = result[l].subject.slice(0,i)+ "<span style='background-color:yellow'>" + search.value+ "</span>" + result[l].subject.slice(i+search.value.length,result[l].subject.length); 
        }
        h.innerHTML = f;
        var p = document.createElement("p");
        innerdiv.innerHTML=innerdiv.innerHTML+" "+upvote+result[l].upvotes+"</div>";
        innerdiv.innerHTML=innerdiv.innerHTML+" "+downvote+result[l].downvotes+"</div>";
        p.innerHTML = result[l].des;
        div.appendChild(h);
        div.appendChild(p);
        div.appendChild(innerdiv);
        list.appendChild(div);
        ubtn[l].setAttribute("id",result[l].id);
        dbtn[l].setAttribute("id",result[l].id);
    }
}

function Upvote(e,id){
    question[id].upvotes++;
    console.log(question);
    question.sort((a,b)=>
    {
    return b.upvotes-a.upvotes;
    }
    )
    for(var i=0;i<question.length;i++)
    {
        question[i].id=i;
    }
    renderLeft(question);
    // e.stopPropagation();
}

function Downvote(e,id){

    question[id].downvotes++;
    question.sort((a,b)=>
    {
    return b.upvotes-a.upvotes;
    }
    )
    for(var i=0;i<question.length;i++)
    {
        question[i].id=i;
    }
    // e.stopPropagation();
    renderLeft(question);
}

function renderLeft(question){
    var list = document.getElementsByClassName("questions")[0];
    list.innerHTML = "";
    for(var l=0;l<question.length;l++){
        var div = document.createElement("div");
        var innerdiv = document.createElement("div");
        innerdiv.setAttribute("class","row");
        div.setAttribute("class","onequestion");
        div.setAttribute("id",l);
        div.setAttribute("onclick","displayQues(id)");
        var h = document.createElement("h1");
        h.innerHTML = question[l].subject;
        var p = document.createElement("p");
        p.innerHTML = question[l].des;
        innerdiv.innerHTML=innerdiv.innerHTML+" "+upvote+question[l].upvotes+"</div>";
        innerdiv.innerHTML=innerdiv.innerHTML+" "+downvote+question[l].downvotes+"</div>";
        div.appendChild(h);
        div.appendChild(p);
        div.appendChild(innerdiv);

        list.appendChild(div);
        ubtn[l].setAttribute("id",l);
        dbtn[l].setAttribute("id",l);
    }
}