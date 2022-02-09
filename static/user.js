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
        pomopt.disabled=true;
        pomopt.selected=true;
        pomopt.innerHTML="---";
        slct.appendChild(pomopt);
        this.share_req.forEach(el => {
            let opt=document.createElement("option");
            opt.value=el["usr"];
            opt.innerHTML=el["usr"];
            slct.appendChild(opt);
        });

        slct.onchange=(ev)=>{
            this.share_req.forEach(el => {
                if(document.getElementsByClassName("slct")[0].value==el["usr"]){
                    let imgs=document.createElement("img");
                    imgs.src=el["img"];
                    imgs.width=100;
                    imgs.height=100;
                    shareform.appendChild(imgs);
                }
            });
        }



        host.appendChild(this.container);
        //this.container.appendChild(pom);
    }
}