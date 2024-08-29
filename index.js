document.addEventListener("DOMContentLoaded",function(){
    const dataForm = document.getElementById("dataform");
    const dataInput = document.getElementById("dataInput");
    const dataList = document.getElementById("dataList");

    localStoredData();

    dataForm.addEventListener("submit",function(e){
        e.preventDefault();
        const data = dataInput.value.trim();
        if(data!==""){
        addToLocalStorage(data);
        localStoredData();
        dataInput.value="";
        }else{
            alert("please enter the name");
            dataInput.focus();
        }

    })

    function addToLocalStorage(data){
        const storedData = JSON.parse(localStorage.getItem("myData")) || [];
        storedData.push(data);
        localStorage.setItem("myData",JSON.stringify(storedData));
    }

    function localStoredData(){
        const storeData = JSON.parse(localStorage.getItem("myData")) || [];
        dataList.innerHTML="";
        storeData.forEach((data,index) => {
        let output =`
        <li>${data}
        <div>
        <button class="btnEdit" data-index=${index} >Edit</button>
        <button class="btnDelete" data-index=${index} >Delete</button>
        </div>
        <li>
        `
        dataList.innerHTML+=output;
        });

        const deleteButton = document.querySelectorAll(".btnDelete");
        deleteButton.forEach((btn) => {
            btn.addEventListener("click",deleteData);
            
        });

        const editButton = document.querySelectorAll(".btnEdit");
        editButton.forEach((btn) => {
            btn.addEventListener("click",editData);
            
        });
    }

    function deleteData(){
   const index = this.dataset.index;
  // console.log(index);
 if(confirm("Are you delete this data")){
    const storeData = JSON.parse(localStorage.getItem("myData")) || [];
    storeData.splice(index,1);
    //alert("Are you sure delete this data");
    localStorage.setItem("myData",JSON.stringify(storeData));
    localStoredData();

    
 }
    }

    function editData(){
        const index = this.dataset.index;
        //console.log(index);
        const storeData = JSON.parse(localStorage.getItem("myData")) || [];
        const newData = prompt("Edit Username",storeData[index]);
        if(newData!==null){
            storeData[index] = newData.trim();
            localStorage.setItem("myData",JSON.stringify(storeData));
            localStoredData();
        }

    }
})