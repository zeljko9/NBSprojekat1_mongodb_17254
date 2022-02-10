import { Searchpage } from "./searchpage.js";

export class User{
    constructor(usr, mp, sr){
        this.container=null;
        this.username=usr;
        this.my_photos=mp;
        this.share_req=sr;
    }

    drawUser(host){
        document.getElementsByClassName("kont")[0].remove();
        
        this.container=document.createElement("div");
        this.container.className="kont";

        let link=document.createElement("href");
        link.innerHTML="Searchpage";
        link.onclick=(ev)=>{
            fetch("http://localhost:5000/allPhotos",{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            })
            .then(response=>response.json())
            .then(data => {
                    const sp=new Searchpage(this.username, this.my_photos, data);
                    sp.drawSearchpage(document.body);
            }).catch(p => {
                alert("Error!");
            });
        }
        this.container.appendChild(link);

        var usrnm=this.username;
        var myp=this.my_photos;
        var sr=this.share_req;

        let inputform=document.createElement("div");
        this.container.appendChild(inputform);
        inputform.className="inputform";
        let lab1=document.createElement("label");
        lab1.innerHTML="Import your image: \n";
        inputform.appendChild(lab1);

        let btn1=document.createElement("input");
        btn1.type="file";
        btn1.id="myFile";
        btn1.innerHTML="upload image";
        btn1.onchange=(ev)=>{
            var imgf=document.createElement("img");
            imgf.alt="Red dot";
            let file=document.getElementById('myFile');
            
            var reader = new FileReader();
            reader.readAsDataURL(file.files[0]);
            reader.onload = function () {
                //alert(reader.result+"tjt");//base64encoded string
                imgf.src= reader.result;

                imgf.width=150;
                imgf.height=150;


                fetch("http://localhost:5000/insertPhoto",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    username:usrnm,
                    imgsrc: imgf.src
                })
            })
            .then(response=>response.json())
            .then(data=>{
                if(data["status"]=="ok"){
                    myp.push(imgf.src);
                    const userr=new User(usrnm, myp, sr);
                    userr.drawUser(document.body);
                }else{
                    alert("Cannot add photo!");
                }
            }).catch(p=>{
                alert("Cannot add photo!");
            });
        }

            };

            
            //this.container.appendChild(img);
            
        inputform.appendChild(btn1);

        let showform=document.createElement("div");
        showform.className="showform";
        this.container.appendChild(showform);

        for(let i=0;i<this.my_photos.length;i++){
            let imgg=document.createElement("img");
            imgg.src=this.my_photos[i];
            imgg.width=150;
            imgg.height=150;
            showform.appendChild(imgg);
        }

        let shareform=document.createElement("div");
        this.container.appendChild(shareform);
        shareform.className="shareform";
        let slct=document.createElement("select");
        slct.className="slct";
        shareform.appendChild(slct);
        let pomopt=document.createElement("option");
        pomopt.disabled=false;
        pomopt.selected=true;
        pomopt.innerHTML="---";
        pomopt.value="--";
        slct.appendChild(pomopt);
        this.share_req.forEach(el => {
            let opt=document.createElement("option");
            opt.value=el.usr;
            opt.innerHTML=el.usr;
            slct.appendChild(opt);
        });

        slct.onchange=(ev)=>{
            this.share_req.forEach(el => {
                if(document.getElementsByClassName("prev")[0]!=null){
                    document.getElementsByClassName("prev")[0].remove();
                }
                if(document.getElementsByClassName("slct")[0].value==el.usr){

                    if(document.getElementsByClassName("slct")[0].value=="--"){
                        return;
                    }
                    let imgs=document.createElement("img");
                    imgs.className="prev";
                    imgs.src=el.img;
                    imgs.width=100;
                    imgs.height=100;
                    shareform.appendChild(imgs);
                }
            });
        }

        let btn2=document.createElement("button");
        btn2.innerHTML="Share";
        btn2.onclick=(ev)=>{
            if(slct.value=="--"){
                return;
            }

            fetch("http://localhost:5000/approveSharing", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    usernameS:this.username,
                    usernameR:slct.value,
                    imgsrc:document.getElementsByClassName("prev")[0].src
                })
            })
            .then(response=>response.json())
            .then(data =>{
                if(data["status"]=="ok"){

                }
            })
        }
        shareform.appendChild(btn2);


        host.appendChild(this.container);
        //this.container.appendChild(pom);
    }
}