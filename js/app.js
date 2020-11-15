// MAIN JS

// Elements

const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");
const darkModeBtn = document.getElementById("darkMode");

// Objects
const github = new Github();
const ui = new UI();


eventListeners();

function eventListeners() {
    githubForm.addEventListener("submit", getData);
    clearLastUsers.addEventListener("click", clearAllSearched);
    document.addEventListener("DOMContentLoaded", getAllSearched); // Sayfa yüklendiğinde son aramaları storage'den al ve göster.
    darkModeBtn.addEventListener("click", darkMode);
    window.addEventListener("load", setThemeFromCookie);


}

function getData(e) {

    let username = nameInput.value.trim();

    if (username === "") {
        // ui.showMessage("Lütfen Github kullanıcı adı giriniz.","danger");
        swal({
            title: "Github kullanıcı adı giriniz.",
            icon: "error",
            button: "Kapat",
            timer: 3000,
        })
    }
    else {
        github.getGithubData(username)
            .then(response => {
                if (response.user.message === "Not Found") {
                    // Hata mesajı (Yani kullanıcı adı kayıtlı değilse)
                    // ui.showMessage("Kullanıcı Bulunamadı", "danger");
                    swal({
                        title: "Kullanıcı bulunamadı.",
                        icon: "error",
                        button: "Kapat",
                        timer: 3000,
                    })
                }
                else {
                    ui.addSearchedUserToUI(username);
                    Storage.addSearchedUserToStorage(username);
                    ui.showUserInfo(response.user);
                    ui.showRepoInfo(response.repo);
                }
            })
            // .catch(err => ui.showMessage(err)); // IF Promise error
            .catch(err =>
                swal({
                    title: err,
                    icon: "error",
                    button: "Kapat",
                    timer: 3000,
                })
            );
    }

    ui.clearInput(); // İnput temizler.


    e.preventDefault();
}

// function clearAllSearched() {
//     // Tüm arananları temizle
//     if (confirm("Emin misiniz?")) {
//         Storage.clearAllSearchedUsersFromStorage(); // Storage dan temizler.
//         ui.clearAllSearchedFromUI(); // Ekrandan siler.
//         // ui.showMessage("Başarılı bir şekilde silinmiştir.", "success");
//         swal({
//             title: "Başarılı bir şekilde silinmiştir.",
//             icon: "success",
//             button: "Kapat",
//             timer: 1000,
//         })

//     }
// }

function clearAllSearched() {
    // Tüm arananları temizle
    swal({
        title: "Emin misiniz?",
        text: "Son aramaların hepsi temizlenecek.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                swal("Temizlendi!", {
                    icon: "success",
                    timer: 2000
                });
                Storage.clearAllSearchedUsersFromStorage(); // Storage dan temizler.
                ui.clearAllSearchedFromUI(); // Ekrandan siler.
            }
        });
}

function getAllSearched() {
    // Sayfa yüklendiğinde Arananları Storage'dan al ve UI 'ye ekle.

    let users = Storage.getSearchedUsersFromStorage();
    let result = "";

    users.forEach(user => {
        // <li class="list-group-item"></li>
        result += `<li class="list-group-item pl-2">${user}</li>`;
    });

    lastUsers.innerHTML = result;

}

function darkMode() {
    swal({
        title: "Henüz hazır değil :)",
        icon: "warning",
        button: "Kapat",
        timer: 2500,
    });

    // let element = document.body;
    // element.classList.toggle("dark-mode");
}
