
let checkbox = []
let to_dl = []
let downloading = false

//Add download button
let dl = document.createElement("p")
dl.style.textDecoration = 'underline'
dl.textContent = "Télécharger"
dl.style.cursor = "pointer"
document.querySelector(".documents > thead > tr:first-of-type th").appendChild(dl);

//Add All dl checkbox
let master_checkbox_parent = document.createElement("div")
let master_checkbox = document.createElement("input")
master_checkbox.type = "checkbox"
master_checkbox.addEventListener("click", (e) => {
    checkbox.forEach((checkbox_item) => {
        checkbox_item[0].checked = e.target.checked;
    })
})
let master_checkbox_label = document.createElement("label")
master_checkbox_label.innerText = "Tout télécharger ?"

master_checkbox_parent.appendChild(master_checkbox)
master_checkbox_parent.appendChild(master_checkbox_label)
document.querySelector(".documents > thead > tr:first-of-type th").appendChild(master_checkbox_parent);


//Add checkbox col
let tr_ = document.createElement("tr");
tr_.textContent = "Choix";
tr_.style.display = "table-cell";
document.querySelector(".documents thead tr+tr").insertBefore(tr_,document.querySelector(".documents thead tr+tr th:first-of-type"));


document.querySelectorAll(".documents tbody tr").forEach(el=>{
    if(!el.querySelector("td:first-of-type+td a").target) return;
    let td = document.createElement('td')
    let check = document.createElement('input')
    check.type = "checkbox"
    td.appendChild(check)
    el.children[0].appendChild(td)
    el.children[0].style.display = "flex"
    el.children[0].style.flexDirection = "row-reverse"

    checkbox.push([check,el.querySelector("td:first-of-type+td a")])
})

function setDownloading(value)
{
    dl.textContent= value ? "En cours de téléchargement ..." :"Télécharger"
    downloading = value;
}
function download(){
    if(to_dl.length==0){
        setDownloading(false)
        return;
    };
    let url = to_dl[0]
    const link = document.createElement('a');
    link.href = url;
    link.download = '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    to_dl.shift()
    setTimeout(()=>download(),1000)
}

dl.addEventListener("click", ()=>{
    checkbox.forEach(el=>{
        if(el[0].checked){
            to_dl.push(el[1].href)
        }
    })
    setDownloading(true)
    setTimeout(()=>download(),3000)
})