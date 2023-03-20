
console.log(window.api)
window.api.loadSettings("test_settings").then(res=>{
    console.log("loadedSettings",res)
})
// console.log(window.api.getMemory())
// console.log(window.api.cpus)

// var test_file_browser_elem = document.getElementById("test_file_browser")
// test_file_browser_elem.onclick = window.api.openFileBrower
// console.log(test_file_browser_elem)



var save_user_settings = function(e){
    const formData = new FormData(e.target);
    const jsonFormData = Object.fromEntries(formData)
    console.log("formData",jsonFormData);
    window.api.saveSettings("test_settings",jsonFormData)
   
    window.api.loadSettings("test_settings").then(res=>{
        console.log(res)
    })


    e.preventDefault();

}

var setDefaultFormValue = async function(formElem,setting_name){
    var setting_elements = user_setting_form.getElementsByTagName("input");
    var default_setting = await window.api.loadSettings(setting_name)
    for(elem of setting_elements){
        elem.value = default_setting[elem.name]
    }
}

var set_folder_path =  async function(e){
    var path = await window.api.selectFolder()
    console.log(path)
    if(path){
        e.target.value = path

    }
}
var user_setting_form = document.getElementById("user_setting_test")
user_setting_form.onsubmit = save_user_settings
setDefaultFormValue(user_setting_form,"test_settings")


var filepathselector = document.getElementById("file_path_selector")
filepathselector.onclick = set_folder_path




// please let me use framework