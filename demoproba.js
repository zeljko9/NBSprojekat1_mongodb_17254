export class Forum{
    constructor(){
        this.kontejner=null;
    }

    crtajForum(host){
        this.kontejner=document.createElement("div");
        this.kontejner.className="forum";
        host.appendChild(this.kontejner);

        let btn=document.createElement("input");
        btn.type="file";
        btn.id="myFile";
        btn.innerHTML="upload image";
        btn.onchange=(ev)=>{
            var img=document.createElement("img");
            img.alt="Red dot";

            let file=document.getElementById('myFile');
            
            var reader = new FileReader();
            reader.readAsDataURL(file.files[0]);
            reader.onload = function () {
	            //console.log(reader.result);//base64encoded string
                img.src= reader.result;
                img.width=150;
                img.height=150;
            };

            this.kontejner.appendChild(img);

        }

        this.kontejner.appendChild(btn);





    }

    getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }
}