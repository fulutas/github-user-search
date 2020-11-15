// STORAGE 


class Storage {

    static getSearchedUsersFromStorage() {

        // Tüm kullanıcıları al
        let users;

        if (localStorage.getItem("searched") === null) {
            users = [];
        }
        else {
            users = JSON.parse(localStorage.getItem("searched")); // String'den array çevir. 
        }
        return users;

    }

    static addSearchedUserToStorage(username) {
        // Sorgulanmış kullanıcıyı storage ekle, varsa ekleme.

        let users = this.getSearchedUsersFromStorage();

        if (users.indexOf(username) === -1) { // index -1 ise yoktur.
            users.push(username); // Ekle. 
        }

        localStorage.setItem("searched", JSON.stringify(users)); // Stringe çevir localStorage ekle.
    }

    static clearAllSearchedUsersFromStorage() {
        // Tüm kullanıcıları sil.
        localStorage.removeItem("searched");
    }

} 