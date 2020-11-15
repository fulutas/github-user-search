// UI - FrontEnd

class UI {

    constructor() {
        this.profileDiv = document.getElementById("profile");
        this.repoDiv = document.getElementById("repos");
        this.lastUsers = document.getElementById("last-users");
        this.inputField = document.getElementById("githubname");
        this.cardBody = document.querySelector(".card-body");
        this.pageHeading = document.querySelector(".page-heading23");
        this.subHeading = document.querySelector(".sub-heading ");
        this.company = document.getElementById("company");
    }

    clearInput() {
        this.inputField.value = "";
    }

    showUserInfo(user) {

        // Created Date tarih ayarlamaları
        const event = new Date(user.created_at);
        const jsonDate = event.toJSON();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        // Null veri kontrolleri
        let comControl = user.company;
        let locControl = user.location;
        let twitControl = user.twitter_username;
        
        if (comControl === null) {
            comControl = "";
        if (locControl === null) {
                locControl = "";
            }
         if (twitControl === null) {
             twitControl = "";
            }
        }

        this.profileDiv.innerHTML = `
         <div class="card card-body mt-5 mb-3">
                    <div class="row">
                      <div class="col-md-4">
                        <a href="${user.html_url}" target = "_blank">
                         <img class="img-fluid mb-2" src="${user.avatar_url}"> </a>
                        </div>
                      <div class="col-md-7 profileBody">
                      <div id="userName"><strong>${user.login}</strong></div>
                      <div class="userInfo mt-4">
                            <button class="btn btn-secondary">
                                  Takipçi  <span class="badge badge-light">${user.followers}</span>
                            </button>
                            <button class="btn btn-info">
                                 Takip Edilen  <span class="badge badge-light">${user.following}</span>
                              </button>
                            <button class="btn btn-danger">
                                Repolar  <span class="badge badge-light">${user.public_repos}</span>
                            </button>
                            <button class="btn btn-warning">
                            Gists  <span class="badge badge-light">${user.public_gists}</span>
                        </button>
                       </div>
                            <hr>
                            <li class="list-group">
                                <li class="list-group-item borderzero">
                                <div id="fullName"><strong>${user.name}</strong></div>
                                <div id="bio">${user.bio}</div>
                                <img src="https://img.icons8.com/fluent-systems-filled/48/000000/company.png"/><span id="company" class="furkan">${comControl}</span>
                                     </li>
                                <li class="list-group-item borderzero">
                                <img src="https://img.icons8.com/material-two-tone/48/000000/worldwide-location.png"/><span id = "location">${locControl}</a>
                    
                                </li>
                               
                                <li class="list-group-item borderzero">
                                <img src="https://img.icons8.com/ios-filled/50/000000/twitter.png"/><span id="username">${twitControl}</span>
                                    
                                </li>

                                <li class="list-group-item borderzero">
                                <img src="https://img.icons8.com/android/48/000000/calendar.png"/> <span id="createdDate">${new Date(jsonDate).toLocaleDateString(undefined, options)}</span>

                            </li>
                                
                            </div>
                               
                            
                      </div>
                </div>
         `;



    }

    // Bootstrap ile Popup Mesajı

    showMessage(message, status) {
        const div = document.createElement("div");

        div.className = `alert alert-${status}`;
        div.textContent = message;
        this.cardBody.appendChild(div);

        setTimeout(() => {
            div.remove();
        }, 2000);

    }


    // Repo objesinin boş olup olmadığını kontrol etme;
    isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;

    }

    // Kullanıcı repolarını ekler.
    showRepoInfo(repos) {
        this.repoDiv.innerHTML = ""; // daha önce aratılan kullanıcın reposunu ekrandan temizle.
        this.pageHeading.innerHTML = '<h3 class="page-heading mt-5 mb-3">En Son Repolar</h3>'


        // Repo kaydi yok ise;
        const myObj = repos;
        if (ui.isEmpty(myObj)) {
            this.subHeading.innerHTML = "Repo bulunamadı😱"
            this.subHeading.className = "sub-heading2"
        }

        else {
            //  Arraylerde gez ve ekle!
            this.subHeading.innerHTML = ""
            this.subHeading.className = ""

            repos.forEach(repo => {

                this.repoDiv.innerHTML += `
    <div class="mb-2 card-body">
    <div class="row">
        <div class="col-md-2">
        <a href="${repo.html_url}" target = "_blank" id = "repoName">${repo.name}</a>
        </div>
        <div class="col-md-6">
            <button class="btn btn-secondary">
                Star  <span class="badge badge-light" id="repoStar">${repo.stargazers_count}</span>
            </button>

            <button class="btn btn-info">
                Fork  <span class="badge badge-light" id ="repoFork">${repo.forks_count}</span>
            </button>

            <button class="btn btn-success">
            Watchers  <span class="badge badge-light" id ="repoWatchers">${repo.watchers_count}</span>
            </button>
        </div>
             </div>
        </div>
    `;

            })
        }





    }

    // Aranan kullanıcıları son aramalara ekle. (daha önce aranmışsa ekleme yapmaz!)
    addSearchedUserToUI(username) {

        let users = Storage.getSearchedUsersFromStorage();

        if (users.indexOf(username) === -1) {

            const li = document.createElement("li");
            li.className = "list-group-item pl-2";
            li.textContent = username;

            this.lastUsers.appendChild(li);
        }

    };

    // Ekrandan sil
    clearAllSearchedFromUI() {
        // <li> 'de element var ise sil. ; (true)
        while (this.lastUsers.firstElementChild !== null) {
            this.lastUsers.removeChild(this.lastUsers.firstElementChild);
        }
    };

}