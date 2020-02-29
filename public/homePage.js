const logoutBtn = new LogoutButton;
logoutBtn.action = (data) => {
    return ApiConnector.logout(response => {
        if(response.success === true) {
            location.reload();
        }
    });
}

ApiConnector.current(response => {
    if(response.success === true) {
        ProfileWidget.showProfile(response.data);
    }
})

const stocks = new RatesBoard;
function stocksRefresh() {
ApiConnector.getStocks(response => {
    if(response.success === true) {
        stocks.clearTable();
        stocks.fillTable(response.data);
        
    }
})
}
stocksRefresh();
const stocksBlockRefresh = setInterval(stocksRefresh, 60000);

const balance = new MoneyManager;
balance.addMoneyCallback = data => {
    return ApiConnector.addMoney(data, response => {
        console.log(data);
        if(response.success === true) {
            ProfileWidget.showProfile(response.data);
            let isError = false;
            balance.setMessage(isError, "Полполнение счета прошло успешно");
        } else {
            let isError = true;
            balance.setMessage(isError,"Ошибка пополнения счета");
        }
    });
}

balance.conversionMoneyCallback = data => {
    return ApiConnector.convertMoney(data, response => {
     console.log(data);
    if(response.success === true) {
        ProfileWidget.showProfile(response.data);
        let isError = false;
        balance.setMessage(isError,"Конвертация совершена");
    } else {
        let isError = true;
        balance.setMessage(isError,"Ошибка конвертации");
    }
    } );
}

balance.sendMoneyCallback = data => {
    return ApiConnector.transferMoney(data, response => {
        console.log(data);
        console.log(response);
        if(response.success === true) {
            ProfileWidget.showProfile(response.data);
            let isError = false;
            balance.setMessage(isError, "Полполнение счета прошло успешно");
        } else {
            let isError = true;
            balance.setMessage(isError,"Ошибка пополнения счета");
        }
    });
}

let favorites = new FavoritesWidget;
function favoitesRefresh() {
    return ApiConnector.getFavorites(response => {
        if(response.success === true) {
            favorites.clearTable();
            favorites.fillTable(response.data);
            balance.updateUsersList(response.data)
        }
    });
}

favorites.addUserCallback = data =>{
    return ApiConnector.addUserToFavorites(data,response => {
        if(response.success === true) {
            favoitesRefresh();
        }
    })
}

favorites.removeUserCallback = data => {
    return ApiConnector.removeUserFromFavorites(data, response => {
        if(response.success === true) {
            favoitesRefresh();
        }
    })
}


favoitesRefresh();